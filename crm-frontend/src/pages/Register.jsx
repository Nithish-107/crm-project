import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://crm-project-kizo.onrender.com/auth/register",
        formData,
      );

      alert("Registration Successful");

      // remove old login session
      localStorage.removeItem("isLoggedIn");

      // redirect to login page
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <h1 className="register-title">Register</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <br />
        <br />

        <button className="register-button" type="submit">
          Register
        </button>

        <p>
          Already have an account?
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#00bfff",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
