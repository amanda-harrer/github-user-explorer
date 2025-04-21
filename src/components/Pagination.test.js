import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const handlePageChangeMock = jest.fn();

  it("renders correctly", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePageChange={handlePageChangeMock}
        darkMode={false}
      />,
    );

    expect(screen.getByText("Page 1 of 5")).toBeInTheDocument();
  });

  it("calls handlePageChange when next button is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePageChange={handlePageChangeMock}
        darkMode={false}
      />,
    );

    fireEvent.click(screen.getByLabelText("Next"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
  });

  it("calls handlePageChange when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        handlePageChange={handlePageChangeMock}
        darkMode={false}
      />,
    );

    fireEvent.click(screen.getByLabelText("Previous"));
    expect(handlePageChangeMock).toHaveBeenCalledWith(1);
  });

  it("hides next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        handlePageChange={handlePageChangeMock}
        darkMode={false}
      />,
    );

    expect(screen.getByLabelText("Next")).toHaveStyle("visibility: hidden");
  });

  it("hides previous button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        handlePageChange={handlePageChangeMock}
        darkMode={false}
      />,
    );

    expect(screen.getByLabelText("Previous")).toHaveStyle("visibility: hidden");
  });
});
