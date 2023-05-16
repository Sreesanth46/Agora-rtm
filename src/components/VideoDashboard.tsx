import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const uid = uuidv4();

let options = {
    appId: "9b17af05ca1c4b4aa9eddc5a90947078",
    channel: "demo",
    token: "007eJxTYEjd9F9Q/vcpxr1yWnW/XXxNZ+SxyrxU2i62JXxtR9lRHgEFBsskQ/PENAPT5ETDZJMkk8REy9SUlGTTREsDSxNzA3OL3uUxKQ2BjAynHukxMzJAIIjPwpCSmpvPwAAA60geZw==",
    uid: uid,
};

export const VideoDashboard: React.FC = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        const joinChannel = async () => {
            const token = options.token;
            await client.join(options.appId, options.channel, token, null);

            const [localAudioTrack, localVideoTrack] = await Promise.all([
                AgoraRTC.createMicrophoneAudioTrack(),
                AgoraRTC.createCameraVideoTrack(),
            ]);

            localVideoTrack.play(localVideoRef.current as HTMLElement); // Assert non-null value

            await client.publish([localAudioTrack, localVideoTrack]);
        };

        const subscribeToRemoteUsers = () => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);

                if (mediaType === "video") {
                    const remoteVideoTrack = user.videoTrack; // Assert type
                    remoteVideoTrack!.play(
                        remoteVideoRef.current as HTMLElement
                    ); // Assert non-null value
                }
            });

            client.on("user-unpublished", (user) => {
                if (user.videoTrack) {
                    user.videoTrack.stop();
                    remoteVideoRef.current?.remove(); // Remove the video element directly
                }
            });

            client.on("connection-state-change", function (evt) {
                console.log("Connection state changed:", evt);
                // Perform actions based on the connection state
            });
        };

        joinChannel();
        subscribeToRemoteUsers();

        return () => {
            client.leave();
        };
    }, []);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted></video>
            <video ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};
