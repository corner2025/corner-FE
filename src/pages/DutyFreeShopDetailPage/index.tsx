import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import KakaoMapView from "../../components/KakaoMapView"; // KakaoMapView를 import하세요

const DutyFreeShopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shop = dutyFreeShops.find((s) => String(s.id) === String(id));
  const navigate = useNavigate();

  if (!shop) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center text-gray-400">
        <div className="text-3xl mb-4">😥</div>
        <div>해당 면세점 정보를 찾을 수 없습니다.</div>
        <button
          className="mt-8 px-6 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10 items-start">
      {/* 왼쪽: 면세점 정보 */}
      <div className="w-full md:w-2/5 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-gray-100">
        <h1 className="text-2xl font-extrabold text-blue-700 mb-2">
          {shop.name}
        </h1>
        <div className="flex flex-col gap-3 text-base">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">주소</span>
            <span className="text-gray-800">{shop.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">전화</span>
            <span className="text-gray-800">{shop.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">영업시간</span>
            <span className="text-gray-800">{shop.opening_hours}</span>
          </div>
          {shop.latitude && shop.longitude && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">지도</span>
              <a
                href={`https://map.kakao.com/link/map/${encodeURIComponent(
                  shop.name
                )},${shop.latitude},${shop.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                카카오맵 길찾기
              </a>
            </div>
          )}
        </div>
        <button
          className="mt-8 px-6 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          onClick={() => navigate(-1)}
        >
          목록으로 돌아가기
        </button>
      </div>

      {/* 오른쪽: 카카오맵 - KakaoMapView로 교체 */}
      <div className="w-full md:w-3/5 flex justify-center items-center">
        {shop.latitude && shop.longitude ? (
          <div className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
            <KakaoMapView
              myLocation={{ lat: 1, lng: 1 }}
              center={{ lat: shop.latitude, lng: shop.longitude }}
              level={4}
              shops={[
                {
                  lat: shop.latitude,
                  lng: shop.longitude,
                  name: shop.name,
                },
              ]}
            />
          </div>
        ) : (
          <div className="w-full aspect-square max-w-[420px] flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400 text-lg">
            위치 정보 없음
          </div>
        )}
      </div>
    </div>
  );
};

export default DutyFreeShopDetailPage;
