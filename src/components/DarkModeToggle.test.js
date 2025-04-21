import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";

describe("DarkModeToggle Component", () => {
  let setDarkModeMock;

  beforeEach(() => {
    setDarkModeMock = jest.fn();
  });

  test("renders correctly with Light Mode label when darkMode is false", () => {
    render(<DarkModeToggle darkMode={false} setDarkMode={setDarkModeMock} />);
    expect(screen.getByLabelText("Light Mode")).toBeInTheDocument();
    expect(screen.getByLabelText("Light Mode")).not.toBeChecked();
  });

  test("renders correctly with Dark Mode label when darkMode is true", () => {
    render(<DarkModeToggle darkMode={true} setDarkMode={setDarkModeMock} />);
    expect(screen.getByLabelText("Dark Mode")).toBeInTheDocument();
    expect(screen.getByLabelText("Dark Mode")).toBeChecked();
  });

  test("calls setDarkMode with the correct value when toggled", () => {
    render(<DarkModeToggle darkMode={false} setDarkMode={setDarkModeMock} />);
    const toggleSwitch = screen.getByLabelText("Light Mode");
    fireEvent.click(toggleSwitch);
    expect(setDarkModeMock).toHaveBeenCalledWith(true);
  });

  test("adds and removes dark mode classes on the body element", () => {
    const { rerender } = render(
      <DarkModeToggle darkMode={false} setDarkMode={setDarkModeMock} />,
    );
    expect(document.body.classList.contains("bg-dark")).toBe(false);
    expect(document.body.classList.contains("text-white")).toBe(false);

    rerender(<DarkModeToggle darkMode={true} setDarkMode={setDarkModeMock} />);
    expect(document.body.classList.contains("bg-dark")).toBe(true);
    expect(document.body.classList.contains("text-white")).toBe(true);

    rerender(<DarkModeToggle darkMode={false} setDarkMode={setDarkModeMock} />);
    expect(document.body.classList.contains("bg-dark")).toBe(false);
    expect(document.body.classList.contains("text-white")).toBe(false);
  });
});
