// export type TouristSpot = { 기존 예시 데이터 타입 삭제
//     id: number; 
//     name: string;
//     address: string;
//     areaCode: string; // 지역 코드 (예: 서울 11, 부산 26 등)
//     category1: string; // 대분류 (예: 자연, 역사, 문화)
//     category2: string; // 중분류 (예: 해변, 박물관, 미술관)
//     category3: string; // 소분류 (예: 해운대 해수욕장, 국립중앙박물관)
//     imageUrl: string; // 이미지 URL
//     latitude: number; // 위도
//     longitude: number; // 경도
//     description: string; // 설명 (운영시간, 요금, 주변 시설 포함)
//   };

//   export type TouristSpot = {
//     id: number;
//     title: string;
//     addr1: string;
//     firstimage: string; // 이미지 URL
//     mapx: number; // 위도
//     mapy: number; // 경도
//   };
  
  export type TouristSpot = {
    id: number;
    title: string; // 관광지 이름
    addr1: string; // 그냥 주소
    addr2: string;
    firstimage: string; //사진
    firstimage2: string; // 대체 사진진
    overview: string; // 장소 설명명
    mapx: string; // 위도
    mapy: string; // 경도
    homepage: string; // 그냥 url 경로로
    areaName: string;
    cat2Name: string;
    cat3Name: string,
    usetime?: string;
    parking?: string;
    infocenter?: string;
    restdate?: string;
  }

  export const areaCodes = [
    { code: 'all', name: "전체 지역"},
    { code: '11', name: '서울특별시' },
    { code: '26', name: '부산광역시' },
    { code: '27', name: '대구광역시' },
    { code: '28', name: '인천광역시' },
    { code: '29', name: '광주광역시' },
    { code: '30', name: '대전광역시' },
    { code: '31', name: '울산광역시' },
    { code: '36', name: '세종특별자치시' },
    { code: '41', name: '경기도' },
    { code: '42', name: '강원특별자치도' },
    { code: '43', name: '충청북도' },
    { code: '44', name: '충청남도' },
    { code: '45', name: '전라북도' },
    { code: '46', name: '전라남도' },
    { code: '47', name: '경상북도' },
    { code: '48', name: '경상남도' },
    { code: '50', name: '제주특별자치도' },
  ];