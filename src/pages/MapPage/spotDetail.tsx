import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";

const PAGE_SIZE = 10;

const SpotDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [spot, setSpot] = useState<any>(null);
  const [nearbySpots, setNearbySpots] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  // 상세 관광지 정보 가져오기
  useEffect(() => {
    const fetchSpotDetail = async () => {
      try {
        const res = await axiosInstance.get(`/tourist-spot/${id}`);
        setSpot(res.data);
      } catch (err) {
        console.error("상세정보 불러오기 실패:", err);
      }
    };
    if (id) fetchSpotDetail();
  }, [id]);

  // id 바뀌면 nearby 초기화
  useEffect(() => {
    setNearbySpots([]);
    setPage(1);
    setHasMore(true);
  }, [id]);

  // 페이지 단위로 nearby 관광지 불러오기
  useEffect(() => {
    if (!id || !hasMore) return;
    if (loadingRef.current) return;

    const fetchNearbySpots = async () => {
      loadingRef.current = true;
      try {
        const res = await axiosInstance.get(`/tourist-spot/${id}/nearby`, {
          params: { page, size: PAGE_SIZE },
        });
        const data = res.data || [];
        setNearbySpots((prev) => [...prev, ...data]);
        if (data.length < PAGE_SIZE) setHasMore(false);
      } catch (err) {
        console.error("근처 관광지 불러오기 실패:", err);
      } finally {
        loadingRef.current = false;
      }
    };
    fetchNearbySpots();
  }, [id, page, hasMore]);

  // 무한스크롤 감지
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 100 && hasMore && !loadingRef.current) {
      setPage((prev) => prev + 1);
    }
  };

  if (!spot) return <div className="p-4 text-center">로딩 중...</div>;

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 flex flex-col gap-8">
      {/* 상세 정보 영역 */}
      <div
        style={{
          borderRadius: "22.375px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h1 className="text-2xl font-bold mb-4">{spot.title}</h1>
        <p className="mb-2">
          <strong>주소:</strong> {spot.address}
        </p>
        <p className="mb-2">
          <strong>소개:</strong> {spot.description || "소개 정보 없음"}
        </p>
        {spot.imageUrl && (
          <img
            src={spot.imageUrl}
            alt={spot.title}
            className="w-full mt-4 rounded"
            style={{ objectFit: "cover", maxHeight: 300 }}
          />
        )}
      </div>

      {/* 근처 관광지 영역 */}
      <div
        onScroll={onScroll}
        style={{
          maxHeight: "550px",
          overflowY: "auto",
          borderRadius: "22.375px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <h2 className="text-xl font-semibold mb-4">근처 관광지</h2>
        {nearbySpots.length === 0 ? (
          <p className="p-4 text-center">근처 관광지가 없습니다.</p>
        ) : (
          <table
            className="w-full border-collapse"
            style={{ borderRadius: "22.375px", overflow: "hidden" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#D9F0FF" }}>
                <th className="p-3 text-left font-semibold">사진</th>
                <th className="p-3 text-left font-semibold">이름</th>
                <th className="p-3 text-left font-semibold">주소</th>
              </tr>
            </thead>
            <tbody>
              {nearbySpots.map((place, idx) => (
                <tr
                  key={place.id || idx}
                  className="cursor-pointer hover:bg-gray-50 transition"
                  onClick={() => (window.location.href = `/spot/${place.id}`)}
                >
                  <td className="p-3">
                    {place.firstimage ? (
                      <img
                        src={place.firstimage}
                        alt={place.title}
                        style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 80,
                          height: 60,
                          backgroundColor: "#EEF6FB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#666",
                          fontSize: 12,
                          borderRadius: 6,
                        }}
                      >
                        이미지 없음
                      </div>
                    )}
                  </td>
                  <td className="p-3">{place.title}</td>
                  <td className="p-3">{place.addr1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SpotDetail;
