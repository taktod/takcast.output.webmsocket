import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactBootstrap from "react-bootstrap";

var Navbar = ReactBootstrap.Navbar;
var Button = ReactBootstrap.Button;
var FormControl = ReactBootstrap.FormControl;

export var settingComponent = () => {
  return class SettingComponent extends React.Component<{}, {}> {
    constructor() {
      super();
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
              />
            </Navbar.Text>
            <Navbar.Text>
              <Button><span className="glyphicon glyphicon-send" aria-hidden="true"></span></Button>
            </Navbar.Text>
            <Navbar.Text>
              <br />
              00:00 / 10.0 KB
            </Navbar.Text>
          </div>
        </div>
      )
    }
  }
}