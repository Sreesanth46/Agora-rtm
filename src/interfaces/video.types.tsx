import { ICameraVideoTrack, IRemoteVideoTrack, UID } from "agora-rtc-react";

export interface AgoraToken {
    token?: any | null;
    channelName: string;
}

export interface AgoraJoin {
    token?: any | null;
    channelName: string;
    userName: string;
    userType?: string | number;
    createdBy?: string;
}

export interface CallInfo {
    hasAudio: boolean;
    hasVideo: boolean;
    video: IRemoteVideoTrack | ICameraVideoTrack | undefined;
    user: string;
    userType?: string;
    uid: UID;
}

export interface VideoCallOptions {
    channelName: string;
    userName: string;
    appId: string;
    token: string;
    userType?: string;
}

export interface ResourceToken {
    channelName: string;
}

export interface RecordToken {
    channelName: string;
    resourceId: string;
    uid: string;
}

export interface AfterRecordToken {
    channelName: string;
    resourceId: string;
    uid: string;
    sid: string;
}

export interface AgoraRecordStatus {
    status?: any | null;
}

export interface ControlParams {
    method?: React.Dispatch<React.SetStateAction<boolean>>;
    value?: boolean;
    isDisabled?: boolean;
    title: string;
    btnName: any;
    iconStyle?: any;
    funcName?: any;
    isFunction?: boolean;
}

export interface RemoteInfo {
    channelName: string;
    userName?: string;
    uid: any;
    token?: any;
    othersLength?: any;
    rtmToken?: any;
}

export interface UserTimeInfo {
    uid: string | number;
    timestamp: string;
}

export interface ChatMessage {
    channelName: string;
    message: string;
    time: string;
    senderId: string | number;
    userName: string;
}
