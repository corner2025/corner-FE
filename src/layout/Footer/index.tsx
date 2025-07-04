import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="text-gray-800" style={{ backgroundColor: "#EEF6FB" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 브랜드/설명 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400 bg-clip-text text-transparent select-none">
                Korea Travel Hub
              </span>
            </div>
            <p className="text-base text-gray-500 font-medium leading-relaxed mt-2">
              여행, 쇼핑, 문화, 축제, 공연까지
              <br />
              <span className="text-blue-500 font-semibold">
                한 곳에서 만나는 대한민국 여행의 모든 것!
              </span>
              <br />
              Korea Travel Hub와 함께라면,
              <br />
              여행 준비부터 즐기는 순간까지
              <br />
              스마트하고 즐거운 경험을 약속드립니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              빠른 링크
            </h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  to="/dutyfree"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  면세점
                </Link>
              </li>
              <li>
                <Link
                  to="/tourist"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  관광지
                </Link>
              </li>
              <li>
                <Link
                  to="/festival"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  축제정보
                </Link>
              </li>
              <li>
                <Link
                  to="/performance"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  공연정보
                </Link>
              </li>
              <li>
                <Link
                  to="/calender"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  일정/캘린더
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  여행지도
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-xl font-bold mb-4">고객센터</h3>
            <ul className="space-y-2 text-gray-500 text-base">
              <li>경상남도 진주시 진주대로 501</li>
              <li>
                이메일: <span className="text-blue-500">abc@gmail.com</span>
              </li>
              <li>
                문의전화: <span className="text-blue-500">010-0000-0000</span>
              </li>
              <li className="text-xs text-gray-400">
                평일 09:00 ~ 18:00 (주말/공휴일 휴무)
              </li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-xl font-bold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"
                aria-label="페이스북"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors text-2xl"
                aria-label="트위터"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors text-2xl"
                aria-label="인스타그램"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-700 transition-colors text-2xl"
                aria-label="링크드인"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="mt-6 text-xs text-gray-400">
              SNS에서{" "}
              <span className="font-semibold text-blue-500">
                #KoreaTravelHub
              </span>
              를 검색해보세요!
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            ⓒ 2025 Korea Travel Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
