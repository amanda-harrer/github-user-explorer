import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and button elements", () => {
    render(<SearchBar onSearch={mockOnSearch} darkMode={false} />);
    expect(
      screen.getByPlaceholderText("Enter GitHub username..."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("calls onSearch with trimmed username on form submit", () => {
    render(<SearchBar onSearch={mockOnSearch} darkMode={false} />);
    const input = screen.getByPlaceholderText("Enter GitHub username...");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "  testuser  " } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith("testuser");
  });

  test("does not call onSearch if input is empty", () => {
    render(<SearchBar onSearch={mockOnSearch} darkMode={false} />);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
