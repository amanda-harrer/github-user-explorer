import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';
import UserProfile from './components/UserProfile'; 
import RepoList from './components/RepoList';
import Pagination from './components/Pagination';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 30;

  const fetchUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  };

  const fetchReposData = async (username, perPage,  page = 1) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error('Repos not found');
    return await response.json();
  };

  const fetchGitHubData = async (username, page = 1) => {
    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);
    setCurrentPage(page);

    try {
      const userData = await fetchUserData(username);
      setUserData(userData);

      const reposData = await fetchReposData(username, perPage, page);
      setRepos(reposData);

      // Calculate total pages based on the number of repositories
      const total = userData.public_repos;
      setTotalPages(Math.ceil(total / perPage));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    setRepos([]);
    
    try {
      const reposData = await fetchReposData(userData.login, perPage, page);
      setRepos(reposData); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🔍 GitHub User Explorer</h1>
      <SearchBar onSearch={fetchGitHubData} />
      <DarkModeToggle />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <UserProfile user={userData} />

      {repos.length > 0 && (
        <div>	
        <RepoList repos={repos} />
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      )}
    </div>
  );
}

export default App;
