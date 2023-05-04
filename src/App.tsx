// import { useState } from "react";
import "./App.css";
import Greet from "./components/Greet";
import { Message } from "./components/Message";
import { ParentComponent } from "./components/ParentComponent";

function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <Greet name="test" heroName="Batman" />
            <Message />
            <ParentComponent />
        </>
    );
}

export default App;
