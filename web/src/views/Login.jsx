import { useRef, useState } from "react";

const Login = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const pseudoRef = useRef();
    const checkPwdRef = useRef();
    const [loginMode, setLoginMode] = useState("Connexion");

    const formSubmit = () => {
        console.log("We have submitted the form !");
    }

    return (
        <>
            <form class="form form-login login" onSubmit={formSubmit}>
                <h2>{ loginMode }</h2>
                <section>
                    
                </section>
                <button></button>

            </form>
        </>
    )
}

export default Login;