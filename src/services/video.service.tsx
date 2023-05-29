import axios from "./common";
import {
    AgoraToken,
    AgoraJoin,
    ResourceToken,
    RecordToken,
    AfterRecordToken,
    AgoraRecordStatus,
    RemoteInfo,
    ChatMessage,
} from "../interfaces/video.types";

const getToken = (data: AgoraToken) => {
    return axios.post<AgoraToken>("create/", data);
};

const joinInterview = (data: AgoraJoin) => {
    return axios.post<AgoraJoin>("join/", data);
};

const updateDetails = (data: AgoraToken) => {
    return axios.put<AgoraToken>("leave/", data);
};

const generateResource = (data: ResourceToken) => {
    return axios.post<AgoraToken>("get_resource/", data);
};
const startRecording = (data: RecordToken) => {
    return axios.post<AgoraToken>("start_recording/", data);
};
const stopRecording = (data: AfterRecordToken) => {
    return axios.post<AgoraToken>("stop_recording/", data);
};

const queryRecording = (data: ResourceToken) => {
    return axios.post<AgoraRecordStatus>("query_recording/", data);
};

const getUserType = (data: RemoteInfo) => {
    return axios.post<RemoteInfo>("get_usertype/", data);
};

const updateUid = (data: RemoteInfo) => {
    return axios.post<any>("sync_agora_id/", data);
};

const updateUserInfo = (data: RemoteInfo) => {
    return axios.post<RemoteInfo>("update_user_info/", data);
};

const sendChatMessage = (data: ChatMessage) => {
    return axios.post<ChatMessage>("messages/", data);
};

const getChatHistory = (queryParams: any) => {
    return axios.get<RemoteInfo>("messages/", { params: queryParams });
};

const videoService = {
    getToken,
    joinInterview,
    updateDetails,
    generateResource,
    startRecording,
    stopRecording,
    queryRecording,
    getUserType,
    updateUid,
    updateUserInfo,
    sendChatMessage,
    getChatHistory,
};

export default videoService;
