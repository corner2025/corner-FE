import React, { useEffect, useState, useMemo } from "react";
import TouristCard from "./sections/TouristCard";
import { useTranslation } from "react-i18next";
import type { TouristSpot } from "../../types/tourist";
import TouristFilterBar from "./sections/TouristFilterBar";

const ETC_LABEL = "기타";

const TouristPage: React.FC = () => {
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 필터 상태
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}tourist-spot`)
      .then((res) => res.json())
      .then((data) => {
        setTouristSpots(data.content);
        setLoading(false);
      })
      .catch(() => {
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
  }, []);

  const { t } = useTranslation();

  // 관광지 데이터에서 지역명 추출 (addr1의 0번 인덱스, 없으면 "기타", 중복 제거)
  const areaOptions = useMemo(() => {
    const areas = touristSpots.map((spot) => {
      const first = spot.addr1?.split(" ")[0];
      return first ? first : ETC_LABEL;
    });
    // 중복 제거, "기타"는 항상 마지막에 정렬
    const uniqueAreas = Array.from(new Set(areas));
    // "기타"를 마지막으로 정렬
    uniqueAreas.sort((a, b) => {
      if (a === ETC_LABEL) return 1;
      if (b === ETC_LABEL) return -1;
      return a.localeCompare(b, "ko");
    });
    return uniqueAreas;
  }, [touristSpots]);

  // 필터링된 관광지 리스트
  const filteredSpots = useMemo(() => {
    return touristSpots.filter((spot) => {
      // 지역 필터
      const spotArea = spot.addr1?.split(" ")[0] || ETC_LABEL;
      if (area && spotArea !== area) return false;
      // 검색어 필터 (이름, 주소, 설명 등에서 검색)
      if (
        keyword &&
        !(
          spot.title.includes(keyword) ||
          spot.addr1?.includes(keyword) ||
          (spot.overview && spot.overview.includes(keyword))
        )
      )
        return false;
      return true;
    });
  }, [touristSpots, area, keyword]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className=" text-3xl sm:text-4xl font-extrabold text-center  text-gray-800 mb-10 tracking-tight animate-fade-in-down bg-clip-text drop-shadow">
        {t("tour.title")}
      </h1>

      {/* 검색 및 필터링 섹션 */}
      <TouristFilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        area={area}
        setArea={setArea}
        areaOptions={areaOptions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredSpots.map((spot) => (
          <TouristCard spot={spot} key={spot.id} />
        ))}
      </div>
    </div>
  );
};

export default TouristPage;
