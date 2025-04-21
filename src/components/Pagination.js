import React from "react";

function Pagination({ currentPage, totalPages, handlePageChange, darkMode }) {
  return (
    <nav
      className={`d-flex justify-content-center mt-4 ${darkMode ? "bg-dark" : ""}`}
    >
      <ul className="pagination">
        <li className="page-item">
          <button
            className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{ visibility: currentPage > 1 ? "visible" : "hidden" }}
            aria-label="Previous"
          >
            &lt;
          </button>
        </li>

        <li className="page-item disabled">
          <span
            className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
          >
            Page {currentPage} of {totalPages}
          </span>
        </li>

        <li className="page-item">
          <button
            className={`page-link ${darkMode ? "bg-dark text-white border-secondary" : ""}`}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              visibility: currentPage < totalPages ? "visible" : "hidden",
            }}
            aria-label="Next"
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
