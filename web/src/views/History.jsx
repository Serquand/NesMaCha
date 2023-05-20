const History = () => {
    useEffect(() => {
        if(!userToken) {
            return navigate("/"); 
        }
    }, []);

    return (
        <>
            <h1>History</h1>
        </>
    )
}

export default History;