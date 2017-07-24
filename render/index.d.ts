/// <reference types="react" />
import * as React from "react";
import { IPlugin } from "takcast.interface";
import { IOutputPlugin } from "takcast.interface";
import { IMediaPlugin } from "takcast.interface";
export interface PublishEventListener {
    onStop(): any;
    onProcess(info: any): any;
}
export declare class WebmSocket implements IOutputPlugin {
    name: string;
    type: string;
    private activeMedia;
    private targetMedia;
    private basePlugin;
    private event;
    private recorder;
    private startTime;
    private publishSize;
    private ws;
    constructor();
    /**
     * setPluginで全pluginの通知をおこなって、baseのpluginを取得しておく。
     * @param plugins
     */
    setPlugins(plugins: {
        [key: string]: Array<IPlugin>;
    }): void;
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
    _startPublish(event: PublishEventListener, address: string): boolean;
    _finishPublish(): void;
}
export declare var _: WebmSocket;
