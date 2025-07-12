import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await axios.get(`http://127.0.0.1:8000/api/questions/${id}/`);
        setQuestion(qRes.data);

        // optionally fetch answers
        const aRes = await axios.get(`http://127.0.0.1:8000/api/questions/${id}/answers/`);
        setAnswers(aRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  if (!question) {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">Stackit</div>
        </nav>
        <div className="home-container">Loading question…</div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Stackit</div>
        <div className="navbar-buttons">
          <Link to="/login" className="btn login">Login</Link>
          <Link to="/signup" className="btn signup">Signup</Link>
        </div>
      </nav>

      <div className="home-container">
        <div className="breadcrumbs">
          <Link to="/" className="card-title">Home</Link> &gt;{" "}
          <span className="card-title">{question.title}</span>
        </div>

        <div className="card">
          <div>
            <h3 className="card-title">{question.title}</h3>
            <p className="card-desc">{question.description}</p>
            <div>
              {question.tags?.split(",").map((tag, i) => (
                <span key={i} className="tag">{tag.trim()}</span>
              ))}
            </div>
            <p className="username">User: {question.username || "Anonymous"}</p>
          </div>
        </div>

        <h4 style={{ marginTop: "2rem" }}>
          {answers.length > 0 ? `${answers.length} Answer(s)` : "No answers yet."}
        </h4>

        {answers.length > 0 && (
          <div className="questions-list">
            {answers.map((ans, i) => (
              <div className="card" key={i}>
                <p className="username">Answer by {ans.username || "User"}</p>
                <p className="card-desc">{ans.content}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <h4>Submit Your Answer</h4>
          <textarea
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
          <button className="ask-btn" style={{ marginTop: "1rem" }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
