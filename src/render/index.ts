import * as React from "react";

import {IPlugin} from "takcast.interface";
import {IOutputPlugin} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";
import {IBasePlugin} from "takcast.interface";

import {settingComponent} from "./ui/settingComponent";

export interface PublishEventListener {
  // おわったとき
  onStop();
  // 中途のデータ
  onProcess(info);
}

// MediaRecorderで動作させるので、typescriptの定義をanyでつくっておく
declare var MediaRecorder:any;

export class WebmSocket implements IOutputPlugin {
  public name = "webmsocket";
  public type = "output";

  // mediaPlugin(映像のmixとかしてるplugin)を保持しておく
  // 現在takcast的にactiveになってるもの
  private activeMedia:IMediaPlugin;
  // このpluginが動作で利用しているもの
  private targetMedia:IMediaPlugin;

  // basePluginを参照してAudioContextとか取り出したい。
  // 独自にAudioContextを作ると開けるAudioContextのmaxに到達するので
  // takcastではbasePluginで全部引き受けるようにしておいて、それを参照してる
  private basePlugin:IBasePlugin;

  // 現在eventを監視しているUIを保持
  private event:PublishEventListener;

  // MediaRecorder、これでencodeする
  private recorder:any;
  // 開始時刻保持
  private startTime:number;
  // 送信データサイズ保持
  private publishSize:number;
  // 動作websocket
  private ws:WebSocket;
  constructor() {
    this.activeMedia = null;
    this.targetMedia = null;
    this.event = null;
    this.startTime = 0;
    this.publishSize = 0;
    this.ws = null;
  }
  /**
   * setPluginで全pluginの通知をおこなって、baseのpluginを取得しておく。
   * @param plugins 
   */
  public setPlugins(plugins:{[key:string]:Array<IPlugin>}):void {
    this.basePlugin = plugins["base"][0] as IBasePlugin;
  }
  /**
   * 下部の設定コンポーネントを参照
   */
  public refSettingComponent():React.ComponentClass<{}> {
    return settingComponent(this);
  }
  /**
   * 有効になっているmediaPluginが変更になったときの動作
   */
  public onChangeActiveMedia(media:IMediaPlugin):void {
    if(this.targetMedia == media) {
      // 現在処理しているmediaがactiveになった場合
    }
    this.activeMedia = media;
  }
  /**
   * mediaPluginが撤去されたときの動作
   * @param media
   */
  public onRemoveMedia(media:IMediaPlugin):void {
    if(this.targetMedia == media) {
      // 現在動作に利用しているmediaがremoveされる場合は、止めないとまずい。
      this._finishPublish(); // 配信は停止扱いにしておく
    }
  }
  public _startPublish(event:PublishEventListener, address:string) {
    // 配信開始したら、event監視のuiを変更する。
    this.event = event;

    // activeなmediaがない場合は処理できないので、終わり
    if(this.activeMedia == null) {
      this._finishPublish();
      return false;
    }

    // websocketを接続する
    this.ws = new WebSocket(address);
    this.ws.onclose = () => {
      this._finishPublish();
      this.ws = null;
    }
    this.ws.onerror = () => {
      this._finishPublish();
      this.ws = null;
    }
    this.ws.onmessage = (ev) => {
      console.log(ev);
    }
    // ここまでで、接続OK
    // 現在の処理targetをactiveなmediaに変更
    this.targetMedia = this.activeMedia;

    // 処理用のmediaStreamをつくる
    var stream = new MediaStream();
    // 映像
    var videoStream = (this.targetMedia.refCanvas() as any).captureStream(15) as MediaStream;
    stream.addTrack(videoStream.getTracks()[0]); // トラックを追加しとく
    // 音声
    var node = (this.basePlugin.refAudioContext() as any).createMediaStreamDestination();
    this.targetMedia.refNode().connect(node);
    node.connect(this.basePlugin.refDevnullNode());
    stream.addTrack((node as any).stream.getTracks()[0]); // こっちもトラックを追加しておく
    // すでにrecordしてる場合は止めておく
    if(this.recorder) {
      this.recorder.stop();
    }
    // 開始時刻と録画データサイズを初期化
    this.startTime = new Date().getTime();
    this.publishSize = 0;
    // recorder作成
    // 本当はvp9,opusにしたかったけど、手持ちのgolangの動作でvp9がdecodeできないので vp8にしとく
    try {
      this.recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8,opus",
        videoBitsPerSecond: 600000,
        audioBitsPerSecond: 64000
      });
    }
    catch(e) {
      try {
        this.recorder = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp8,vorbis",
          videoBitsPerSecond: 600000,
          audioBitsPerSecond: 64000
        });
      }
      catch(e) {
        alert("MediaRecorder作成に失敗しました。");
        this._finishPublish();
        return false;
      }
    }
    // データ生成時のcallback
    this.recorder.ondataavailable = (event) => {
      // 本当にデータの中身があるか確認
      if(event.data.size > 0) {
        // 中身がある場合はサイズ更新
        this.publishSize += event.data.size;
        if(this.ws != null) {
          // websocketに向けてblobを送る これでOK
          this.ws.send(event.data as Blob);
        }
      }
      // データのcallbackがきたら、保存情報を更新してやる
      // 少なくとも時間は更新される
      this.event.onProcess({
        size:this.publishSize,
        time:(new Date().getTime() - this.startTime)
      });
    }
    // recorder動作を1秒ごとに更新として動作させておく
    this.recorder.start(1000);
    return true;
  }
  public _finishPublish() {
    if(this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if(this.recorder) {
      this.recorder.stop();
      this.recorder = null;
    }
    if(this.event) {
      // 停止を通知しておく
      this.event.onStop();
    }
  }
}

export var _ = new WebmSocket();