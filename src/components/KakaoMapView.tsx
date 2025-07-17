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

  // 디버깅용 로그 출력
  console.log("KakaoMapView - myLocation:", myLocation);
  console.log("KakaoMapView - center:", center);
  console.log("KakaoMapView - mapCenter:", center || myLocation);
  console.log("KakaoMapView - shops:", shops);

  if (!myLocation) {
    return (
      <div className="w-full h-80 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-800 text-xl font-bold">
        내 위치 정보를 불러오는 중...
      </div>
    );
  }

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
      {/* 면세점 마커 */}
      {shops &&
        shops.map((shop, idx) => {
          return (
            <MapMarker
              key={`shop-${idx}`}
              position={{ lat: shop.lat, lng: shop.lng }} // lat, lng 바꿔서 넣었었는데, 백에서 똑바로 보내준다네요
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                size: { width: 32, height: 32 },
              }}
            />
          );
        })}

      {/* 내 위치 마커 */}
      <MapMarker
        position={myLocation}
        image={{
          src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          size: { width: 24, height: 35 },
        }}
      />
    </Map>
  );
};

export default KakaoMapView;
