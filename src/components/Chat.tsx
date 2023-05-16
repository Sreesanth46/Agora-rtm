import React, { useEffect, useState } from "react";
import AC, { AgoraChat } from "agora-chat";

const appKey = "61892275#1064945";
const conn = new AC.connection({
    appKey: appKey,
});

export const Chat: React.FC = () => {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [peerUser, setPeerUser] = useState("");
    const [peerMessage, setPeerMessage] = useState("");

    useEffect(() => {
        conn.addEventHandler("connection&message", {
            // Occurs when the app is connected to Agora Chat.
            onConnected: () => {
                console.log("Connect success !");
            },
            // Occurs when the app is disconnected from Agora Chat.
            onDisconnected: () => {
                console.log("Logout success !");
            },
            // Occurs when a text message is received.
            onTextMessage: (message) => {
                console.log(message);
                console.log(
                    "Message from: " + message.from + " Message: " + message.msg
                );
            },
            // Occurs when the token is about to expire.
            onTokenWillExpire: () => {
                console.log("Token is about to expire");
            },
            // Occurs when the token has expired.
            onTokenExpired: () => {
                console.log("The token has expired");
            },
            onError: (error) => {
                console.log("on error", error);
            },
        });
    }, []);

    const login = () => {
        conn.open({
            user: username,
            agoraToken: token,
        });
        console.log("Login successful");
    };

    const logout = () => {
        conn.close();
        console.log("Logout successful");
    };

    const sendPeerMessage = () => {
        let option = {
            chatType: "singleChat",
            type: "txt",
            to: peerUser,
            msg: peerMessage,
        };

        let msg = AC.message.create(option);
        conn.send(msg)
            .then((res) => {
                console.log("send private text success   --> ", res);
            })
            .catch((err) => {
                console.log("send private text error --> ", err);
            });
    };

    return (
        <div>
            <h1>Chat</h1> <br />
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="Username"
            />
            <label>Token</label>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                name="Username"
            />
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
            <br />
            <br />
            <br />
            <label>Peer username</label>
            <input
                type="text"
                value={peerUser}
                onChange={(e) => setPeerUser(e.target.value)}
                name="Username"
            />
            <br />
            <br />
            <label>Peer Message</label>
            <input
                type="text"
                value={peerMessage}
                onChange={(e) => setPeerMessage(e.target.value)}
                name="Username"
            />
            <button onClick={sendPeerMessage}>Send Peer message</button>
        </div>
    );
};
