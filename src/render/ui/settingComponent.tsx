import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

import {WebmSocket} from "..";
import {PublishEventListener} from "..";

var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var FormControl = ReactBootstrap.FormControl;

export var settingComponent = (webmsocket:WebmSocket) => {
  return class SettingComponent extends React.Component<{}, {}> implements PublishEventListener{
    // とりあえず通信状態と送信データサイズ、経過時間をstateで持っとく
    state = {
      sending:false,
      size:0,
      time:0
    }
    constructor() {
      super();
      this.togglePublish = this.togglePublish.bind(this);
    }
    public togglePublish() {
      // このアドレスに向かって配信を開始するという動作が必要になる。
      if(this.state.sending) {
        webmsocket._finishPublish();
      }
      else {
        if(webmsocket._startPublish(this, (ReactDOM.findDOMNode(this.refs.address) as HTMLInputElement).value)) {
          this.setState({sending: true});
        } 
      }
    }
    public onProcess(info) {
      this.setState(info);
    }
    public onStop() {
      this.setState({sending: false});      
    }
    public render() {
      return (
        <div>
          <div>
            <Navbar.Text>
              <FormControl
                type="text"
                placeholder="Enter address"
                ref="address"
                disabled={this.state.sending}
              />
            </Navbar.Text>
            <Navbar.Text>
              <Button onClick={this.togglePublish} active={this.state.sending == true}><span className="glyphicon glyphicon-send" aria-hidden="true"></span></Button>
            </Navbar.Text>
            <Navbar.Text>
              <br />
              {((time) => {
                // 処理時間を表示する
                var t = Math.ceil(time / 1000);
                var string = "";
                var sec = "0" + (t % 60);
                t = Math.floor(t / 60);
                var min = "" + t % 60;
                return min + ":" + sec.substr(-2);
              })(this.state.time)} / {
               ((size) => {
                // 処理データサイズを表示する
                if(size < 10000) {
                  return size + " B";
                }
                else if(size < 10000000) {
                  return (Math.ceil(size / 100)/10) + " kB"
                }
                return (Math.ceil(size / 100000)/10) + " MB"
              })(this.state.size)}
            </Navbar.Text>
          </div>
        </div>
      )
    }
  }
}