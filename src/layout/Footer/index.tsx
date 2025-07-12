import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="text-gray-800" style={{ backgroundColor: "#EEF6FB" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 ">
          {/* 브랜드/설명 */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-yellow-400 bg-clip-text text-transparent select-none">
                {t("footer.website.title")}
              </span>
            </div>
            <p className="text-base text-gray-500 font-medium leading-relaxed mt-2">
              {t("footer.website.description.1")}
              <br />
              <span className="text-blue-500 font-semibold">
                {t("footer.website.description.2")}
              </span>
              <br />
              {t("footer.website.description.3")}
              <br />
              {t("footer.website.description.4")}
              <br />
              {t("footer.website.description.5")}
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {t("footer.quickLinks.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/dutyfree"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.duty-free shop")}
                </Link>
              </li>
              <li>
                <Link
                  to="/tourist"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.tour")}
                </Link>
              </li>
              <li>
                <Link
                  to="/festival"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.festival")}
                </Link>
              </li>
              <li>
                <Link
                  to="/performance"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.performance")}
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.calendar")}
                </Link>
              </li>
              <li>
                <Link
                  to="/map"
                  onClick={scrollToTop}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t("footer.quickLinks.map")}
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.contact.title")}
            </h3>
            <ul className="space-y-2 text-gray-500 text-base">
              <li>{t("footer.contact.address")}</li>
              <li>
                {t("footer.contact.phone")}
                <span className="text-blue-500">02-1234-5678</span>
              </li>
              <li>
                {t("footer.contact.email")}
                <span className="text-blue-500">info@example.com</span>
              </li>
              <li className="text-xs text-gray-400">
                {t("footer.contact.workingHours")}
              </li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {t("footer.social.title")}
            </h3>
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
              {t("footer.social.description.1")}
              <span className="font-semibold text-blue-500">
                #KoreaTravelHub
              </span>
              {t("footer.social.description.2")}
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
