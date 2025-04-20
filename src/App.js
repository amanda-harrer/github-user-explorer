import React from 'react';
import useGitHubData from './hooks/useGitHubData';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';
import UserProfile from './components/UserProfile'; 
import RepoList from './components/RepoList';
import Pagination from './components/Pagination';
import Filters from './components/Filters';

function App() {
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
    availableLanguages
  } = useGitHubData();

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🔍 GitHub User Explorer</h1>
      <SearchBar onSearch={fetchGitHubData} />
      <DarkModeToggle />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UserProfile user={userData} />

      {userData && (
        <Filters
          sortOption={sortOption}
          onSortChange={handleSortChange}
          languageFilter={languageFilter}
          onLanguageChange={handleLanguageFilter}
          languages={availableLanguages}
        />
      )}

      {paginatedRepos.length > 0 && (
        <div>	
        <RepoList repos={paginatedRepos} />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
        />
      </div>
      )}
    </div>
  );
}

export default App;
