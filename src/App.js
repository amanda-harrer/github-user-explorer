import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import DarkModeToggle from './components/DarkModeToggle';
import UserProfile from './components/UserProfile'; 
import RepoList from './components/RepoList';

function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Oops! Something went wrong while fetching data.');
    return await response.json();
  };

  const fetchGitHubData = async (username) => {
    setLoading(true);
    setError('');
    setUserData(null);
    setRepos([]);

    try {
      const userData = await fetchData(`https://api.github.com/users/${username}`);
      const reposData = await fetchData(`https://api.github.com/users/${username}/repos`);

      setUserData(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
        <RepoList repos={repos} />
      )}
    </div>
  );
}

export default App;
