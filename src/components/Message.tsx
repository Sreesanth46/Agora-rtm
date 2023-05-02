import { useState } from "react";

export const Message = () => {
    const [message, setMessage] = useState("Hello visitor");
    return (
        <>
            {message}
            <button onClick={() => setMessage("Thank you for subscribing")}>
                Subscribe
            </button>
        </>
    );
};
