import React from "react";

const App = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api/v1/health")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
    return (
        <div>
            <header>
                WebApp under construction {data}
            </header>
        </div>
    );
}

export default App;
