/// <reference types="react" />
import * as React from "react";
import { IOutputPlugin } from "takcast.interface";
import { IMediaPlugin } from "takcast.interface";
export interface PublishEventListener {
    onStop(): any;
    onProcess(info: any): any;
}
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
    _startPublish(event: PublishEventListener, address: string): void;
    _finishPublish(): void;
}
export declare var _: WebmSocket;
