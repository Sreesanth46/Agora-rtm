export const ChildComponent = (props: any) => {
    return (
        <>
            <button onClick={props.greetHandler}>Greet Parent</button>
        </>
    );
};
