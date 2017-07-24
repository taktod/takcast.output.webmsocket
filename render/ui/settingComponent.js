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
var ReactBootstrap = require("react-bootstrap");
var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var FormControl = ReactBootstrap.FormControl;
exports.settingComponent = function () {
    return (function (_super) {
        __extends(SettingComponent, _super);
        function SettingComponent() {
            return _super.call(this) || this;
        }
        SettingComponent.prototype.render = function () {
            return (React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement(Navbar.Text, null,
                        React.createElement(FormControl, { type: "text", placeholder: "Enter address", ref: "address" })),
                    React.createElement(Navbar.Text, null,
                        React.createElement(Button, null,
                            React.createElement("span", { className: "glyphicon glyphicon-send", "aria-hidden": "true" }))),
                    React.createElement(Navbar.Text, null,
                        React.createElement("br", null),
                        "00:00 / 10.0 KB"))));
        };
        return SettingComponent;
    }(React.Component));
};
