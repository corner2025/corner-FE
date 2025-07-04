import React from "react";

interface SearchInputProps {
  keyword: string; // 검색 키워드
  setKeyword: React.Dispatch<React.SetStateAction<string>>; // 키워드 상태 업데이트 함수
}

const SearchInput: React.FC<SearchInputProps> = ({ keyword, setKeyword }) => {
  return (
    <input
      type="text"
      className="p-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="키워드 검색"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchInput;
