import {
    Box,
    Button,
    Grid,
    Input,
    Paper,
    Slide,
    Typography,
} from "@mui/material";
import style from "./ChatUI.module.scss";
import { useState } from "react";

export const ChatUI = () => {
    const uid = "user1-Unique";
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState([
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
    ]);

    const sendMessage = (message: string) => {
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

    return (
        <Slide direction="left" in={true}>
            <Paper className={style.chatDiv}>
                <Box>
                    <Box className={style.chat}>
                        {messages.map((message, i) => {
                            return (
                                <div key={i}>
                                    <Box>
                                        <Grid container>
                                            <Grid
                                                container
                                                item
                                                md={6}
                                                sm={6}
                                                xs={6}
                                                sx={{ marginTop: "5px" }}
                                                direction="row"
                                                spacing={"5px"}
                                            >
                                                <Grid
                                                    item
                                                    md={12}
                                                    xs={12}
                                                    sm={12}
                                                    sx={{
                                                        paddingLeft:
                                                            "10px !important",
                                                    }}
                                                    direction="row"
                                                >
                                                    <h5
                                                        style={{
                                                            fontSize: 10,
                                                            opacity: "0.5",
                                                            color: "black",
                                                            marginTop: "2px",
                                                            marginBottom:
                                                                "auto",
                                                            marginLeft: "10px",
                                                            width: "fit-content",
                                                            borderRadius: 10,
                                                            display:
                                                                message.uid !==
                                                                uid
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                    >
                                                        {message.userName}
                                                    </h5>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={10}
                                                    xs={10}
                                                    sm={10}
                                                    sx={{
                                                        paddingLeft:
                                                            "10px !important",
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
                                                            wordBreak:
                                                                "break-all",
                                                            display:
                                                                message.uid !==
                                                                uid
                                                                    ? "block"
                                                                    : "none",
                                                            marginBottom: "6px",
                                                        }}
                                                    >
                                                        {message.uid !== uid &&
                                                            message.text}
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
                                                <Grid item md={2} xs={3} sm={3}>
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
                                                                message.uid ==
                                                                uid
                                                                    ? "block"
                                                                    : "none",
                                                        }}
                                                    >
                                                        {message.uid == uid}
                                                    </h5>
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={10}
                                                    xs={9}
                                                    sm={9}
                                                >
                                                    <Typography
                                                        style={{
                                                            color: "black",
                                                            fontFamily: "auto",
                                                            backgroundColor:
                                                                "#e4fbcc",
                                                            width: "95%",
                                                            padding: 5,
                                                            borderRadius: 10,
                                                            wordBreak:
                                                                "break-all",
                                                            display:
                                                                message.uid ==
                                                                uid
                                                                    ? "block"
                                                                    : "none",
                                                            marginBottom: "6px",
                                                        }}
                                                    >
                                                        {message.uid == uid &&
                                                            message.text}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                            );
                        })}
                    </Box>
                    <Box className={style.messagebody}>
                        <Input
                            className={style.messageinput}
                            disableUnderline
                            multiline
                            maxRows={2}
                            placeholder="Send a message to everyone"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            className={style.sendbutton}
                            onClick={() => sendMessage(input)}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Slide>
    );
};
