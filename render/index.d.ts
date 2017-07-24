/// <reference types="react" />
import * as React from "react";
import { IOutputPlugin } from "takcast.interface";
import { IMediaPlugin } from "takcast.interface";
export declare class WebmSocket implements IOutputPlugin {
    name: string;
    type: string;
    /**
     * 下部の設定コンポーネントを参照
     */
    refSettingComponent(): React.ComponentClass<{}>;
    /**
     * 有効になっているmediaPluginが変更になったときの動作
     */
    onChangeActiveMedia(media: IMediaPlugin): void;
    /**
     * mediaPluginが撤去されたときの動作
     * @param media
     */
    onRemoveMedia(media: IMediaPlugin): void;
}
export declare var _: WebmSocket;
