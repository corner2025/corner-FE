import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";

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
  { path: "/perform", key: "공연정보" },
  { path: "/calender", key: "일정캘린더" },
  { path: "/map", key: "여행지도" },
];

const MenuItem = ({ path, label, onClick }: MenuItemProps) => (
  <li>
    <Link
      to={path}
      className="hover:text-blue-600 transition duration-300"
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

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => {
    setIsOpen(false); // 메뉴가 열려있을 때 검색창을 열면 메뉴를 닫음
    setIsSearchOpen(!isSearchOpen);
  };

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full p-7 shadow-lg z-50 h-20 flex items-center justify-between"
      style={{ backgroundColor: "#B3E5FC", color: "#36454F" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:ml-12 lg:mr-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Corner Of The Room
          </Link>
        </h1>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
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

        {/* 검색창 구현 */}
        <button
          className="hidden lg:flex items-center gap-4"
          onClick={toggleSearch}
        >
          {isSearchOpen ? (
            <HiX size={24} className="z-60" />
          ) : (
            <FaMagnifyingGlass size="20" />
          )}
        </button>

        {isSearchOpen && (
          <button
            className="fixed top-4 right-4 z-60 bg-white text-black p-2 rounded-full shadow-lg lg:hidden"
            onClick={toggleSearch}
          >
            <HiX size={24} />
          </button>
        )}

        <div
          className={`fixed top-0 left-0 w-full transform transition-transform duration-300 ease-in-out z-50 bg-white shadow-md p-4 ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between h-40 max-w-md mx-auto w-full">
            <div className="flex items-center w-full bg-white rounded-lg shadow-md">
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                className="w-full px-10 py-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                style={{ color: "#36454F" }}
              />
            </div>
            <button
              //   onSubmit={}
              className="ml-4 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <FaMagnifyingGlass size={24} />
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button className="lg:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        style={{ backgroundColor: "#D9F0FF", color: "#36454F" }}
      >
        <div className="p-4">
          <button className="text-2xl mb-8 float-left" onClick={toggleSearch}>
            {isSearchOpen ? <HiX size={24} /> : <FaMagnifyingGlass size="20" />}
          </button>
          <button className="text-2xl mb-8 float-right" onClick={toggleMenu}>
            <HiX />
          </button>
          <ul className="clear-both space-y-4 pt-8 text-lg">
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
