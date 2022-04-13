import React from "react";

const App = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (
        <div>
            <header>
                TEST HERE {data}
            </header>
        </div>
    );
}

export default App;
