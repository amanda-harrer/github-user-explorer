import { useState } from "react";

// Helper function to fetch data from GitHub API
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching data");
  return await response.json();
};

const sortRepos = (repos, sortBy) => {
  return [...repos].sort((a, b) => {
    switch (sortBy) {
      case "stars":
        return b.stargazers_count - a.stargazers_count;
      case "updated":
        return new Date(b.updated_at) - new Date(a.updated_at);
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });
};

const applyLanguageFilter = (repos, language) => {
  if (language === "all") return repos;
  return repos.filter((repo) => repo.language === language);
};

const fetchAllRepos = async (username) => {
  let allRepos = [];
  let page = 1;
  const perPageLimit = 100;

  while (true) {
    const url = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPageLimit}`;
    const reposBatch = await fetchData(url);
    allRepos = [...allRepos, ...reposBatch];
    if (reposBatch.length < perPageLimit) break;
    page++;
  }

  return allRepos;
};

const useGitHubData = (perPage = 10) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [languageFilter, setLanguageFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name");

  const fetchGitHubData = async (username) => {
    setError("");

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

    setLoading(true);
    // Even if cached data exists and is used immediately for faster UX,
    // we still fetch fresh data in the background to ensure it's up-to-date.
    // This keeps the app fast and accurate without making the user wait.
    try {
      const user = await fetchData(`https://api.github.com/users/${username}`);
      const allRepos = await fetchAllRepos(username);

      localStorage.setItem(
        cacheKey,
        JSON.stringify({ userData: user, repos: allRepos }),
      );

      setUserData(user);
      setRepos(allRepos);
      const filtered = applyLanguageFilter(allRepos, languageFilter);
      const sorted = sortRepos(filtered, sortOption);
      setFilteredRepos(sorted);
      setTotalPages(Math.ceil(sorted.length / perPage));
    } catch (err) {
      if (!cached) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sortBy) => {
    setSortOption(sortBy);
    const sorted = sortRepos(filteredRepos, sortBy);
    setFilteredRepos(sorted);
  };

  const handleLanguageFilter = (language) => {
    setLanguageFilter(language);
    const filtered = applyLanguageFilter(repos, language);
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
    availableLanguages: [
      ...new Set(repos.map((r) => r.language).filter(Boolean)),
    ],
    paginatedRepos: filteredRepos.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage,
    ),
  };
};

export default useGitHubData;
