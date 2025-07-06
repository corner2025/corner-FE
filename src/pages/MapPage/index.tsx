import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

const regions = [
  { name: "서울", address: "서울특별시 중구 세종대로 110" },
  { name: "경기", address: "경기도 수원시 팔달구 효원로 1" },
  { name: "인천", address: "인천광역시 남동구 정각로 29" },
  { name: "강원", address: "강원특별자치도 춘천시 중앙로 1" },
  { name: "충북", address: "충청북도 청주시 상당구 상당로 82" },
  { name: "충남", address: "충청남도 홍성군 홍북읍 충남대로 21" },
  { name: "세종", address: "세종특별자치시 한누리대로 2130" },
  { name: "대전", address: "대전광역시 서구 둔산로 100" },
  { name: "경북", address: "경상북도 안동시 풍천면 도청대로 455" },
  { name: "경남", address: "경상남도 창원시 의창구 중앙대로 300" },
  { name: "대구", address: "대구광역시 북구 연암로 40" },
  { name: "울산", address: "울산광역시 남구 중앙로 201" },
  { name: "부산", address: "부산광역시 연제구 중앙대로 1001" },
  { name: "전북", address: "전라북도 전주시 완산구 효자로 225" },
  { name: "전남", address: "전라남도 무안군 삼향읍 오룡길 1" },
  { name: "광주", address: "광주광역시 서구 내방로 111" },
  { name: "제주", address: "제주특별자치도 제주시 문연로 6" },
];

const MapPage = () => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null); // 마커 추적용
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (document.getElementById("kakao-map-script")) return;

    const script = document.createElement("script");
    script.id = "kakao-map-script";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 7,
        };
        mapRef.current = new window.kakao.maps.Map(container, options);
      });
    };
    document.head.appendChild(script);
  }, []);

  const moveToRegion = (address: string, name: string) => {
    if (!mapRef.current) return;
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapRef.current.setCenter(coords);

        // 기존 마커 제거
        if (markerRef.current) markerRef.current.setMap(null);

        // 새 마커 추가
        markerRef.current = new window.kakao.maps.Marker({
          map: mapRef.current,
          position: coords,
        });

        setSelectedRegion(name);
      } else {
        console.error("주소 검색 실패:", status);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {regions.map((region) => {
          const isSelected = selectedRegion === region.name;
          return (
            <button
              key={region.name}
              onClick={() => moveToRegion(region.address, region.name)}
              className={`px-3 py-1 rounded transition 
                ${isSelected ? "bg-[#BFDDF3]" : "bg-[#EEF6FB]"} text-black`}
            >
              {region.name}
            </button>
          );
        })}
      </div>
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default MapPage;
