import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import KakaoMapView from "../components/KakaoMapView";
import { useTranslation } from "react-i18next";
import type { TouristSpot } from "../types/tourist";

const TouristDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpot = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}tourist-spot/${id}`
        );
        if (!res.ok) throw new Error("서버에서 오류가 발생했습니다.");
        const data = await res.json();
        setTouristSpots([data]);
      } catch (error) {
        setError("데이터를 불러오지 못했습니다.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpot();
  }, [id]);

  const spot = touristSpots[0];
  console.log("spot", spot);

  const { t } = useTranslation();

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-b-4 mb-6"></div>
        <div className="text-2xl text-blue-600 font-semibold tracking-wide">
          {t("loadingPage")}
        </div>
        <div className="text-sm text-gray-400 mt-2">{t("wait")}</div>
      </div>
    );
  if (error) return <div>{error}</div>;

  if (!spot) {
    return (
      <div className="container mx-auto p-8 text-center text-red-600 text-2xl mt-20">
        <p>{t("tour.detailPage.error.message")}</p>
        <button
          onClick={() => navigate("/tourist")}
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
        >
          {t("tour.detailPage.error.button")}
        </button>
      </div>
    );
  }

  const kakaoMapLink = `https://map.kakao.com/link/map/${spot.title},${spot.mapx},${spot.mapy}`;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-xl my-8 animate-fade-in mb-15">
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
        {t("tour.detailPage.toList")}
      </button>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
        {spot.title}
      </h1>

      <div className="mb-8 rounded-lg overflow-hidden shadow-xl">
        <img
          src={spot.firstimage || spot.firstimage2}
          alt="No Image Available"
          className="w-full h-64 md:h-96 object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 기본 정보 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-blue-200">
            {t("tour.detailPage.info.title")}
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.address")}
            </span>{" "}
            {spot.addr1 || spot.addr2}
            <a
              href={kakaoMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-500 hover:underline text-sm"
            >
              [{t("tour.detailPage.info.map")}]
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.area")}
            </span>{" "}
            {(spot.addr1 || spot.addr2 || "")?.split(" ")[0]}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.usetime")}
            </span>{" "}
            {spot.usetime || "상시 개방"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.parking")}
            </span>{" "}
            {spot.parking || "주차 정보가 없습니다."}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.restdate")}
            </span>{" "}
            {spot.restdate || "연중무휴"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.infocenter")}
            </span>{" "}
            {spot.infocenter || "별도의 안내 센터 정보가 없습니다."}
          </p>

          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">
              {t("tour.detailPage.info.homepage")}
            </span>{" "}
            {spot.homepage ? (
              <span
                className="text-blue-500 underline"
                dangerouslySetInnerHTML={{ __html: spot.homepage }}
              />
            ) : (
              <span className="text-gray-400">Page does not exist</span>
            )}
          </p>
        </div>

        {/* 소개 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2 border-blue-200">
            {t("tour.detailPage.intro")}
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {spot.overview || "No description available."}
          </p>
        </div>
      </div>

      {/* 관광지 위치 지도 */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
          {t("tour.detailPage.location")}
        </h2>
        <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-blue-50">
          <KakaoMapView
            myLocation={{ lat: 1, lng: 1 }}
            center={{ lat: Number(spot.mapy), lng: Number(spot.mapx) }}
            level={4}
            shops={[
              {
                lat: Number(spot.mapy),
                lng: Number(spot.mapx),
                name: spot.title,
              },
            ]}
          />
        </div>
        <div className="text-right mt-2">
          <a
            href={kakaoMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-500 hover:underline text-sm"
          >
            {t("tour.detailPage.view")}→
          </a>
        </div>
      </div>
    </div>
  );
};

export default TouristDetailPage;
