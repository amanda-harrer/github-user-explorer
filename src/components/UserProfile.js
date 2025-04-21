import React from "react";

function UserProfile({ user, darkMode }) {
  if (!user) return null;

  return (
    <div
      className={`card ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
    >
      <div className="card-body text-left d-flex">
        {/* Avatar and Text Section */}
        <img
          src={user.avatar_url || null}
          alt="avatar"
          className="rounded-circle me-3"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        />
        <div>
          <h5 className="card-title">{user.name || "No name provided"}</h5>
          <p className="card-text">
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noreferrer"
              className={darkMode ? "text-info" : "text-primary"}
            >
              {user.login}
            </a>
          </p>
          <p className="card-text">
            Joined{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Date not available"}
          </p>
          <p className="card-text">{user.bio || "No bio available"}</p>
          <p className="card-text">
            <i className="fa fa-map-marker me-2"></i>
            {user.location || "Location not provided"}
          </p>

          {user.blog ? (
            <p className="card-text">
              <i className="fa fa-link me-2"></i>
              <a
                href={user.blog}
                target="_blank"
                rel="noopener noreferrer"
                className={darkMode ? "text-info" : "text-primary"}
              >
                {user.blog}
              </a>
            </p>
          ) : (
            <p className="card-text">
              <i className="fa fa-link me-2"></i>
              No blog available
            </p>
          )}
        </div>
      </div>

      {/* Public Repos, Followers, and Following Section */}
      <div
        className={`d-flex justify-content-around py-3 rounded-3 ${darkMode ? "lighter-dark-opacity-bg text-white" : "bg-light text-dark"}`}
      >
        <div className="text-center">
          <p className="card-text">Public Repos</p>
          <p className="card-text">{user.public_repos}</p>
        </div>
        <div className="text-center">
          <p className="card-text">Followers</p>
          <p className="card-text">{user.followers}</p>
        </div>
        <div className="text-center">
          <p className="card-text">Following</p>
          <p className="card-text">{user.following}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
