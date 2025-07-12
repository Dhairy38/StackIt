// Fix for Home.js clickable card issue

import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [filter, setFilter] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/questions/")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filters = ["Newest", "Most Voted", "Unanswered"];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setShowFilters(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Stackit</div>
        <div className="navbar-buttons">
          <Link to="/login" className="btn login">
            Login
          </Link>
          <Link to="/signup" className="btn signup">
            Signup
          </Link>
        </div>
      </nav>

      <div className="home-container">
        <div className="top-bar">
          <div className="top-bar-row">
            <Link to="/ask" className="ask-btn">
              Ask New Question
            </Link>

            <div className="top-bar-row">
              <div className="filter-dropdown">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="filter-btn active"
                >
                  {filter} ▼
                </button>
                {showFilters && (
                  <div className="filter-options">
                    {filters.map((f) => (
                      <div
                        key={f}
                        onClick={() => handleFilterChange(f)}
                        className="filter-option"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="questions-list">
          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/questions/${q.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card">
                <div>
                  <h3 className="card-title">{q.title}</h3>
                  <p className="card-desc">{q.description}</p>
                  <div>
                    {q.tags.split(",").map((tag, i) => (
                      <span key={i} className="tag">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <p className="username">User: {q.username}</p>
                </div>

                <div className="answers-box">
                  <div>{q.answers || 0} ans</div>
                  <div style={{ marginTop: "0.5rem" }}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        axios.post(`http://127.0.0.1:8000/api/questions/${q.id}/vote/`, { action: "upvote" })
                          .then(res => {
                            const updated = questions.map(ques =>
                              ques.id === q.id ? { ...ques, votes: res.data.votes } : ques
                            );
                            setQuestions(updated);
                          });
                      }}
                      className="btn small"
                    >
                      👍
                    </button>
                    <span style={{ margin: "0 0.5rem" }}>{q.votes || 0}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        axios.post(`http://127.0.0.1:8000/api/questions/${q.id}/vote/`, { action: "downvote" })
                          .then(res => {
                            const updated = questions.map(ques =>
                              ques.id === q.id ? { ...ques, votes: res.data.votes } : ques
                            );
                            setQuestions(updated);
                          });
                      }}
                      className="btn small"
                    >
                      👎
                    </button>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        <div className="pagination">
          <button>{`<`}</button>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button key={n}>{n}</button>
          ))}
          <button>{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;