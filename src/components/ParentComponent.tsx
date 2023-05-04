import { ChildComponent } from "./ChildComponent";

export const ParentComponent = () => {
    const greetParent = () => {
        alert("Hello Parent!");
    };

    return <ChildComponent greetHandler={greetParent} />;
};
