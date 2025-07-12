import React from "react";
import { HiX } from "react-icons/hi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MenuItem from "./MenuItems";

export interface MenuItem {
  path: string;
  key: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  isSearchOpen: boolean;
  toggleMenu: () => void;
  toggleSearch: () => void;
  menuItems: MenuItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isSearchOpen,
  toggleMenu,
  toggleSearch,
  menuItems,
  setIsOpen,
}) => (
  <div
    className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } lg:hidden`}
    style={{ backgroundColor: "#D9F0FF", color: "#36454F" }}
  >
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <button className="text-2xl" onClick={toggleSearch} aria-label="검색">
          {isSearchOpen ? <HiX size={24} /> : <FaMagnifyingGlass size="20" />}
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
);

export default MobileMenu;
