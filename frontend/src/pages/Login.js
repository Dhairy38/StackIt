import React from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import GoogleLoginButton from "../pages/GoogleLoginButton";
import GithubLoginButton from "../pages/GithubLoginButton";

const Login = () => {

    const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // ✅ On input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ On form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting:", form); // Debug

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          username: form.username,  // ✅ use form.username
          password: form.password,  // ✅ use form.password
        }
      );

      console.log(res.data);
      alert("Login successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed.");
    }
  };


    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login to Your Account</h2>

                <form>
                    <input type="text" placeholder="Username or Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit" className="btn login-btn">
                        Login
                    </button>
                </form>

                <div className="or-divider">
                    <span>or</span>
                </div>

                <div className="social-login">
                    <GoogleLoginButton />
                    {/* <button className="btn facebook">
                        <FaFacebook size={24} color="#fff" />
                    </button> */}
                    <GithubLoginButton />
                </div>

                <div className="register-link">
                    <p>
                        Don’t have an account?{" "}
                        <Link to="/signup">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
