// import { useState } from "react";
import "./App.css";
import Greet from "./components/Greet";
import { Message } from "./components/Message";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <Greet name="test" heroName="Batman" />
            <Message />
        </>
    );
}

export default App;
