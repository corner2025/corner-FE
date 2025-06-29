import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
// import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

type MenuItemProps = {
  path: string;
  label: string;
  onClick: () => void;
};

const menuItems = [
  { path: "/", key: "홈" },
  { path: "/dutyfree", key: "면세점" },
  { path: "/tourist", key: "관광지" },
  { path: "/festival", key: "축제/공연" },
  { path: "/calender", key: "일정캘린더" },
  { path: "/map", key: "여행지도" },
  { path: "/chart", key: "면세통계" },
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

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="fixed top-0 left-0 w-full p-7 shadow-lg z-50"
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

        <div className="hidden lg:flex items-center gap-4">
          <HiOutlineMagnifyingGlassCircle size="35" />
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          //   aria-label={translations[language].buttons.menu}
        >
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
          <button
            className="text-2xl mb-8 float-right"
            onClick={toggleMenu}
            // aria-label={translations[language].buttons.close}
          >
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
