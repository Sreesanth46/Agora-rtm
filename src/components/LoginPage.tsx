import { useState } from "react";
import { AppInput } from "./AppInput";
import AgoraRTM from "agora-rtm-sdk";

let options = {
    uid: "",
    token: "",
};

// Your app ID
const appID = "765b5fbbb5f4496cbdf8128646dd8fbd";
// Your token
options.token = "<Your token>";

export const Login = () => {
    const [formValues, setFormValues] = useState({
        first: "",
        second: "",
    });

    const onChange = (value: string, inputName: string) => {
        setFormValues({ ...formValues, [inputName]: value });
    };

    const logForm = () => {
        console.log(formValues);
    };

    return (
        <>
            <AppInput
                inputName="first"
                label="User ID"
                value={formValues.first}
                onChange={onChange}
            ></AppInput>
            <AppInput
                inputName="second"
                label="User Name"
                value={formValues.second}
                onChange={onChange}
            ></AppInput>
            <button onClick={logForm}>Show</button>
        </>
    );
};
