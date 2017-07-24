import * as React from "react";

import {IPlugin} from "takcast.interface";
import {IOutputPlugin} from "takcast.interface";
import {IMediaPlugin} from "takcast.interface";

export class WebmSocket implements IOutputPlugin {
  public name = "webmsocket";
  public type = "output";
  /**
   * 下部の設定コンポーネントを参照
   */
  public refSettingComponent():React.ComponentClass<{}> {
    return null;
  }
  /**
   * 有効になっているmediaPluginが変更になったときの動作
   */
  public onChangeActiveMedia(media:IMediaPlugin):void {
  }
  /**
   * mediaPluginが撤去されたときの動作
   * @param media
   */
  public onRemoveMedia(media:IMediaPlugin):void {
  }
}

export var _ = new WebmSocket();