import "../styles/css/index.css";

const NotFound = () => {
    useEffect(() => {
        if(!userToken) {
            return navigate("/"); 
        }
    }, []);

    return (
        <main className="not-found-main-container">
            <div className="info">
                <div className="glitch-bloc">
                    <p className="invisible-text">404</p>
                    <p className="glitchedAnim">404</p>
                    <p className="glitchedAnim">404</p>
                    <p className="glitchedAnim">404</p>
                </div>
                <p className="txt-info">Page not found...</p>
            </div>
        </main>
    );
}

export default NotFound;