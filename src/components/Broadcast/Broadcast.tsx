import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useRef, useState } from "react";

interface OptionsType {
    appId: string;
    channel: string;
    token: string | null;
    uid: string;
    role?: string;
}

interface ChannelParametersType {
    localAudioTrack: any;
    localVideoTrack: any;
    remoteAudioTrack: any;
    remoteVideoTrack: any;
    remoteUid: string;
}

export const Broadcast = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    const [agoraEngine, setAgoraEngine] = useState<any>(
        AgoraRTC.createClient({
            mode: "live",
            codec: "vp8",
        })
    );

    const channelParameters: ChannelParametersType = {
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: "",
    };

    const [options, setOptions] = useState<OptionsType>({
        appId: "769fd3e5dc9e402fb177e4df8fdc4e59",
        channel: "demo",
        token: null,
        role: "",
        uid: generateRandomString(),
    });

    function generateRandomString() {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    useEffect(() => {
        (async () => {
            agoraEngine.on(
                "user-published",
                async (user: any, mediaType: string) => {
                    await agoraEngine.subscribe(user, mediaType);
                    console.log("^^^ subscribe success", user, mediaType);

                    if (mediaType === "video") {
                        const remoteVideoTrack = await agoraEngine.subscribe(
                            user,
                            mediaType
                        );

                        channelParameters.remoteVideoTrack = remoteVideoTrack;
                        channelParameters.remoteAudioTrack = user.audioTrack;
                        channelParameters.remoteUid = user.uid.toString();

                        if (options.role !== "host") {
                            // Play the remote video track.
                            channelParameters.remoteVideoTrack.play(
                                remoteVideoRef.current as HTMLVideoElement
                            );
                        }
                    }

                    if (mediaType === "audio") {
                        channelParameters.remoteAudioTrack = user.audioTrack;
                        channelParameters.remoteAudioTrack.play();
                    }
                }
            );

            agoraEngine.on("user-unpublished", (user: any) => {
                console.log("^^^", user.uid + " has left the channel");
            });
        })();
    }, [agoraEngine, options.role]);

    const join = async () => {
        if (options.role === "" || options.role === null) {
            window.alert("Please select user role");
            return;
        }

        await agoraEngine.join(
            options.appId,
            options.channel,
            options.token,
            options.uid
        );

        channelParameters.localAudioTrack =
            await AgoraRTC.createMicrophoneAudioTrack();
        channelParameters.localVideoTrack =
            await AgoraRTC.createCameraVideoTrack();

        if (options.role === "host") {
            await agoraEngine.setClientRole("host");
            await agoraEngine.publish([
                channelParameters.localAudioTrack,
                channelParameters.localVideoTrack,
            ]);

            channelParameters.localVideoTrack.play(
                localVideoRef.current as HTMLVideoElement
            );
            console.log("^^^ publish success!");
        } else if (options.role === "audience") {
            await agoraEngine.setClientRole("audience");
            console.log("^^^ joined as audience");
        }
    };

    const leave = async () => {
        if (channelParameters.localAudioTrack) {
            channelParameters.localAudioTrack.close();
        }

        if (channelParameters.localVideoTrack) {
            channelParameters.localVideoTrack.close();
        }

        await agoraEngine.leave();
        console.log("^^^ You left the channel");
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions({ ...options, role: e.target.value });
        console.log("^^ Options changed", options);
    };

    return (
        <>
            <h2 className="left-align">Live streaming</h2>
            <div className="row">
                <div style={{ display: "" }}>
                    <input
                        type="radio"
                        name="joinAs"
                        id="host"
                        value="host"
                        checked={options.role === "host"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="host"> Host </label>
                    <input
                        type="radio"
                        name="joinAs"
                        id="audience"
                        value="audience"
                        checked={options.role === "audience"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="audience">Audience</label>
                    <button type="button" onClick={join}>
                        Join
                    </button>
                    <button type="button" onClick={leave}>
                        Leave
                    </button>
                </div>
            </div>
            <div className="Video">
                <video ref={localVideoRef} autoPlay muted></video>
                <video ref={remoteVideoRef} autoPlay></video>
            </div>
        </>
    );
};
