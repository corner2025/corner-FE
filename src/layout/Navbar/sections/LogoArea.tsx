import { Link } from "react-router-dom";
import { PiAirplaneTakeoffBold } from "react-icons/pi";

const LogoArea = () => (
  <div className="relative flex items-center flex-shrink-0">
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
);

export default LogoArea;
