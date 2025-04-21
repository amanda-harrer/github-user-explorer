import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import useGitHubData from "./hooks/useGitHubData";

jest.mock("./hooks/useGitHubData");

describe("App Component", () => {
  beforeEach(() => {
    useGitHubData.mockReturnValue({
      userData: { public_repos: 5 },
      paginatedRepos: [
        { id: 1, name: "Repo 1" },
        { id: 2, name: "Repo 2" },
      ],
      currentPage: 1,
      totalPages: 2,
      loading: false,
      error: null,
      languageFilter: "",
      sortOption: "",
      fetchGitHubData: jest.fn(),
      setCurrentPage: jest.fn(),
      handleSortChange: jest.fn(),
      handleLanguageFilter: jest.fn(),
      availableLanguages: ["JavaScript", "Python"],
    });
  });

  test("renders the App component", () => {
    render(<App />);
    expect(screen.getByText(/devfinder/i)).toBeInTheDocument();
  });

  test("renders loading message when loading is true", () => {
    useGitHubData.mockReturnValueOnce({
      ...useGitHubData(),
      loading: true,
    });

    render(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders error message when error exists", () => {
    useGitHubData.mockReturnValueOnce({
      ...useGitHubData(),
      error: "An error occurred",
    });

    render(<App />);
    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  test("renders Filters when userData has public repositories", () => {
    useGitHubData.mockReturnValueOnce({
      ...useGitHubData(),
      userData: { public_repos: 5 },
    });

    render(<App />);
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
  });

  test("does not render Filters when userData has no public repositories", () => {
    useGitHubData.mockReturnValueOnce({
      ...useGitHubData(),
      userData: { public_repos: 0 },
    });

    render(<App />);
    expect(screen.queryByText(/sort by/i)).not.toBeInTheDocument();
  });

  test("renders the Pagination component when there are paginated repos", () => {
    render(<App />);
    expect(screen.getByText(/Page 1 of 2/i)).toBeInTheDocument();
  });

  test("does not render Pagination when there are no paginated repos", () => {
    useGitHubData.mockReturnValueOnce({
      ...useGitHubData(),
      paginatedRepos: [],
    });

    render(<App />);
    expect(screen.queryByText(/Page 1 of 2/i)).not.toBeInTheDocument();
  });
});
