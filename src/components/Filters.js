import React from 'react';

const Filters = ({ sortOption, onSortChange, languageFilter, languages, onLanguageChange }) => (
  <div>
    <select value={sortOption} onChange={e => onSortChange(e.target.value)}>
        <option value="name">Name</option>
        <option value="stars">Stars</option>
        <option value="updated">Last Updated</option>
    </select>

    <select value={languageFilter} onChange={e => onLanguageChange(e.target.value)}>
      <option value="All">All</option>
      {languages.map(lang => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  </div>
);

export default Filters;
