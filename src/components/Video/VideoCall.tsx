import { useEffect } from "react";
import {
    createClient,
    createMicrophoneAndCameraTracks,
    ClientConfig,
} from "agora-rtc-react";

const config: ClientConfig = {
    mode: "rtc",
    codec: "h264",
};

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
    undefined,
    { encoderConfig: { width: 640, height: 480 } }
);

const useClient = createClient(config);

export const VideoCall = ({ options }: any) => {
    const client = useClient();

    client.on("exception", (e) => {
        console.log("Exception occured in client : ", e);
    });

    useEffect(() => {
        client.on("user-joined", async (user) => {
            console.log("^^^ user joined : ", user);
        });

        client.on("user-published", async (user, type) => {
            console.log("REMOTE USER PUBLISHED: ", user, type);
            await client.subscribe(user, type);
        });

        client.on("user-unpublished", (user, type) => {
            console.log("^^^ user-unpublished : ", user, type);
        });

        client.on("user-left", (user, reason) => {
            console.log("user-left  : ", user, reason);
        });

        client.on("connection-state-change", async (curState, reason) => {
            console.log("connection-state-change - state : ", curState);
            console.log("connection-state-change - reason: ", reason);
        });

        (async () => {
            await client
                .join(options.appId, options.channelName, options.token)
                .then(async () => {
                    console.log("CLIENT joined : ", client);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();

        return () => {
            client.leave();
        };
    }, []);

    return <>hello</>;
};
