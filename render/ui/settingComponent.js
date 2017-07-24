"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var ReactBootstrap = require("react-bootstrap");
var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var FormControl = ReactBootstrap.FormControl;
exports.settingComponent = function (webmsocket) {
    return (function (_super) {
        __extends(SettingComponent, _super);
        function SettingComponent() {
            var _this = _super.call(this) || this;
            // とりあえず通信状態と送信データサイズ、経過時間をstateで持っとく
            _this.state = {
                sending: false,
                size: 0,
                time: 0
            };
            _this.togglePublish = _this.togglePublish.bind(_this);
            return _this;
        }
        SettingComponent.prototype.togglePublish = function () {
            // このアドレスに向かって配信を開始するという動作が必要になる。
            if (this.state.sending) {
                webmsocket._finishPublish();
            }
            else {
                if (webmsocket._startPublish(this, ReactDOM.findDOMNode(this.refs.address).value)) {
                    this.setState({ sending: true });
                }
            }
        };
        SettingComponent.prototype.onProcess = function (info) {
            this.setState(info);
        };
        SettingComponent.prototype.onStop = function () {
            this.setState({ sending: false });
        };
        SettingComponent.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Navbar.Text, null,
                        React.createElement(FormControl, { type: "text", placeholder: "Enter address", ref: "address", disabled: this.state.sending })),
                    React.createElement(Navbar.Text, null,
                        React.createElement(Button, { onClick: this.togglePublish, active: this.state.sending == true },
                            React.createElement("span", { className: "glyphicon glyphicon-send", "aria-hidden": "true" }))),
                    React.createElement(Navbar.Text, null,
                        React.createElement("br", null),
                        (function (time) {
                            // 処理時間を表示する
                            var t = Math.ceil(time / 1000);
                            var string = "";
                            var sec = "0" + (t % 60);
                            t = Math.floor(t / 60);
                            var min = "" + t % 60;
                            return min + ":" + sec.substr(-2);
                        })(this.state.time),
                        " / ",
                        (function (size) {
                            // 処理データサイズを表示する
                            if (size < 10000) {
                                return size + " B";
                            }
                            else if (size < 10000000) {
                                return (Math.ceil(size / 100) / 10) + " kB";
                            }
                            return (Math.ceil(size / 100000) / 10) + " MB";
                        })(this.state.size)))));
        };
        return SettingComponent;
    }(React.Component));
};
