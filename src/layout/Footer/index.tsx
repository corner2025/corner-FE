import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import FooterLocale from "../../Locale/Footer.json";

const Footer = () => {
  //   const t = (key) => {
  //     const keys = key.split(".");
  //     return keys.reduce((obj, k) => obj[k], FooterLocale[language]);
  //   };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className=" text-gray-300 bg-gray-800"
      style={{ backgroundColor: "#EEF6FB" }}
    >
      <div
        className="container mx-auto px-4 py-12"
        style={{ color: "#36454F" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4">방구석</h2>
            <p className="text-gray-400">
              쇼핑과 관광을 결합한 일정 추천, 이벤트 캘린더로 여행과 쇼핑 경험을
              한곳에서 강화하는 여행 서비스 플랫폼입니다.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/dutyfree"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  면세점
                </Link>
              </li>
              <li>
                <Link
                  to="/tourist"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  관광지
                </Link>
              </li>
              <li>
                <Link
                  to="/festival"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  축제/공연
                </Link>
              </li>
              <li>
                <Link
                  to="/calender"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  일정/캘린더
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  여행지도
                </Link>
              </li>
              <li>
                <Link
                  to="/chart"
                  onClick={scrollToTop}
                  className="hover:text-white transition-colors"
                >
                  면세통계
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-400">
              <li>경상남도 진주시</li>
              <li>진주대로 501</li>
              <li>010-0000-0000</li>
              <li>abc@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          style={{ color: "#36454F" }}
        >
          <p className="text-sm">
            ⓒ 2025 Corner Of The Room. All rights reserved.
            {/* <AiOutlineSmile /> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
