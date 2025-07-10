import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

declare global {
  interface Window {
    kakao: any;
  }
}

const kakaoApiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

const MapPage = () => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const markerRef = useRef<any>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const loadTouristSpots = async (map: any) => {
    try {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const center = map.getCenter();
      const mapx = center.getLng();
      const mapy = center.getLat();

      console.log("현재 지도 중심 좌표:", { mapx, mapy });

      const res = await axiosInstance.get(
        `/tourist-spot/nearby?mapx=${mapx}&mapy=${mapy}&radius=3`
      );

      const spots = res.data || [];
      console.log("관광지 리스트:", spots);

      spots.forEach((place: any) => {
        if (!place.mapx || !place.mapy) return;

        const lat = parseFloat(place.mapy);
        const lng = parseFloat(place.mapx);

        if (isNaN(lat) || isNaN(lng)) return;

        const coords = new window.kakao.maps.LatLng(lat, lng);

        let markerOptions: any = {
          map,
          position: coords,
        };

        if (place.firstimage && place.firstimage.trim() !== "") {
          markerOptions.image = new window.kakao.maps.MarkerImage(
            place.firstimage,
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 40) }
          );
        }

        const marker = new window.kakao.maps.Marker(markerOptions);

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:14px;">${place.title}</div>`,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          infowindow.open(map, marker);
        });
        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          infowindow.close();
        });

        window.kakao.maps.event.addListener(marker, "click", () => {
          navigate(`/spot/${place.id}`);
        });

        markersRef.current.push(marker);
      });
    } catch (err) {
      console.error("API 호출 실패", err);
    }
  };

  const debouncedLoad = useRef(
    _.debounce((map) => loadTouristSpots(map), 500)
  ).current;

  useEffect(() => {
    const initializeMap = () => {
      const container = document.getElementById("map");
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 7,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      loadTouristSpots(map);

      window.kakao.maps.event.addListener(map, "idle", () => {
        debouncedLoad(map);
      });
    };

    if (window.kakao && window.kakao.maps) {
      // 스크립트 이미 로드됨
      window.kakao.maps.load(() => {
        initializeMap();
      });
    } else if (!document.getElementById("kakao-map-script")) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
      document.head.appendChild(script);
    }
    // else: 스크립트 로드 중이라면 onload 이벤트가 실행될 것임
  }, []);





  const moveToRegion = (address: string, name: string) => {
    if (!mapRef.current) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        mapRef.current.setCenter(coords);

        // 마커 제거 코드 삭제
        setSelectedRegion(name);
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center mb-4 tracking-tight animate-fade-in-down bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-yellow-500 drop-shadow">
        관광지를 지도로 한눈에!
      </h1>
      <div className="w-full max-w-2xl mx-auto px-4 py-4 flex flex-col gap-8">

        <div className="mb-2 flex flex-col gap-1 items-center"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            borderRadius: "22.375px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            padding: "20px",
        }}>

          <div className="flex gap-2 flex-wrap justify-center">
            {regions.slice(0, 9).map((region) => {
              const isSelected = selectedRegion === region.name;
              return (
                <button
                  key={region.name}
                  onClick={() => moveToRegion(region.address, region.name)}
                  className={`px-3 py-1 rounded transition ${
                    isSelected ? "bg-[#BFDDF3]" : "bg-[#EEF6FB]"
                  } text-black`}
                >
                  {region.name}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {regions.slice(9).map((region) => {
              const isSelected = selectedRegion === region.name;
              return (
                <button
                  key={region.name}
                  onClick={() => moveToRegion(region.address, region.name)}
                  className={`px-3 py-1 rounded transition ${
                    isSelected ? "bg-[#BFDDF3]" : "bg-[#EEF6FB]"
                  } text-black`}
                >
                  {region.name}
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
      <div id="map" style={{ width: "100%", height: "550px", borderRadius: "22.375px"}} />
    </div>
  );
};

export default MapPage;
