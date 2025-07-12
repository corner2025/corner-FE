import { Link } from "react-router-dom";

type MenuItemProps = {
  path: string;
  label: string;
  onClick: () => void;
};

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

export default MenuItem;
