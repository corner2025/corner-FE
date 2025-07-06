import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { SUGGESTIONS } from "../../data/suggestion";

// 예시 연관 검색어 데이터 (실제 서비스에서는 서버/DB에서 받아올 수 있음)

type MenuItemProps = {
  path: string;
  label: string;
  onClick: () => void;
};

const menuItems = [
  { path: "/", key: "홈" },
  { path: "/dutyfree", key: "면세점" },
  { path: "/tourist", key: "관광지" },
  { path: "/festival", key: "축제정보" },
  { path: "/performance", key: "공연정보" },
  { path: "/calendar", key: "일정캘린더" },
  { path: "/map", key: "여행지도" },
];

const MenuItem = ({ path, label, onClick }: MenuItemProps) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 font-semibold tracking-wide px-2 py-1 rounded transition duration-200"
      onClick={() => {
        onClick();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {label}
    </Link>
  </li>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestFocus, setSuggestFocus] = useState(false);
  const navigate = useNavigate();

  // 연관 검색어 필터링 (입력값이 있을 때만)
  const filteredSuggestions = useMemo(() => {
    if (!searchInput.trim()) return [];
    return SUGGESTIONS.filter((s) =>
      s.toLowerCase().includes(searchInput.trim().toLowerCase())
    ).slice(0, 8);
  }, [searchInput]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => {
    setIsOpen(false);
    setIsSearchOpen(!isSearchOpen);
    setSearchInput("");
  };

  const handleSearch = (
    e?: React.FormEvent | React.MouseEvent,
    keyword?: string
  ) => {
    if (e) e.preventDefault();
    const query = (keyword ?? searchInput).trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setSearchInput("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full p-0 shadow-md z-50 h-20 flex items-center justify-between"
      style={{ backgroundColor: "#B3E5FC", color: "#36454F" }}
    >
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        {/* 로고/브랜드 영역 */}
        <div className="relative flex items-center">
          <h1 className="text-xl lg:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400 bg-clip-text text-transparent select-none">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1"
            >
              Korea <span className="hidden sm:inline">Travel</span> Hub
            </Link>
          </h1>
          <span
            className="absolute -right-4 -top-2 lg:-right-5 lg:-top-3 text-xl lg:text-2xl font-extrabold drop-shadow-sm select-none"
            style={{ color: "#36454F" }}
          >
            <PiAirplaneTakeoffBold />
          </span>
        </div>

        {/* 데스크탑 메뉴 */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg items-center">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={item.key}
                onClick={() => {}}
              />
            ))}
          </ul>
        </div>

        {/* 검색창 버튼 */}
        <button
          className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 transition"
          onClick={toggleSearch}
          aria-label="검색"
        >
          {isSearchOpen ? (
            <HiX size={24} className="z-60" />
          ) : (
            <FaMagnifyingGlass size="20" />
          )}
          <span className="hidden md:inline text-base font-medium">검색</span>
        </button>

        {/* 검색창 닫기 (모바일) */}
        {isSearchOpen && (
          <button
            className="fixed top-4 right-4 z-60 bg-white text-black p-2 rounded-full shadow-lg lg:hidden"
            onClick={toggleSearch}
            aria-label="검색 닫기"
          >
            <HiX size={15} />
          </button>
        )}
        <form
          onSubmit={handleSearch}
          className={`fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 bg-white shadow-md ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            minHeight: filteredSuggestions.length > 0 ? 700 : 125, // 검색창 높이 조정
          }}
        >
          <div className="flex flex-col items-center max-w-md mx-auto w-full pt-8">
            <div className="flex items-center sm:w-full bg-white rounded-lg shadow-md">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
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
            {filteredSuggestions.length > 0 &&
              (searchInput || suggestFocus) && (
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

        {/* 모바일 메뉴 버튼 */}
        <button
          className="lg:hidden text-2xl p-2 rounded-lg hover:bg-blue-100 transition"
          onClick={toggleMenu}
          aria-label="모바일 메뉴"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        style={{ backgroundColor: "#D9F0FF", color: "#36454F" }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <button
              className="text-2xl"
              onClick={toggleSearch}
              aria-label="검색"
            >
              {isSearchOpen ? (
                <HiX size={24} />
              ) : (
                <FaMagnifyingGlass size="20" />
              )}
            </button>
            <button
              className="text-2xl"
              onClick={toggleMenu}
              aria-label="메뉴 닫기"
            >
              <HiX />
            </button>
          </div>
          <ul className="space-y-4 pt-4 text-lg font-semibold">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={item.key}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
