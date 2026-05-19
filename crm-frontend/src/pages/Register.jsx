import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://crm-project-kizo.onrender.com/auth/register",
                formData
            );

            alert(response.data);

            // window.location.href = "/login";
            navigate("/login");

        } catch (error) {

            console.log(error);
            alert("Registration Failed");
        }
    };

    return (

        <div className="register-page">

            <h1 className="register-title">
                Register
            </h1>

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <input
                    className="register-input"
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    className="register-input"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    className="register-input"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button
                    className="register-button"
                    type="submit"
                >
                    Register
                </button>

            </form>
        </div>
    );
}

export default Register;