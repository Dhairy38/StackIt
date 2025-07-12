import React from "react";
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/accounts/signup/",
                form
            );
            console.log(res.data);
            alert("Signup successful!");
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Signup failed.");
        }
    };
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>

                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit" className="btn signup-btn">
                        Sign Up
                    </button>
                </form>

                <div className="or-divider">
                    <span>or</span>
                </div>

                <div className="social-login">
                    <button className="btn google">
                        <FcGoogle size={24} />
                    </button>
                    {/* <button className="btn facebook">
                        <FaFacebook size={24} color="#fff" />
                    </button> */}
                    <button className="btn github">
                        <FaGithub size={24} color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
