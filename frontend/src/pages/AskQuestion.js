import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./AskQuestion.css";

export default function AskQuestion() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/questions/", {
                title,
                description,
                tags
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            navigate("/");  // go back to home
        } catch (err) {
            console.error(err);
            alert("Failed to submit question");
        }
    };

    return (
        <div className="ask-question-container">
            <h2>Ask a New Question</h2>
            <form onSubmit={handleSubmit} className="ask-question-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
