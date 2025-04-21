import React from "react";

function RepoList({ repos, darkMode }) {
  if (!repos || repos.length === 0) {
    return <p className="text-center pt-2">No repositories found.</p>;
  }

  return (
    <div>
      <h3 className="mb-3">Repositories</h3>
      <ul className="list-group">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className={`list-group-item d-flex flex-column flex-md-row justify-content-start align-items-start ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
          >
            <div className="ms-2 me-auto">
              <div className="d-flex align-items-center">
                <div className="fw-bold">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-decoration-none ${darkMode ? "text-info" : "text-dark"}`}
                  >
                    {repo.name}
                  </a>
                </div>
                <span
                  className={`badge ${darkMode ? "bg-secondary" : "bg-primary"} rounded-pill ms-2`}
                >
                  {repo.stargazers_count} ⭐
                </span>
              </div>
              {repo.description && (
                <small className={darkMode ? "text-light" : "text-muted"}>
                  {repo.description}
                </small>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepoList;
