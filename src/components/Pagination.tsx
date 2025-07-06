import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageRange: number[];
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageRange,
  onPageChange,
}) => {
  const showFirstEllipsis = pageRange[0] > 1;
  const showLastEllipsis = pageRange[pageRange.length - 1] < totalPages;

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 mb-5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full shadow-md hover:from-teal-500 hover:to-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105"
        aria-label="이전 페이지"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      {showFirstEllipsis && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm transition duration-300 ease-in-out transform hover:scale-110"
          >
            1
          </button>
          <span className="text-gray-500 font-bold text-xs sm:text-base">
            ...
          </span>
        </>
      )}

      {pageRange.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`
            w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full
            text-xs sm:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-110 mx-0.5
            ${
              currentPage === pageNumber
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
            }
          `}
        >
          {pageNumber}
        </button>
      ))}

      {showLastEllipsis && (
        <>
          <span className="text-gray-500 font-bold text-xs sm:text-base">
            ...
          </span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm transition duration-300 ease-in-out transform hover:scale-110"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full shadow-md hover:from-blue-600 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed transition duration-300 ease-in-out transform hover:scale-105"
        aria-label="다음 페이지"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
