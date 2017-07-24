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
        // 配信開始したら、event監視のuiを変更する。
        this.event = event;
    };
    WebmSocket.prototype._finishPublish = function () {
        if (this.event) {
            // 停止を通知しておく
            this.event.onStop();
        }
    };
    return WebmSocket;
}());
exports.WebmSocket = WebmSocket;
exports._ = new WebmSocket();
