const Greet = (props: { name: string; heroName: string }) => {
    return (
        <>
            <h1>
                Hello World {props.name} a.k.a {props.heroName}
            </h1>
        </>
    );
};

export default Greet;
