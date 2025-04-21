import React from "react";

function DarkModeToggle({ darkMode, setDarkMode }) {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input me-3"
        type="checkbox"
        id="darkModeSwitch"
        checked={darkMode}
        onChange={toggleDarkMode}
        style={{ transform: "scale(1.5)" }}
      />
      <label className="form-check-label" htmlFor="darkModeSwitch">
        {darkMode ? "Dark Mode" : "Light Mode"}
      </label>
    </div>
  );
}

export default DarkModeToggle;
