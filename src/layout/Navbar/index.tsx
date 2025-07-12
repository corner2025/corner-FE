import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { SUGGESTIONS } from "../../data/suggestion";
import LanguageSelect from "./sections/LanguageSelect";
import MenuList from "./sections/MenuList"; // 추가
import { useTranslation } from "react-i18next";
import LogoArea from "./sections/LogoArea";
import SearchForm from "./sections/SearchForm";
import MobileMenu, { type MenuItem } from "./sections/MobileMenu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestFocus, setSuggestFocus] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const menuItems: MenuItem[] = [
    { path: "/", key: t("navbar.home") },
    { path: "/dutyfree", key: t("navbar.duty-free shop") },
    { path: "/tourist", key: t("navbar.tour") },
    { path: "/festival", key: t("navbar.festival") },
    { path: "/performance", key: t("navbar.performance") },
    { path: "/calendar", key: t("navbar.calendar") },
    { path: "/map", key: t("navbar.map") },
  ];

  const filteredSuggestions = useMemo(() => {
    if (!searchInput.trim()) return [];
    // return SUGGESTIONS.filter((s) =>
    //   s.toLowerCase().includes(searchInput.trim().toLowerCase())
    // ).slice(0, 8);
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
      <div className="container mx-auto flex items-center h-20 px-4">
        {/* 로고/브랜드 영역 */}
        <LogoArea />

        {/* 데스크탑 메뉴 */}
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuList items={menuItems} />
        </div>

        {/* 데스크탑 다국어 선택 & 검색창 버튼 */}
        <div className="hidden lg:flex items-center gap-2 ml-auto">
          <LanguageSelect
            value={i18n.language}
            onChange={(lang) => i18n.changeLanguage(lang)}
          />
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
            <span className="hidden md:inline text-base font-medium">
              {t("navbar.search")}
            </span>
          </button>
        </div>

        {/* 모바일: 언어선택 + 메뉴버튼 (항상 오른쪽) */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <LanguageSelect
            value={i18n.language}
            onChange={(lang) => {
              i18n.changeLanguage(lang);
              setIsOpen(false);
            }}
          />
          <button
            className="text-2xl p-2 rounded-lg hover:bg-blue-100 transition"
            onClick={toggleMenu}
            aria-label="모바일 메뉴"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

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

      {/* 검색창 */}
      <SearchForm
        isSearchOpen={isSearchOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        filteredSuggestions={filteredSuggestions}
        suggestFocus={suggestFocus}
        setSuggestFocus={setSuggestFocus}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isOpen}
        isSearchOpen={isSearchOpen}
        toggleMenu={toggleMenu}
        toggleSearch={toggleSearch}
        menuItems={menuItems}
        setIsOpen={setIsOpen}
      />
    </nav>
  );
};

export default NavBar;
