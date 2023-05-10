import { useState } from "react";
import { AppInput } from "./AppInput";
import AgoraRTM from "agora-rtm-sdk";

export const Dashboard = () => {
    const appID = "765b5fbbb5f4496cbdf8128646dd8fbd";
    const client = AgoraRTM.createInstance(appID);

    const [options, setOptions] = useState({
        uid: "",
        token: "",
    });

    const updateOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptions({
            ...options,
            [e.target.name]: e.target.value,
        });
    };

    const [peerInput, setPeerInput] = useState({
        peerId: "",
        peerMessage: "",
    });

    const updatePeerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPeerInput({
            ...peerInput,
            [e.target.name]: e.target.value,
        });
    };

    const [channelMessage, setChannelMessage] = useState("");

    let channel = client.createChannel("demoChannel");

    client.on("ConnectionStateChanged", (state, reason) => {
        console.log("State changed To: " + state + " Reason: " + reason);
    });

    channel.on("ChannelMessage", (message, memberId) => {
        console.log(
            "Message received from: " + memberId + " Message: " + message
        );
    });

    channel.on("MemberJoined", (memberId) => {
        console.log(memberId + " joined the channel");
    });

    channel.on("MemberLeft", (memberId) => {
        console.log(memberId + " left the channel");
    });

    const login = async () => {
        await client.login(options);
    };

    const logout = async () => {
        await client.logout();
    };

    const joinChannel = async () => {
        await channel.join().then(() => {
            console.log(
                "You have successfully joined channel " + channel.channelId
            );
        });
    };

    client.on("MessageFromPeer", (message, peerId) => {
        console.log("Message from: " + peerId + " Message: " + message);
    });

    const sendPeerMessage = async () => {
        await client
            .sendMessageToPeer(
                { text: peerInput.peerMessage },
                peerInput.peerId
            )
            .then((sendResult) => {
                if (sendResult.hasPeerReceived) {
                    console.log(
                        "Message has been received by: " +
                            peerInput.peerId +
                            " Message: " +
                            peerInput.peerMessage
                    );
                } else {
                    console.log(
                        "Message sent to: " +
                            peerInput.peerId +
                            " Message: " +
                            peerInput.peerMessage
                    );
                }
            });
    };

    const sendChannelMessage = async () => {};

    const leaveChannel = async () => {
        if (channel != null) {
            await channel.leave();
        } else {
            console.log("Channel is empty");
        }
    };

    return (
        <>
            <label htmlFor="uid">U-ID</label>
            <input
                type="text"
                value={options.uid}
                onChange={updateOptions}
                name="uid"
            />
            <br />
            <label htmlFor="uid">Token</label>
            <input
                type="text"
                value={options.token}
                onChange={updateOptions}
                name="token"
            />

            <br />
            <button onClick={login}>Login</button>

            <br />
            <button onClick={logout}>Logout</button>

            <br />
            <p> Channel name: demochannel</p>

            <br />
            <button onClick={joinChannel}>Join</button>
            <button onClick={leaveChannel}>Leave</button>

            <br />
            <input
                type="text"
                value={channelMessage}
                onChange={(e) => {
                    setChannelMessage(e.target.value);
                }}
                name="token"
            />
            <button onClick={sendChannelMessage}>Send</button>

            <br />
            <label htmlFor="uid">PeerId</label>
            <input
                type="text"
                value={peerInput.peerId}
                onChange={updatePeerInput}
                name="peerId"
            />

            <br />
            <label htmlFor="uid">Peer Message</label>
            <input
                type="text"
                value={peerInput.peerMessage}
                onChange={updatePeerInput}
                name="peerMessage"
            />
            <button onClick={sendPeerMessage}>Send</button>
        </>
    );
};
