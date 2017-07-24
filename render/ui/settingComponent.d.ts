/// <reference types="react" />
import * as React from "react";
import { WebmSocket } from "..";
export declare var settingComponent: (webmsocket: WebmSocket) => {
    new (): {
        state: {
            sending: boolean;
            size: number;
            time: number;
        };
        togglePublish(): void;
        onProcess(info: any): void;
        onStop(): void;
        render(): JSX.Element;
        setState<K extends never>(f: (prevState: {}, props: {}) => Pick<{}, K>, callback?: () => any): void;
        setState<K extends never>(state: Pick<{}, K>, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentWillMount?(): void;
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, prevContext: any): void;
        componentWillUnmount?(): void;
    };
};
