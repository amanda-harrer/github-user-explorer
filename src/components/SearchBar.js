import React, { useState } from "react";

function SearchBar({ onSearch, darkMode }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-3 pb-3 rounded">
      <div className="input-group mb-3">
        <input
          id="username"
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`form-control ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
          style={darkMode ? { "::placeholder": { color: "#ccc" } } : {}}
        />
        <div className="input-group-append">
          <button
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-secondary"}`}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
