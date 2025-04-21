import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./Filters";

describe("Filters Component", () => {
  const mockOnSortChange = jest.fn();
  const mockOnLanguageChange = jest.fn();
  const languages = ["JavaScript", "Python", "Java"];

  const renderComponent = (props = {}) => {
    return render(
      <Filters
        sortOption="name"
        onSortChange={mockOnSortChange}
        languageFilter="all"
        languages={languages}
        onLanguageChange={mockOnLanguageChange}
        darkMode={false}
        {...props}
      />,
    );
  };

  it("renders sort options correctly", () => {
    renderComponent();
    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Stars/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Updated/i)).toBeInTheDocument();
  });

  it("calls onSortChange when sort option is changed", () => {
    renderComponent();
    const select = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(select, { target: { value: "stars" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("stars");
  });

  it("renders language options correctly", () => {
    renderComponent();
    expect(screen.getByLabelText(/Language:/i)).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    languages.forEach((language) => {
      expect(screen.getByText(language)).toBeInTheDocument();
    });
  });

  it("calls onLanguageChange when language is changed", () => {
    renderComponent();
    const select = screen.getByLabelText(/Language:/i);
    fireEvent.change(select, { target: { value: "Python" } });
    expect(mockOnLanguageChange).toHaveBeenCalledWith("Python");
  });
});
