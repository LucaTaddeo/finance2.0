import React from "react";

const App = () => {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch("/api/v1/health")
            .then((res) => res.json())
            .then((data) => setData(data.uptime));
    }, []);
    return (
        <div>
            <header>
                WebApp under construction [Uptime: {data}]
            </header>
        </div>
    );
}

export default App;
