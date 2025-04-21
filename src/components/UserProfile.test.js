import React from "react";
import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile Component", () => {
  const mockUser = {
    avatar_url: "https://example.com/avatar.jpg",
    name: "John Doe",
    login: "johndoe",
    created_at: "2020-01-01T00:00:00Z",
    bio: "Software Developer",
    location: "San Francisco",
    blog: "https://johndoe.dev",
    public_repos: 42,
    followers: 100,
    following: 50,
  };

  it("renders null when no user is provided", () => {
    const { container } = render(<UserProfile user={null} darkMode={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders user information correctly", () => {
    render(<UserProfile user={mockUser} darkMode={false} />);

    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      mockUser.avatar_url,
    );
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByText("Joined Jan 1, 2020")).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
    expect(screen.getByText(mockUser.location)).toBeInTheDocument();
    expect(screen.getByText(mockUser.blog)).toHaveAttribute(
      "href",
      mockUser.blog,
    );
    expect(screen.getByText("Public Repos")).toBeInTheDocument();
    expect(
      screen.getByText(mockUser.public_repos.toString()),
    ).toBeInTheDocument();
    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText(mockUser.followers.toString())).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByText(mockUser.following.toString())).toBeInTheDocument();
  });

  it("renders fallback text when user fields are missing", () => {
    const incompleteUser = {
      avatar_url: "",
      name: "",
      login: "johndoe",
      created_at: null,
      bio: "",
      location: "",
      blog: "",
      public_repos: 0,
      followers: 0,
      following: 0,
    };

    render(<UserProfile user={incompleteUser} darkMode={false} />);

    expect(screen.getByText("No name provided")).toBeInTheDocument();
    expect(screen.getByText(/Date not available/i)).toBeInTheDocument();
    expect(screen.getByText("No bio available")).toBeInTheDocument();
    expect(screen.getByText("Location not provided")).toBeInTheDocument();
    expect(screen.getByText("No blog available")).toBeInTheDocument();
  });
});
