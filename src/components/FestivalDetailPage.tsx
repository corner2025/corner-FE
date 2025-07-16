import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import KakaoMapView from "../components/KakaoMapView";
import type { Festival } from "../types/festival";
import axiosInstance from "../utils/axios";
import { formatDate } from "../utils/dateUtil";

const FestivalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [festival, setFestival] = useState<Festival | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFestival = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`festivals/${id}`);
        setFestival(res.data);
        console.log("축제 데이터:", res.data);
      } catch (e) {
        setError("축제 데이터를 불러오는 데 실패했습니다.");
        setFestival(null);
        console.error(e);
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    fetchFestival();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <p className="text-xl font-semibold">{t("loadingPage")}</p>
      </div>
    );

  if (error || !festival)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-gray-700">
        <h2 className="text-3xl font-bold mb-4">{t("festival.detailPage.error.message.1")}</h2>
        <p className="text-lg mb-8">{t("festival.detailPage.error.message.2")}</p>
        <button
          onClick={() => navigate("/festivals")}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          {t("festival.detailPage.error.link")}
        </button>
      </div>
    );

  const kakaoMapLink = `https://map.kakao.com/link/map/${festival.title},${festival.mapY},${festival.mapX}`;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-[22.375px] my-8 animate-fade-in mb-15" 
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        {t("festival.detailPage.button")}
      </button>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
        {festival.title}
      </h1>

      <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
        <img
          src={festival.firstImage || festival.firstImage2 || "https://via.placeholder.com/400x600?text=No+Image"}
          alt={festival.title}
          className="w-full h-64 md:h-96 object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x600?text=Image+Load+Failed";
            e.currentTarget.alt = "이미지 로드 실패";
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg text-gray-700 mb-6 border-b pb-4">
            <span className="font-semibold text-red-600">{t("festival.detailPage.period")}</span>{" "}
            {formatDate(festival.eventStartDate)} ~ {formatDate(festival.eventEndDate)}
          </p>

          <div className="space-y-2">
            <div className="flex items-start text-gray-700">
              <svg
                className="w-5 h-5 mr-3 text-blue-500 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <p className="text-gray-700 leading-relaxed text-base">
                <span className="font-semibold mr-1">{t("festival.detailPage.location")}</span>
                {festival.addr1}<br />{festival.addr2}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h12v2H3v-2z" />
              </svg>
              <span className="font-semibold">{t("festival.detailPage.tel")}</span>
              &nbsp;{festival.tel || t("festival.detailPage.noTel")}
            </div>
          </div>
        </div>

        <div>

        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
          {t("festival.detailPage.location")}
        </h2>
        <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-blue-50">
          <KakaoMapView
            center={{ lat: Number(festival.mapY), lng: Number(festival.mapX) }}
            level={4}
            shops={[{ lat: Number(festival.mapY), lng: Number(festival.mapX), name: festival.title }]}
            myLocation={{ lat: 0, lng: 0 }}
          />
        </div>
        <div className="text-right mt-2">
          <a
            href={kakaoMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline text-sm"
          >
            {t("festival.detailPage.viewOnMap")} →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetailPage;
