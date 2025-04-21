import React from "react";
import { render, screen } from "@testing-library/react";
import RepoList from "./RepoList";

describe("RepoList Component", () => {
  test("renders 'No repositories found.' when repos is empty", () => {
    render(<RepoList repos={[]} darkMode={false} />);
    expect(screen.getByText("No repositories found.")).toBeInTheDocument();
  });

  test("renders a list of repositories", () => {
    const mockRepos = [
      {
        id: 1,
        name: "Repo 1",
        html_url: "https://github.com/user/repo1",
        stargazers_count: 10,
        description: "Description for Repo 1",
      },
      {
        id: 2,
        name: "Repo 2",
        html_url: "https://github.com/user/repo2",
        stargazers_count: 20,
        description: "Description for Repo 2",
      },
    ];

    render(<RepoList repos={mockRepos} darkMode={false} />);

    expect(screen.getByText("Repositories")).toBeInTheDocument();
    expect(screen.getByText("Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
    expect(screen.getByText("Description for Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Description for Repo 2")).toBeInTheDocument();
    expect(screen.getByText("10 ⭐")).toBeInTheDocument();
    expect(screen.getByText("20 ⭐")).toBeInTheDocument();
  });
});
