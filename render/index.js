"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settingComponent_1 = require("./ui/settingComponent");
var WebmSocket = (function () {
    function WebmSocket() {
        this.name = "webmsocket";
        this.type = "output";
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
    WebmSocket.prototype.setPlugins = function (plugins) {
        this.basePlugin = plugins["base"][0];
    };
    /**
     * 下部の設定コンポーネントを参照
     */
    WebmSocket.prototype.refSettingComponent = function () {
        return settingComponent_1.settingComponent(this);
    };
    /**
     * 有効になっているmediaPluginが変更になったときの動作
     */
    WebmSocket.prototype.onChangeActiveMedia = function (media) {
        if (this.targetMedia == media) {
            // 現在処理しているmediaがactiveになった場合
        }
        this.activeMedia = media;
    };
    /**
     * mediaPluginが撤去されたときの動作
     * @param media
     */
    WebmSocket.prototype.onRemoveMedia = function (media) {
        if (this.targetMedia == media) {
            // 現在動作に利用しているmediaがremoveされる場合は、止めないとまずい。
            this._finishPublish(); // 配信は停止扱いにしておく
        }
    };
    WebmSocket.prototype._startPublish = function (event, address) {
        var _this = this;
        // 配信開始したら、event監視のuiを変更する。
        this.event = event;
        // activeなmediaがない場合は処理できないので、終わり
        if (this.activeMedia == null) {
            this._finishPublish();
            return false;
        }
        // websocketを接続する
        this.ws = new WebSocket(address);
        this.ws.onclose = function () {
            _this._finishPublish();
            _this.ws = null;
        };
        this.ws.onerror = function () {
            _this._finishPublish();
            _this.ws = null;
        };
        this.ws.onmessage = function (ev) {
            console.log(ev);
        };
        // ここまでで、接続OK
        // 現在の処理targetをactiveなmediaに変更
        this.targetMedia = this.activeMedia;
        // 処理用のmediaStreamをつくる
        var stream = new MediaStream();
        // 映像
        var videoStream = this.targetMedia.refCanvas().captureStream(15);
        stream.addTrack(videoStream.getTracks()[0]); // トラックを追加しとく
        // 音声
        var node = this.basePlugin.refAudioContext().createMediaStreamDestination();
        this.targetMedia.refNode().connect(node);
        node.connect(this.basePlugin.refDevnullNode());
        stream.addTrack(node.stream.getTracks()[0]); // こっちもトラックを追加しておく
        // すでにrecordしてる場合は止めておく
        if (this.recorder) {
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
        catch (e) {
            try {
                this.recorder = new MediaRecorder(stream, {
                    mimeType: "video/webm; codecs=vp8,vorbis",
                    videoBitsPerSecond: 600000,
                    audioBitsPerSecond: 64000
                });
            }
            catch (e) {
                alert("MediaRecorder作成に失敗しました。");
                this._finishPublish();
                return false;
            }
        }
        // データ生成時のcallback
        this.recorder.ondataavailable = function (event) {
            // 本当にデータの中身があるか確認
            if (event.data.size > 0) {
                // 中身がある場合はサイズ更新
                _this.publishSize += event.data.size;
                if (_this.ws != null) {
                    // websocketに向けてblobを送る これでOK
                    _this.ws.send(event.data);
                }
            }
            // データのcallbackがきたら、保存情報を更新してやる
            // 少なくとも時間は更新される
            _this.event.onProcess({
                size: _this.publishSize,
                time: (new Date().getTime() - _this.startTime)
            });
        };
        // recorder動作を1秒ごとに更新として動作させておく
        this.recorder.start(1000);
        return true;
    };
    WebmSocket.prototype._finishPublish = function () {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        if (this.recorder) {
            this.recorder.stop();
            this.recorder = null;
        }
        if (this.event) {
            // 停止を通知しておく
            this.event.onStop();
        }
    };
    return WebmSocket;
}());
exports.WebmSocket = WebmSocket;
exports._ = new WebmSocket();
