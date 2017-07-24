"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settingComponent_1 = require("./ui/settingComponent");
var WebmSocket = (function () {
    function WebmSocket() {
        this.name = "webmsocket";
        this.type = "output";
    }
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
    };
    /**
     * mediaPluginが撤去されたときの動作
     * @param media
     */
    WebmSocket.prototype.onRemoveMedia = function (media) {
    };
    WebmSocket.prototype._startPublish = function (event, address) {
    };
    WebmSocket.prototype._finishPublish = function () {
    };
    return WebmSocket;
}());
exports.WebmSocket = WebmSocket;
exports._ = new WebmSocket();
