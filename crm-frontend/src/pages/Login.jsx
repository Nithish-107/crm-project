import { useState } from "react";
import axios from "axios";
import '../css/Login.css'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const role =
    localStorage.getItem("role");


const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8080/auth/login",
            {
                email,
                password
            }
        );

        if(response.data) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "userName",
                response.data.name
            );

            window.location.href =
                "/dashboard";

        } else {

            alert("Invalid Credentials");
        }

    } catch (error) {

        console.log(error);
    }
};


    return (

<div className="login-page">

    <h1 className="login-title">Login</h1>

    <form className="login-form" onSubmit={handleLogin}>

        <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button className="login-button" type="submit">
            Login
        </button>


        <p>

    Don't have an account?

    <span
        onClick={() =>
            window.location.href = "/register"
        }
        style={{
            color: "#00bfff",
            cursor: "pointer",
            marginLeft: "5px"
        }}
    >
        Register
    </span>

</p>

    </form>

</div>
















    );
}

export default Login;