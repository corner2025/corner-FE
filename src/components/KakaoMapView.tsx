import React from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

type Props = {
  center: { lat: number; lng: number } | null;
  myLocation: { lat: number; lng: number } | null;
  shops?: { lat: number; lng: number; name: string }[];
  level?: number;
};

const KakaoMapView: React.FC<Props> = ({
  center,
  myLocation,
  shops,
  level,
}) => {
  // 카카오맵 스크립트 로더
  useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ["services", "clusterer"],
  });

  // myLocation이 없으면 로딩 UI
  if (!myLocation) {
    return (
      <div className="w-full h-80 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 text-xl font-bold">
        내 위치 정보를 불러오는 중...
      </div>
    );
  }

  // center가 없으면 내 위치로 fallback
  const mapCenter = center || myLocation;

  return (
    <Map
      center={mapCenter}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "1rem",
      }}
      level={level ?? 4}
      draggable={true}
    >
      {/* 면세점 마커  */}
      {shops &&
        shops.map((shop, idx) => (
          <MapMarker
            key={`shop-${idx}`}
            position={{ lat: shop.lat, lng: shop.lng }}
            image={{
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              size: { width: 32, height: 32 },
            }}
          ></MapMarker>
        ))}

      {/* 내 위치 마커 */}
      <MapMarker
        position={myLocation}
        image={{
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          size: { width: 24, height: 35 },
        }}
      ></MapMarker>
    </Map>
  );
};

export default KakaoMapView;
