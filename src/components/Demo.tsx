import AgoraRTM, { RtmChannel } from "agora-rtm-sdk";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListMessage from "./ListMessages";
import axios from "axios";

const APP_ID = "9b17af05ca1c4b4aa9eddc5a90947078";
const CHANNEL_NAME = "demo";

const client = AgoraRTM.createInstance(APP_ID);
const uid = uuidv4();

interface IState {
    message: {
        uid: string;
        text: string;
    };
}

const Demo: React.FC = () => {
    const [text, setText] = useState("");
    const [channel, setChannel] = useState<RtmChannel>();
    const [messages, setMessages] = useState<IState["message"][]>([]);

    useEffect(() => {
        const connect = async () => {
            await client.login({ uid });
            const channel = await client.createChannel(CHANNEL_NAME);
            await channel.join();
            channel.on("ChannelMessage", (message, memberId) => {
                setMessages((currentMessage: any) => [
                    ...currentMessage,
                    {
                        uid: memberId,
                        text: message.text,
                    },
                ]);
            });
            getMessage();
            setChannel(channel);
        };
        connect();
    }, []);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text === "") return;
        channel?.sendMessage({
            text,
        });

        postMessage(uid, text);

        setMessages((currentMessage: any) => [
            ...currentMessage,
            {
                uid,
                text,
            },
        ]);

        setText("");
    };

    const postMessage = async (uid: string, text: string) => {
        const data = { senderId: uid, messageContent: text };

        axios
            .post("http://localhost:8080/messages", data)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Message saved successfully");
                }
            })
            .catch(() => {
                console.log("Couldn't save message");
            });
    };

    const getMessage = async () => {
        axios
            .get("http://localhost:8080/messages")
            .then((res) => {
                res.data.forEach((element: any) => {
                    let { messageContent } = element;
                    let { senderId } = element;

                    setMessages((currentMessage: any) => [
                        ...currentMessage,
                        {
                            uid: senderId,
                            text: messageContent,
                        },
                    ]);
                });
            })
            .catch(() => {
                console.log("Couldn't retieve message");
            });
        console.log("Set messages", messages);
    };

    return (
        <>
            <div className="pannel">
                <ListMessage messages={messages} uid={uid} />
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    value={text}
                />
                <button>+</button>
            </form>
        </>
    );
};

export default Demo;
