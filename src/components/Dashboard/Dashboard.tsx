import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { Button, IconButton, Paper, TextField } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { format } from "react-string-format";
import VideoService from "../../services/video.service";

export const Dashboard: React.FC = () => {
    const [channel, setChannel] = useState<string>("");
    const [channelError, setChannelError] = useState<string | null>(null);
    const [link, setLink] = useState<string | null>(null);
    const [linkMessage, setLinkMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setChannel(value);
        if (!value.trim().length) {
            setChannelError("Channel name is required");
        } else {
            setChannelError(null);
        }
    };

    const handleJoin = () => {
        if (!channel.trim().length) {
            setChannelError("Channel name is required");
            return;
        }
        navigate(`join/${channel}`);
    };

    const handleCreate = () => {
        if (!channel.trim().length) {
            setChannelError("Channel name is required");
            return;
        }

        const data = {
            channelName: channel,
        };
        VideoService.getToken(data)
            .then((response: any) => {
                console.debug(response.data.data);
                setLink(format("http://127.0.0.1:8000/api/join/{0}", channel));
            })
            .catch((error: any) => {
                setChannelError("Unable to create channel - please try again");
                console.error(error);
            });
    };

    const handleCopy = () => {
        if (link) {
            navigator.clipboard.writeText(link);
            setLinkMessage("Link is copied to clipboard!");
        }
    };

    return (
        <>
            {" "}
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
                            inputProps={{ maxLength: 100 }}
                            onChange={(e) => handleInputChange(e)}
                            value={channel}
                            error={channelError !== null}
                            helperText={channelError}
                        />
                        <Stack
                            width="100%"
                            spacing={1}
                            direction="row"
                            justifyContent="space-between"
                            alignContent="center"
                        >
                            <Stack
                                spacing={1}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                {link && (
                                    <>
                                        <TextField
                                            size="small"
                                            inputProps={{ readOnly: true }}
                                            value={link}
                                            helperText={linkMessage}
                                        />
                                        <IconButton
                                            onClick={() => handleCopy()}
                                        >
                                            <ContentCopy />
                                        </IconButton>
                                    </>
                                )}
                            </Stack>
                            <Stack
                                spacing={1}
                                direction="row"
                                alignItems="flex-start"
                            >
                                <Button
                                    variant="outlined"
                                    data-testid="join-button"
                                    onClick={() => handleJoin()}
                                >
                                    Join
                                </Button>
                                <Button
                                    variant="contained"
                                    data-testid="create-button"
                                    onClick={() => handleCreate()}
                                >
                                    Create
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </>
    );
};
