import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

export var settingComponent = () => {
  return class SettingComponent extends React.Component<{}, {}> {
    constructor() {
      super();
    }
    public render() {
      return (
        <div />
      )
    }
  }
}