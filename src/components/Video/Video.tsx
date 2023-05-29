import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Video.module.scss";
import VideoService from "../../services/video.service";
import { VideoCall } from "./VideoCall";

import {
    Box,
    Button,
    Modal,
    Typography,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
} from "@mui/material";

interface AppData {
    appId: string;
    token: string;
}

export const Video = () => {
    const { channel } = useParams();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [userName, setUsername] = useState<string>("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [type, setType] = useState("");
    const [error, setError] = useState(false);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [appData, setAppData] = useState<AppData | null>(null);
    const [userType, setUserType] = useState<string | undefined>("");
    const [channelError, setChannelError] = useState<string | null>(null);

    useEffect(() => {
        window.addEventListener("beforeunload", (e) => {
            console.log("^^^ hello!");
        });
    });

    if (!channel) {
        return <Typography variant="h2">Channel not provided.</Typography>;
    }

    if (modalOpen) {
        return (
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ p: 2 }}
            >
                <Box
                    className={style.modalBox}
                    sx={{
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        padding: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Login is not possible
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalMessage}
                    </Typography>
                    <div
                        style={{
                            position: "relative",
                            marginBottom: "20px",
                            marginTop: "8px",
                        }}
                    >
                        <Button
                            variant="contained"
                            data-testid="ok-button"
                            onClick={() => setModalOpen(false)}
                            sx={{ position: "absolute", right: 0 }}
                        >
                            OK
                        </Button>
                    </div>
                </Box>
            </Modal>
        );
    }

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        if (event.target.name == "Username") {
            if (!value.trim().length) {
                setNameError("USER_REQUIRED_ERROR");
            } else {
                setNameError(null);
            }
            setUsername(value);
        } else if (event.target.name == "userType") {
            setType(value);
            setError(false);
            setTypeError(null);
        }
    };

    const handleJoin = async () => {
        if (!userName.trim().length) {
            setNameError("User name is required");
            return;
        }
        if (type == "") {
            setError(true);
            setTypeError("User type is required");
            return;
        }
        const data = {
            channelName: channel!,
            userName: userName,
            userType: type,
        };
        await VideoService.joinInterview(data)
            .then((response: any) => {
                setAppData({
                    token: response.data.data.token,
                    appId: response.data.data.appId,
                });
                setUserType(response.data.data.userType);
            })
            .catch((error: any) => {
                console.log("Eroor : ", error);

                if (
                    error.response.data.errorCode == "E000018" ||
                    "E000019" ||
                    "E000020"
                ) {
                    setModalMessage(error.response.data.message);
                    setModalOpen(true);
                } else {
                    setChannelError("Unable to join - please try again");
                }
            });
    };

    if (!appData) {
        return (
            <Stack spacing={2} padding={2} alignItems="center">
                <Paper
                    sx={{ padding: 2, minWidth: 300, width: "60vw" }}
                    variant="outlined"
                >
                    <Stack spacing={2} alignItems="flex-end">
                        <TextField
                            size="small"
                            label="Channel Name"
                            fullWidth
                            inputProps={{ readOnly: true }}
                            value={channel}
                            error={channelError !== null}
                            helperText={channelError}
                        />
                        <TextField
                            size="small"
                            label="Username"
                            name="Username"
                            fullWidth
                            inputProps={{ maxLength: 20 }}
                            onChange={(e) => handleInputChange(e)}
                            value={userName}
                            error={nameError !== null}
                            helperText={nameError}
                        />
                        <FormControl
                            style={{ width: "100%", position: "relative" }}
                            error={error}
                            variant="standard"
                        >
                            <RadioGroup
                                row
                                aria-labelledby="userType"
                                name="userType"
                                value={type}
                                onChange={(e) => handleInputChange(e)}
                                sx={{ justifyContent: "start" }}
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio size="small" />}
                                    label="Monitor"
                                />
                                <FormControlLabel
                                    value="2"
                                    control={<Radio size="small" />}
                                    label="Interviewer"
                                />
                                <FormControlLabel
                                    value="3"
                                    control={<Radio size="small" />}
                                    label="Backroom"
                                />
                            </RadioGroup>
                            <FormHelperText>{typeError}</FormHelperText>
                            <Button
                                className={style.joinBtn}
                                variant="contained"
                                onClick={() => handleJoin()}
                            >
                                Join
                            </Button>
                        </FormControl>
                    </Stack>
                </Paper>
            </Stack>
        );
    }

    return (
        <VideoCall
            options={{
                channelName: channel,
                userName,
                appId: appData.appId,
                token: appData.token,
                userType: userType,
            }}
        />
    );
};
