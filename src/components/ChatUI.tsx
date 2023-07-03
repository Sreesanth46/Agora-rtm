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
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import { IonCol, IonGrid, IonImg, IonRow } from "@ionic/react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export const ChatUI = () => {
    const uid = "user1-Unique";
    const [input, setInput] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>();
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [activeImages, setActiveImages] = useState<any>([]);
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

    useEffect(() => {
        fileInputRef.current?.addEventListener("dragover", (e: any) => {
            e.preventDefault();
            e.stopPropagation();
        });
        fileInputRef.current?.addEventListener("drop", (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const imageUrls: any = [];

            const { files } = e.dataTransfer;
            for (const element of files) {
                const file = element;
                const reader = new FileReader();

                reader.onload = (e) => {
                    imageUrls.push(e.target!.result);
                    if (imageUrls.length === files.length) {
                        setSelectedImages([...selectedImages, ...imageUrls]);
                    }
                };

                reader.readAsDataURL(file);
            }
            console.log("drop event", files);
        });

        function beforeUnloadListener(event: any) {
            event.preventDefault();
            event.returnValue = "";
        }

        addEventListener("beforeunload", beforeUnloadListener, {
            capture: true,
        });
    }, []);

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

    const { takePhoto, photos } = usePhotoGallery();

    const handleFileChange = (event: any) => {
        const files = event.target.files;
        const imageUrls: any = [];

        if (event === null || undefined) return;

        for (const element of files) {
            const file = element;
            const reader = new FileReader();

            reader.onload = (e) => {
                imageUrls.push(e.target!.result);
                if (imageUrls.length === files.length) {
                    setSelectedImages([...selectedImages, ...imageUrls]);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handlePaste = (event: any) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData)
            .items;

        for (const element of items) {
            const item = element;
            if (item.type.includes("image")) {
                console.log("-------------------------------- Item: ", item);
                const blob = item.getAsFile();
                console.log("-------------------------------- blob: ", blob);
                const reader = new FileReader();

                reader.onloadend = () => {
                    console.log("-----------------", reader.result);
                    setSelectedImages([...selectedImages, reader.result]);
                };
                reader.readAsDataURL(blob);
            }
        }
    };

    return (
        <>
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
                                                                marginTop:
                                                                    "2px",
                                                                marginBottom:
                                                                    "auto",
                                                                marginLeft:
                                                                    "10px",
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
                                                                fontFamily:
                                                                    "auto",
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
                                                                marginBottom:
                                                                    "6px",
                                                            }}
                                                        >
                                                            {message.uid !==
                                                                uid &&
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
                                                    <Grid
                                                        item
                                                        md={2}
                                                        xs={3}
                                                        sm={3}
                                                    >
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
                                                                fontFamily:
                                                                    "auto",
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
                                                                marginBottom:
                                                                    "6px",
                                                            }}
                                                        >
                                                            {message.uid ==
                                                                uid &&
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
                            <Button
                                size="small"
                                variant="contained"
                                className={style.sendbutton}
                                onClick={() => takePhoto()}
                            >
                                +
                            </Button>
                            <form onSubmit={(e: any) => sendMessage(input, e)}>
                                <div
                                    className={style.messageinput}
                                    ref={
                                        fileInputRef as React.RefObject<HTMLInputElement>
                                    }
                                >
                                    <Input
                                        sx={{
                                            width: "100%",
                                        }}
                                        disableUnderline
                                        multiline
                                        maxRows={2}
                                        placeholder="Send a message to everyone"
                                        type="text"
                                        value={input}
                                        onPaste={handlePaste}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                    />
                                    <Grid
                                        sx={{
                                            xs: 2,
                                            sm: 3,
                                            lg: 6,
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            position: "relative",
                                        }}
                                    >
                                        {selectedImages.map(
                                            (item: any, i: any) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        position: "relative",
                                                        width: "200px",
                                                    }}
                                                >
                                                    <HighlightOffOutlinedIcon
                                                        onClick={() => {
                                                            setSelectedImages(
                                                                selectedImages.filter(
                                                                    (
                                                                        image: any
                                                                    ) =>
                                                                        image !==
                                                                        item
                                                                )
                                                            );
                                                        }}
                                                        className={
                                                            style.closeButton
                                                        }
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            // fill: "blue",
                                                            right: 0,
                                                            zIndex: 1,
                                                        }}
                                                    />
                                                    <img
                                                        style={{
                                                            width: "100%",
                                                            aspectRatio: 16 / 9,
                                                            objectFit:
                                                                "contain",
                                                        }}
                                                        src={`${item}`}
                                                        srcSet={`${item}`}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </Grid>
                                </div>
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
            <div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    // style={{ display: "none" }}
                />
                {/* <AttachFileIcon onClick={() => fileInputRef.current!.click()} /> */}
            </div>

            <ImageList
                sx={{ maxWidth: 500, maxHeight: 450 }}
                cols={3}
                rowHeight={164}
            >
                {selectedImages.map((item: any, i: any) => (
                    <ImageListItem key={i}>
                        <HighlightOffOutlinedIcon
                            onClick={() => {
                                setSelectedImages(
                                    selectedImages.filter(
                                        (image: any) => image !== item
                                    )
                                );
                            }}
                            style={{ position: "absolute", right: 0 }}
                        />
                        <img
                            className={
                                activeImages.some((e: any) => e === i)
                                    ? style.activeColor
                                    : ""
                            }
                            onClick={() => {
                                const index = activeImages.indexOf(i);
                                if (index > -1) {
                                    setActiveImages(
                                        activeImages.filter((e: any) => e !== i)
                                    );
                                } else {
                                    setActiveImages([...activeImages, i]);
                                }
                            }}
                            src={`${item}`}
                            srcSet={`${item}`}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <IonGrid>
                <IonRow>
                    {photos.map((photo, index) => (
                        <IonCol size="6" key={photo.filepath}>
                            <IonImg src={photo.webviewPath} />
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </>
    );
};
