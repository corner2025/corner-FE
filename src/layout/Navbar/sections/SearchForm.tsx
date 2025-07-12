import React from "react";
import { useTranslation } from "react-i18next";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchFormProps {
  isSearchOpen: boolean;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (
    e?: React.FormEvent | React.MouseEvent,
    keyword?: string
  ) => void;
  filteredSuggestions: string[];
  suggestFocus: boolean;
  setSuggestFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
  isSearchOpen,
  searchInput,
  setSearchInput,
  handleSearch,
  filteredSuggestions,
  suggestFocus,
  setSuggestFocus,
  setIsSearchOpen,
}) => {
  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSearch}
      className={`fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 bg-white shadow-md ${
        isSearchOpen ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        minHeight: filteredSuggestions.length > 0 ? 700 : 125,
      }}
    >
      <div className="flex flex-col items-center max-w-md mx-auto w-full pt-8">
        <div className="flex items-center sm:w-full bg-white rounded-lg shadow-md">
          <input
            type="text"
            placeholder={t("navbar.searchPlaceholder")}
            className="w-full px-8 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            style={{ color: "#36454F" }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setSuggestFocus(true)}
            onBlur={() => setTimeout(() => setSuggestFocus(false), 100)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsSearchOpen(false);
              if (e.key === "Enter") handleSearch(e);
            }}
            autoFocus
            aria-label="검색어 입력"
          />
          <button
            type="submit"
            className="ml-2 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            aria-label="검색"
          >
            <FaMagnifyingGlass size={24} />
          </button>
        </div>
        {/* 연관 검색어 */}
        {filteredSuggestions.length > 0 && (searchInput || suggestFocus) && (
          <div className="w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100">
            <ul className="divide-y divide-gray-100">
              {filteredSuggestions.map((suggest) => (
                <li
                  key={suggest}
                  className="px-6 py-3 cursor-pointer hover:bg-blue-50 transition flex items-center"
                  onMouseDown={() => handleSearch(undefined, suggest)}
                >
                  <FaMagnifyingGlass className="mr-2 text-blue-400" />
                  <span className="text-gray-700">{suggest}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchForm;
