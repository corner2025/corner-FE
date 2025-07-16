import React, { useEffect, useState, useRef, useCallback } from "react";
import TouristCard from "./sections/TouristCard";
import { useTranslation } from "react-i18next";
import type { TouristSpot } from "../../types/tourist";
import TouristFilterBar from "./sections/TouristFilterBar";
import axiosInstance from "../../utils/axios";

const PAGE_SIZE = 10;


const areaOptions = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주",
];

const TouristPage: React.FC = () => {
  const { t } = useTranslation();

  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("전체 지역");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNum: number, isReset = false) => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const params: any = {
        page: pageNum - 1,
        size: PAGE_SIZE,
        ...(keyword && { keyword }),
        ...(area !== "전체 지역" && { areaName: area }),
      };

      console.log("fetchData params:", params);

      const res = await axiosInstance.get("tourist-spot", { params });
      const data = res.data;

      if (isReset) {
        setTouristSpots(data.content);
      } else {
        setTouristSpots((prev) => [...prev, ...data.content]);
      }

      setHasMore(data.content.length === PAGE_SIZE);
    } catch (err) {
      setError("데이터를 불러오지 못했습니다.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setTouristSpots([]);
    setHasMore(true);
    fetchData(1, true);
  }, [keyword, area]);

  useEffect(() => {
    if (page === 1) return;
    fetchData(page, false);
  }, [page]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastSpotRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight animate-fade-in-down bg-clip-text drop-shadow">
        {t("tour.title")}
      </h1>

      <TouristFilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        area={area}
        setArea={setArea}
        areaOptions={areaOptions}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {touristSpots.map((spot, idx) => {
          if (idx === touristSpots.length - 1) {
            return (
              <div key={spot.id} ref={lastSpotRef}>
                <TouristCard spot={spot} />
              </div>
            );
          }
          return <TouristCard key={spot.id} spot={spot} />;
        })}
      </div>

      {loading && touristSpots.length > 0 && (
        <div className="flex justify-center mb-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-400 border-b-4" />
        </div>
      )}

      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mb-10">
          {t("festival.detailPage.error.message.2")}
        </p>
      )}

      {touristSpots.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">{error || t("tour.error")}</p>
      )}
    </div>
  );
};

export default TouristPage;
