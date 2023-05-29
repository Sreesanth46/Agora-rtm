import React from "react";
import { CssBaseline, Typography } from "@mui/material";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Video } from "./components/Video/Video";

function App() {
    return (
        <>
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path={"/"} element={<Dashboard />} />
                        <Route path={"/join/:channel"} element={<Video />} />
                        <Route
                            path="*"
                            element={
                                <Typography variant="h2" align="center">
                                    Not found
                                </Typography>
                            }
                        />
                    </Routes>
                </Router>
            </React.Fragment>
        </>
    );
}

export default App;
