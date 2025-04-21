import { renderHook, act, waitFor } from "@testing-library/react";
import useGitHubData from "./useGitHubData";

describe("useGitHubData", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set error message if no cached data and fetch fails", async () => {
    const username = "nonexistent-user";
    const errorMessage = "Error fetching data";

    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.userData).toBeNull();
    expect(result.current.filteredRepos).toEqual([]);
  });

  it("should use cached data if available", async () => {
    const username = "test-user";
    const cachedData = {
      userData: { login: username },
      repos: [{ id: 1, name: "repo1", language: "JavaScript" }],
    };

    localStorage.setItem(`githubData_${username}`, JSON.stringify(cachedData));

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    expect(result.current.userData).toEqual(cachedData.userData);
    expect(result.current.filteredRepos).toEqual(cachedData.repos);
    expect(result.current.error).toBe("");
  });

  it("should fetch fresh data if no cached data exists", async () => {
    const username = "test-user";
    const userData = { login: username };
    const repos = [
      { id: 1, name: "repo1", language: "JavaScript" },
      { id: 2, name: "repo2", language: "Python" },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => userData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => repos,
      });

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.userData).toBeDefined();
    });

    expect(result.current.userData).toEqual(userData);
    expect(result.current.filteredRepos).toEqual(repos);
    expect(result.current.error).toBe("");
  });

  it("should sort repositories by stars", async () => {
    const username = "test-user";
    const repos = [
      { id: 1, name: "repo1", stargazers_count: 10, language: "JavaScript" },
      { id: 2, name: "repo2", stargazers_count: 50, language: "Python" },
      { id: 3, name: "repo3", stargazers_count: 30, language: "JavaScript" },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: username }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => repos,
      });

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.filteredRepos).toBeDefined();
    });

    act(() => {
      result.current.handleSortChange("stars");
    });

    expect(result.current.filteredRepos).toEqual([
      repos[1], // repo2 (50 stars)
      repos[2], // repo3 (30 stars)
      repos[0], // repo1 (10 stars)
    ]);
  });

  it("should sort repositories by updated date", async () => {
    const username = "test-user";
    const repos = [
      {
        id: 1,
        name: "repo1",
        updated_at: "2023-01-01T00:00:00Z",
        language: "JavaScript",
      },
      {
        id: 2,
        name: "repo2",
        updated_at: "2023-03-01T00:00:00Z",
        language: "Python",
      },
      {
        id: 3,
        name: "repo3",
        updated_at: "2023-02-01T00:00:00Z",
        language: "JavaScript",
      },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: username }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => repos,
      });

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.filteredRepos).toBeDefined();
    });

    act(() => {
      result.current.handleSortChange("updated");
    });

    expect(result.current.filteredRepos).toEqual([
      repos[1], // repo2 (most recently updated)
      repos[2], // repo3
      repos[0], // repo1 (least recently updated)
    ]);
  });

  it("should filter repositories by language", async () => {
    const username = "test-user";
    const repos = [
      { id: 1, name: "repo1", language: "JavaScript" },
      { id: 2, name: "repo2", language: "Python" },
      { id: 3, name: "repo3", language: "JavaScript" },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: username }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => repos,
      });

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.filteredRepos).toBeDefined();
    });

    act(() => {
      result.current.handleLanguageFilter("JavaScript");
    });

    expect(result.current.filteredRepos).toEqual([
      repos[0], // repo1
      repos[2], // repo3
    ]);
  });

  it("should reset filter when language is set to 'all'", async () => {
    const username = "test-user";
    const repos = [
      { id: 1, name: "repo1", language: "JavaScript" },
      { id: 2, name: "repo2", language: "Python" },
      { id: 3, name: "repo3", language: "JavaScript" },
    ];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: username }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => repos,
      });

    const { result } = renderHook(() => useGitHubData());

    await act(async () => {
      result.current.fetchGitHubData(username);
    });

    await waitFor(() => {
      expect(result.current.filteredRepos).toBeDefined();
    });

    act(() => {
      result.current.handleLanguageFilter("JavaScript");
    });

    expect(result.current.filteredRepos).toEqual([
      repos[0], // repo1
      repos[2], // repo3
    ]);

    act(() => {
      result.current.handleLanguageFilter("all");
    });

    expect(result.current.filteredRepos).toEqual(repos);
  });
});
