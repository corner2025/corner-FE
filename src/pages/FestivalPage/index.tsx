import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";
import type { Festival } from "../../types/festival";
import CardItem from "./sections/CardItem";

const PAGE_SIZE = 10;

const FestivalPage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const { t } = useTranslation();
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchFestivals = async (currentPage: number, isReset = false) => {
    if (loading) return;

    setLoading(true);
    try {

      console.log("fetchFestivals params:", {
        page: currentPage,
        pageSize: PAGE_SIZE,
        area: areaFilter,
        keyword,
        startDate: startDateFilter,
        endDate: endDateFilter,
      });
      const params = {
        pageNo: currentPage,
        pageSize: PAGE_SIZE,
        ...(areaFilter && { location: areaFilter }),
        ...(keyword && { title: keyword }),
        ...(startDateFilter && { startDate: startDateFilter }),
        ...(endDateFilter && { endDate: endDateFilter }),
      };

      const res = await axiosInstance.get("festivals", { params });
      const fetched = res.data;

      if (isReset) {
        setFestivals(fetched);
      } else {
        setFestivals((prev) => [...prev, ...fetched]);
      }

      setHasMore(fetched.length === PAGE_SIZE);
      setError("");
    } catch (err) {
      setError("축제 데이터를 불러오는 데 실패했습니다.");
      console.error(err);
    }
    setLoading(false);
  };

  // 필터 변경 시 초기화
  useEffect(() => {
    setPage(1);
    setFestivals([]);
    setHasMore(true);
    fetchFestivals(1, true);
  }, [areaFilter, keyword, startDateFilter, endDateFilter]);

  // 페이지 변경 시 추가 fetch
  useEffect(() => {
    if (page === 1) return;
    fetchFestivals(page);
  }, [page]);

  // IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
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
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center mb-10 tracking-tight animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow">
        {t("festival.title")}
      </h1>

      <div className="grid grid-cols-2 md:flex flex-wrap gap-4 mb-10">
        <Select areaFilter={areaFilter} setAreaFilter={setAreaFilter} />
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        <DateInput dateFilter={startDateFilter} setDateFilter={setStartDateFilter} />
        <DateInput dateFilter={endDateFilter} setDateFilter={setEndDateFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {festivals.length === 0 && !loading ? (
          <p className="col-span-full text-center text-xl text-gray-500 mt-10">
            {error || t("festival.error")}
          </p>
        ) : (
          festivals.map((festival, idx) => {
            if (idx === festivals.length - 1) {
              return (
                <div key={festival.id} ref={lastItemRef}>
                  <CardItem festival={festival} />
                </div>
              );
            }
            return <CardItem festival={festival} key={festival.id} />;
          })
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-600">로딩 중...</p>
      )}
    </div>
  );
};

export default FestivalPage;
