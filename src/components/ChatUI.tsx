import {
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    Paper,
    Slide,
    Typography,
} from "@mui/material";
import style from "./ChatUI.module.scss";
import { useEffect, useRef, useState } from "react";

export const ChatUI = () => {
    const uid = "user1-Unique";
    const [input, setInput] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [scrolledToTop, setScrolledToTop] = useState<boolean>(false);

    const [msg, setMsg] = useState([
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message1",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 2",
        },
        {
            userName: "user2",
            uid: "user2-Unique",
            text: "message 3",
        },
        {
            userName: "user2",
            uid: "user2-Unique",
            text: "message 4",
        },
        {
            userName: "user3",
            uid: "user3-Unique",
            text: "message 5",
        },
        {
            userName: "user4",
            uid: "user4-Unique",
            text: "message 6",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 7",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 8",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 9",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 10",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 11",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 12",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 13",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 14",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 15",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 16",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 17",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 18",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 19",
        },
        {
            userName: "user1",
            uid: "user1-Unique",
            text: "message 20",
        },
    ]);

    const pages = msg.length / 10;

    const [messages, setMessages] = useState<
        {
            userName: string;
            uid: string;
            text: string;
        }[]
    >([]);

    useEffect(() => {
        (async () => {
            const txt = await spliceMessage(msg.length);
            setMessages([...txt]);
        })();
        setHasMore(!(pages === pageNumber));
        setPageNumber(pageNumber + 1);
    }, []);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!scrolledToTop) {
            chatContainer!.scrollTo(0, chatContainer!.scrollHeight);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setScrolledToTop(true);
                    if (hasMore) {
                        setMessages((prev) => [...msg, ...prev]);
                    }
                }
            });
        });

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [messages]);

    const spliceMessage = (sp: any): any => {
        return msg.slice(sp - 10, sp);
    };

    const sendMessage = (message: string, e: any) => {
        e.preventDefault();
        if (message === "") return;
        setMessages((prev) => {
            return [
                ...prev,
                {
                    userName: "user1",
                    uid: "user1-Unique",
                    text: message,
                },
            ];
        });
        setInput("");
    };

    const testMessage = (e: any) => {
        e.preventDefault();
        console.log("message:  received message");
    };

    interface ChatMessageProp {
        message: {
            userName: string;
            uid: string;
            text: string;
        };
        i: number;
    }

    const ChatMessage = ({ message, i }: ChatMessageProp) => {
        return (
            <>
                <Box>
                    <Grid container>
                        <Grid
                            container
                            item
                            md={6}
                            xs={6}
                            sx={{ marginTop: "5px" }}
                            direction="row"
                            spacing={"5px"}
                        >
                            <Grid
                                item
                                container
                                md={12}
                                xs={12}
                                sm={12}
                                sx={{
                                    paddingLeft: "10px !important",
                                }}
                                direction="row"
                            >
                                <h5
                                    style={{
                                        fontSize: 10,
                                        opacity: "0.5",
                                        color: "black",
                                        marginTop: "2px",
                                        marginBottom: "auto",
                                        marginLeft: "10px",
                                        width: "fit-content",
                                        borderRadius: 10,
                                        display:
                                            message.uid !== uid
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    {message.userName}
                                </h5>
                            </Grid>
                            <Grid
                                item
                                container
                                md={10}
                                xs={10}
                                sm={10}
                                sx={{
                                    paddingLeft: "10px !important",
                                }}
                                direction="row"
                            >
                                <Typography
                                    style={{
                                        color: "black",
                                        fontFamily: "auto",
                                        backgroundColor:
                                            "rgb(157 204 255 / 31%)",
                                        padding: 5,
                                        borderRadius: 10,
                                        wordBreak: "break-all",
                                        display:
                                            message.uid !== uid
                                                ? "block"
                                                : "none",
                                        marginBottom: "6px",
                                    }}
                                >
                                    {message.uid !== uid && message.text}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            xs={6}
                            sm={6}
                            md={6}
                            sx={{ marginTop: "5px" }}
                        >
                            <Grid container item md={2} xs={3} sm={3}>
                                <h5
                                    style={{
                                        fontSize: 10,
                                        opacity: "0.5",
                                        color: "black",
                                        width: "fit-content",
                                        margin: "auto",
                                        padding: 5,
                                        borderRadius: 10,
                                        display:
                                            message.uid == uid
                                                ? "block"
                                                : "none",
                                    }}
                                >
                                    {message.uid == uid}
                                </h5>
                            </Grid>
                            <Grid item container md={10} xs={9} sm={9}>
                                <Typography
                                    style={{
                                        color: "black",
                                        fontFamily: "auto",
                                        backgroundColor: "#e4fbcc",
                                        width: "95%",
                                        padding: 5,
                                        borderRadius: 10,
                                        wordBreak: "break-all",
                                        display:
                                            message.uid == uid
                                                ? "block"
                                                : "none",
                                        marginBottom: "6px",
                                    }}
                                >
                                    {message.uid == uid && message.text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    };

    return (
        <>
            <Slide direction="left" in={true}>
                <Paper
                    ref={chatContainerRef}
                    className={style.chatDiv}
                    sx={{
                        border: "1px solid darkgrey",
                        height: "30vh",
                        width: "80vw",
                        padding: "2%",
                        overflowY: "scroll",
                    }}
                >
                    <Box>
                        <Box className={style.chat}>
                            {messages.map((message, i) => {
                                return hasMore && i === 0 ? (
                                    <>
                                        <div ref={loadingRef}>Loading ....</div>
                                        <ChatMessage
                                            i={i}
                                            key={i}
                                            message={message}
                                        />
                                    </>
                                ) : (
                                    <ChatMessage
                                        i={i}
                                        key={i}
                                        message={message}
                                    />
                                );
                            })}
                        </Box>
                        <Box className={style.messagebody}>
                            <form onSubmit={(e: any) => sendMessage(input, e)}>
                                <Input
                                    className={style.messageinput}
                                    disableUnderline
                                    // multiline
                                    maxRows={2}
                                    placeholder="Send a message to everyone"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    size="small"
                                    type="submit"
                                    className={style.sendbutton}
                                    // onClick={() => sendMessage(input)}
                                >
                                    Send
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Paper>
            </Slide>
        </>
    );
};
