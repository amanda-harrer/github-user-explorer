import React, { useEffect } from "react";

function DarkModeToggle({ darkMode, setDarkMode }) {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="form-check form-switch d-flex justify-content-center justify-content-md-start align-items-center">
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
