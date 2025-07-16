import React, { useState, useEffect, useRef, useCallback } from "react";
import Select from "./sections/Select";
import SearchInput from "./sections/SearchInput";
import DateInput from "./sections/DateInput";
import CardItem from "./sections/CardItem";
import type { Performance } from "../../types/performance";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";

const PAGE_SIZE = 10;

const PerformancePage: React.FC = () => {
  const [areaFilter, setAreaFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const { t } = useTranslation();
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPerformances = async (currentPage: number, isReset = false) => {
    if (loading) return;

    console.log("fetchPerformances params:", {
      page: currentPage,
      size: PAGE_SIZE,
      area: areaFilter,
      keyword,
      startDate: startDateFilter,
      endDate: endDateFilter,
    });

    setLoading(true);
    try {
      const params: any = {
        page: currentPage,
        size: PAGE_SIZE,
        ...(areaFilter && { area: areaFilter }),
        ...(keyword && { keyword }),
        ...(startDateFilter && { startDate: startDateFilter }),
        ...(endDateFilter && { endDate: endDateFilter }),
      };

      const res = await axiosInstance.get("performances", { params });
      const fetched = res.data.content;

      if (isReset) {
        setPerformances(fetched);
      } else {
        setPerformances((prev) => [...prev, ...fetched]);
      }

      setHasMore(fetched.length === PAGE_SIZE);
      setError("");
    } catch (err) {
      setError("데이터를 불러오는 데 실패했습니다.");
      setHasMore(false);
      console.error(err);
    }
    setLoading(false);
  };

  // 필터 변경 시 초기화 + 초기 데이터
  useEffect(() => {
    setPage(1);
    setPerformances([]);
    setHasMore(true);
    fetchPerformances(1, true);
  }, [areaFilter, keyword, startDateFilter, endDateFilter]);

  // 페이지 변경 시 추가 데이터
  useEffect(() => {
    if (page === 1) return;
    fetchPerformances(page);
  }, [page]);

  // 무한 스크롤 옵저버
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPerformanceRef = useCallback(
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
        {t("performance.title")}
      </h1>

      <div className="grid grid-cols-2 md:flex flex-wrap gap-4 mb-10">
        <Select areaFilter={areaFilter} setAreaFilter={setAreaFilter} />
        <SearchInput keyword={keyword} setKeyword={setKeyword} />
        <DateInput dateFilter={startDateFilter} setDateFilter={setStartDateFilter} />
        <DateInput dateFilter={endDateFilter} setDateFilter={setEndDateFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {performances.length === 0 && !loading ? (
          <p className="col-span-full text-center text-xl text-gray-500 mt-10">
            {error || t("performance.error")}
          </p>
        ) : (
          performances.map((performance, idx) => {
            if (idx === performances.length - 1) {
              return (
                <div key={performance.id} ref={lastPerformanceRef}>
                  <CardItem performance={performance} />
                </div>
              );
            }
            return <CardItem performance={performance} key={performance.id} />;
          })
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-600">로딩 중...</p>
      )}
    </div>
  );
};

export default PerformancePage;
