import { useState } from 'react';

const useGitHubData = (perPage = 10) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [languageFilter, setLanguageFilter] = useState('All');
  const [sortOption, setSortOption] = useState('name');

  const fetchUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error('User not found');
    return await response.json();
  };

  const fetchAllRepos = async (username) => {
    let allRepos = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const res = await fetch(`https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`);
      if (!res.ok) throw new Error('Repos not found');
      const data = await res.json();
      allRepos = [...allRepos, ...data];
      if (data.length < perPage) break;
      page++;
    }
    return allRepos;
  };

  const sortRepos = (repos, sortBy) => {
    return [...repos].sort((a, b) => {
      switch (sortBy) {
        case 'stars': return b.stargazers_count - a.stargazers_count;
        case 'updated': return new Date(b.updated_at) - new Date(a.updated_at);
        case 'name': default: return a.name.localeCompare(b.name);
      }
    });
  };

  const applyLanguageFilter = (repos, language) => {
    if (language === 'All') return repos;
    return repos.filter(repo => repo.language === language);
  };

  const fetchGitHubData = async (username) => {
    setError('');

    const cacheKey = `githubData_${username}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const { userData, repos } = JSON.parse(cached);
        setUserData(userData);
        setRepos(repos);
        const filtered = applyLanguageFilter(repos, languageFilter);
        const sorted = sortRepos(filtered, sortOption);
        setFilteredRepos(sorted);
        setTotalPages(Math.ceil(sorted.length / perPage));
      }
    
      // Revalidate in background
      setLoading(true);
      try {
        const user = await fetchUserData(username);
        const all = await fetchAllRepos(username);
        localStorage.setItem(cacheKey, JSON.stringify({ userData: user, repos: all }));
    
        // Update with fresh data
        setUserData(user);
        setRepos(all);
        const filtered = applyLanguageFilter(all, languageFilter);
        const sorted = sortRepos(filtered, sortOption);
        setFilteredRepos(sorted);
        setTotalPages(Math.ceil(sorted.length / perPage));
      } catch (err) {
        if (!cached) setError(err.message); // only show error if no cached fallback
      } finally {
        setLoading(false);
      }
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    const sorted = sortRepos(filteredRepos, sort);
    setFilteredRepos(sorted);
  };

  const handleLanguageFilter = (lang) => {
    setLanguageFilter(lang);
    const filtered = applyLanguageFilter(repos, lang);
    const sorted = sortRepos(filtered, sortOption);
    setFilteredRepos(sorted);
    setCurrentPage(1);
    setTotalPages(Math.ceil(sorted.length / perPage));
  };

  return {
    userData,
    filteredRepos,
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
    availableLanguages: [...new Set(repos.map(r => r.language).filter(Boolean))],
    paginatedRepos: filteredRepos.slice((currentPage - 1) * perPage, currentPage * perPage),
  };
};

export default useGitHubData;
