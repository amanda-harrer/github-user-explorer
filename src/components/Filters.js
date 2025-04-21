import React from "react";

const Filters = ({
  sortOption,
  onSortChange,
  languageFilter,
  languages,
  onLanguageChange,
  darkMode,
}) => (
  <div
    className={`d-flex justify-content-end gap-4 my-3 ${darkMode ? "bg-dark text-white" : ""}`}
  >
    <div>
      <label htmlFor="sortSelect" className="form-label mb-1 text-end">
        Sort by:
      </label>
      <select
        id="sortSelect"
        className={`form-select ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="stars">Stars</option>
        <option value="updated">Last Updated</option>
      </select>
    </div>

    <div>
      <label htmlFor="languageSelect" className="form-label mb-1 text-end">
        Language:
      </label>
      <select
        id="languageSelect"
        className={`form-select ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
        value={languageFilter}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="all">All</option>
        {languages.map((languague) => (
          <option key={languague} value={languague}>
            {languague}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Filters;
