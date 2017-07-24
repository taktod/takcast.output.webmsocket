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
  }
  public _finishPublish() {
    if(this.event) {
      // 停止を通知しておく
      this.event.onStop();
    }
  }
}

export var _ = new WebmSocket();