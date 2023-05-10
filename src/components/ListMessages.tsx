import { ReactElement } from "react";

interface IMessage {
    uid: string;
    text: string;
}

const ListMessage = (props: {
    messages: IMessage[];
    uid: string;
}): ReactElement[] => {
    return props.messages.map((message: IMessage, index: number) => {
        return (
            <>
                <div key={index}>
                    {message.uid === props.uid && (
                        <div className="user-self">You: &nbsp;</div>
                    )}
                    {message.uid !== props.uid && (
                        <div className="user-self">Them: &nbsp;</div>
                    )}
                    <div className="text">{message.text}</div>
                </div>
            </>
        );
    });
};

export default ListMessage;
