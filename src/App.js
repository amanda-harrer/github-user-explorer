import React, { useState } from "react";
import useGitHubData from "./hooks/useGitHubData";
import SearchBar from "./components/SearchBar";
import DarkModeToggle from "./components/DarkModeToggle";
import UserProfile from "./components/UserProfile";
import RepoList from "./components/RepoList";
import Pagination from "./components/Pagination";
import Filters from "./components/Filters";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const {
    userData,
    paginatedRepos,
    currentPage,
    totalPages,
    loading,
    error,
    languageFilter,
    sortOption,
    fetchGitHubData,
    setCurrentPage,
    handleSortChange,
    handleLanguageFilter,
    availableLanguages,
  } = useGitHubData();

  return (
    <div className={darkMode ? "bg-dark text-white" : ""}>
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h1 className="mb-3 mb-md-0">devfinder</h1>
          <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <SearchBar onSearch={fetchGitHubData} darkMode={darkMode} />

        {loading && (
          <p className={`${darkMode ? "text-light" : "text-muted"}`}>
            Loading...
          </p>
        )}
        {error && <p className="text-danger">{error}</p>}

        <UserProfile user={userData} darkMode={darkMode} />

        {userData?.public_repos > 0 && (
          <Filters
            sortOption={sortOption}
            onSortChange={handleSortChange}
            languageFilter={languageFilter}
            onLanguageChange={handleLanguageFilter}
            languages={availableLanguages}
            darkMode={darkMode}
          />
        )}

        <div>
          <RepoList repos={paginatedRepos} darkMode={darkMode} />
          {paginatedRepos.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
