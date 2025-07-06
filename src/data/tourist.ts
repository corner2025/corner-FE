import type { TouristSpot } from "../types/tourist";

export const touristSpots: TouristSpot[] = [
  {
    id: 1,
    name: '경복궁',
    address: '서울특별시 종로구 사직로 161',
    areaCode: '11',
    category1: '역사/문화',
    category2: '궁궐',
    category3: '조선시대 궁궐',
    imageUrl: 'https://www.kocis.go.kr/CONTENTS/editImage/20211021141222220_8I266MKM.jpg',
    latitude: 37.582046,
    longitude: 126.974955,
    description: `조선 왕조 제일의 법궁이자 한양의 5대 궁궐 중 하나입니다. 아름다운 건축미와 역사적 가치를 느낄 수 있습니다.
운영 시간: 09:00 ~ 17:00 (계절별 상이, 화요일 휴궁)
요금: 성인 3,000원
주변 식당: 토속촌 삼계탕, 자하손만두
주변 숙박: 포시즌스 호텔 서울, 서머셋 팰리스 서울
가는 방법: 지하철 3호선 경복궁역 5번 출구`,
  },
  {
    id: 2,
    name: '해운대 해수욕장',
    address: '부산광역시 해운대구 우동',
    areaCode: '26',
    category1: '자연',
    category2: '해변',
    category3: '도심 해수욕장',
    imageUrl: 'https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153531987_oen',
    latitude: 35.158661,
    longitude: 129.160100,
    description: `부산을 대표하는 해수욕장으로, 넓은 백사장과 아름다운 야경이 유명합니다. 여름철 피서지로 각광받습니다.
운영 시간: 24시간 (해수욕장 개장 기간은 별도)
요금: 무료
주변 식당: 해운대 소문난 암소갈비, 금수복국
주변 숙박: 파라다이스 호텔 부산, 시그니엘 부산
가는 방법: 지하철 2호선 해운대역 3, 5번 출구`,
  },
  {
    id: 3,
    name: '제주 성산일출봉',
    address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
    areaCode: '50',
    category1: '자연',
    category2: '오름/봉우리',
    category3: '유네스코 세계유산',
    imageUrl: 'https://img3.yna.co.kr/photo/yna/YH/2022/11/29/PYH2022112907350000500_P4.jpg',
    latitude: 33.458641,
    longitude: 126.942784,
    description: `제주도의 대표적인 자연경관이자 유네스코 세계자연유산입니다. 장엄한 일출을 감상할 수 있습니다.
운영 시간: 07:00 ~ 19:00 (동절기 07:30 ~ 17:30)
요금: 성인 5,000원
주변 식당: 성산포뚝배기, 청진동뚝배기
주변 숙박: 성산플레이스, 코업시티호텔 성산
가는 방법: 제주시외버스터미널에서 동회선 일주버스 이용, 성산일출봉 입구 하차`,
  },
  {
    id: 4,
    name: '전주 한옥마을',
    address: '전라북도 전주시 완산구 기린대로 99',
    areaCode: '45',
    category1: '역사/문화',
    category2: '마을',
    category3: '전통 한옥',
    imageUrl: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cee49908-2707-4835-bbcb-cdcba5edf2be',
    latitude: 35.814421,
    longitude: 127.149179,
    description: `전통 한옥 800여 채가 군락을 이루고 있는 곳으로, 한국의 멋과 정취를 느낄 수 있는 대표적인 관광지입니다.
운영 시간: 상시 (각 상점 및 시설별 상이)
요금: 무료 (일부 체험 및 시설 유료)
주변 식당: 한국집, 베테랑 칼국수
주변 숙박: 라한호텔 전주, 전주한옥마을 게스트하우스
가는 방법: 전주역에서 택시 또는 버스 이용`,
  },
  {
    id: 5,
    name: '남이섬',
    address: '강원특별자치도 춘천시 남이섬길 1',
    areaCode: '42',
    category1: '자연',
    category2: '섬',
    category3: '수목원/관광지',
    imageUrl: 'https://content.r9cdn.net/rimg/dimg/55/02/264dafe5-lm-169304-16804ac990d.jpg?width=1366&height=768&xhint=1655&yhint=1364&crop=true&watermarkposition=lowerright',
    latitude: 37.792556,
    longitude: 128.026402,
    description: `'겨울연가' 촬영지로 유명해진 아름다운 섬입니다. 사계절 내내 방문객들에게 특별한 경험을 선사합니다.
운영 시간: 08:00 ~ 21:00 (계절별 상이)
요금: 일반 16,000원 (선박 요금 포함)
주변 식당: 닭갈비 막국수 거리
주변 숙박: 켄싱턴 리조트 가평, 남이섬 펜션
가는 방법: 경춘선 가평역 하차 후 택시 또는 가평역-남이섬 셔틀버스 이용`,
  },
  {
    id: 6,
    name: 'N서울타워',
    address: '서울특별시 용산구 남산공원길 105',
    areaCode: '11',
    category1: '랜드마크',
    category2: '타워',
    category3: '전망대',
    imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/47c53f31fc27419e9a5030df14036038.jpg?auto=format%2Ccompress&fit=crop&ixlib=python-3.2.1&q=70',
    latitude: 37.551167,
    longitude: 126.988229,
    description: `남산 정상에 위치한 서울의 상징적인 랜드마크입니다. 환상적인 서울의 전경과 야경을 감상할 수 있습니다.
운영 시간: 10:00 ~ 23:00 (주말 24:00)
요금: 전망대 성인 16,000원
주변 식당: N.GRILL, 한쿡
주변 숙박: 그랜드 하얏트 서울, 반얀트리 클럽 앤 스파 서울
가는 방법: 남산순환버스, 남산케이블카 이용`,
  },
  {
    id: 7,
    name: '롯데월드 어드벤처',
    address: '서울특별시 송파구 올림픽로 240',
    areaCode: '11',
    category1: '테마파크',
    category2: '놀이공원',
    category3: '실내/실외 테마파크',
    imageUrl: 'https://cdn.pixabay.com/photo/2019/08/20/09/52/lotte-world-4417726_1280.jpg',
    latitude: 37.511394,
    longitude: 127.098006,
    description: `서울 잠실에 위치한 대규모 실내외 테마파크입니다. 다양한 어트랙션과 공연을 즐길 수 있습니다.
운영 시간: 10:00 ~ 21:00 (매일)
요금: 1일권 성인 62,000원
주변 식당: 롯데월드몰 내 다수, 송리단길
주변 숙박: 롯데호텔 월드, 시그니엘 서울
가는 방법: 지하철 2호선 잠실역 4번 출구`,
  },
  {
    id: 8,
    name: '부산 감천문화마을',
    address: '부산광역시 사하구 감천동 2-177',
    areaCode: '26',
    category1: '역사/문화',
    category2: '마을',
    category3: '벽화 마을',
    imageUrl: 'https://cdn.pixabay.com/photo/2018/06/08/13/26/busan-3462153_1280.jpg',
    latitude: 35.099159,
    longitude: 129.011684,
    description: `부산의 마추픽추라 불리는 독특한 마을입니다. 알록달록한 집들과 골목길 벽화가 인상적입니다.
운영 시간: 상시 (관광객 편의시설 09:00 ~ 18:00)
요금: 무료 (일부 체험 유료)
주변 식당: 감천문화마을 내 다수
주변 숙박: 남포동 주변 호텔, 게스트하우스
가는 방법: 지하철 1호선 토성역 6번 출구에서 마을버스 이용`,
  },
  {
    id: 9,
    name: '순천만 국가정원',
    address: '전라남도 순천시 국가정원1호길 47',
    areaCode: '46',
    category1: '자연',
    category2: '정원',
    category3: '생태 정원',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/05/01/21/58/garden-2276536_1280.jpg',
    latitude: 34.931754,
    longitude: 127.533221,
    description: `순천만 국제정원박람회 개최 장소로, 세계 각국의 정원을 한눈에 볼 수 있는 아름다운 곳입니다.
운영 시간: 09:00 ~ 21:00 (계절별 상이)
요금: 성인 15,000원
주변 식당: 꼬막정식 대풍, 순천만가든
주변 숙박: 에코그라드호텔 순천, 순천만 게스트하우스
가는 방법: 순천역에서 택시 또는 시내버스 66번 이용`,
  },
  {
    id: 10,
    name: '안동 하회마을',
    address: '경상북도 안동시 풍천면 하회종가길 40',
    areaCode: '47',
    category1: '역사/문화',
    category2: '전통 마을',
    category3: '유네스코 세계유산',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/09/20/19/27/korean-traditional-architecture-1683236_1280.jpg',
    latitude: 36.539352,
    longitude: 128.261226,
    description: `유네스코 세계유산으로 등재된 한국의 대표적인 전통 마을입니다. 풍산 류씨가 대대로 살아온 동성마을입니다.
운영 시간: 09:00 ~ 17:00 (계절별 상이)
요금: 성인 5,000원
주변 식당: 하회마을 내 식당, 안동찜닭골목
주변 숙박: 하회마을 내 민박, 안동 그랜드 호텔
가는 방법: 안동역에서 46번 버스 이용`,
  },
  // 11~110번 자동 생성
  ...Array.from({ length: 100 }, (_, i) => {
    const base = [
      {
        id: 1,
        name: '경복궁',
        address: '서울특별시 종로구 사직로 161',
        areaCode: '11',
        category1: '역사/문화',
        category2: '궁궐',
        category3: '조선시대 궁궐',
        imageUrl: 'https://www.kocis.go.kr/CONTENTS/editImage/20211021141222220_8I266MKM.jpg',
        latitude: 37.582046,
        longitude: 126.974955,
        description: `조선 왕조 제일의 법궁이자 한양의 5대 궁궐 중 하나입니다. 아름다운 건축미와 역사적 가치를 느낄 수 있습니다.
운영 시간: 09:00 ~ 17:00 (계절별 상이, 화요일 휴궁)
요금: 성인 3,000원
주변 식당: 토속촌 삼계탕, 자하손만두
주변 숙박: 포시즌스 호텔 서울, 서머셋 팰리스 서울
가는 방법: 지하철 3호선 경복궁역 5번 출구`,
      },
      {
        id: 2,
        name: '해운대 해수욕장',
        address: '부산광역시 해운대구 우동',
        areaCode: '26',
        category1: '자연',
        category2: '해변',
        category3: '도심 해수욕장',
        imageUrl: 'https://www.visitbusan.net/uploadImgs/files/cntnts/20191229153531987_oen',
        latitude: 35.158661,
        longitude: 129.160100,
        description: `부산을 대표하는 해수욕장으로, 넓은 백사장과 아름다운 야경이 유명합니다. 여름철 피서지로 각광받습니다.
운영 시간: 24시간 (해수욕장 개장 기간은 별도)
요금: 무료
주변 식당: 해운대 소문난 암소갈비, 금수복국
주변 숙박: 파라다이스 호텔 부산, 시그니엘 부산
가는 방법: 지하철 2호선 해운대역 3, 5번 출구`,
      },
      {
        id: 3,
        name: '제주 성산일출봉',
        address: '제주특별자치도 서귀포시 성산읍 일출로 284-12',
        areaCode: '50',
        category1: '자연',
        category2: '오름/봉우리',
        category3: '유네스코 세계유산',
        imageUrl: 'https://img3.yna.co.kr/photo/yna/YH/2022/11/29/PYH2022112907350000500_P4.jpg',
        latitude: 33.458641,
        longitude: 126.942784,
        description: `제주도의 대표적인 자연경관이자 유네스코 세계자연유산입니다. 장엄한 일출을 감상할 수 있습니다.
운영 시간: 07:00 ~ 19:00 (동절기 07:30 ~ 17:30)
요금: 성인 5,000원
주변 식당: 성산포뚝배기, 청진동뚝배기
주변 숙박: 성산플레이스, 코업시티호텔 성산
가는 방법: 제주시외버스터미널에서 동회선 일주버스 이용, 성산일출봉 입구 하차`,
      },
      {
        id: 4,
        name: '전주 한옥마을',
        address: '전라북도 전주시 완산구 기린대로 99',
        areaCode: '45',
        category1: '역사/문화',
        category2: '마을',
        category3: '전통 한옥',
        imageUrl: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cee49908-2707-4835-bbcb-cdcba5edf2be',
        latitude: 35.814421,
        longitude: 127.149179,
        description: `전통 한옥 800여 채가 군락을 이루고 있는 곳으로, 한국의 멋과 정취를 느낄 수 있는 대표적인 관광지입니다.
운영 시간: 상시 (각 상점 및 시설별 상이)
요금: 무료 (일부 체험 및 시설 유료)
주변 식당: 한국집, 베테랑 칼국수
주변 숙박: 라한호텔 전주, 전주한옥마을 게스트하우스
가는 방법: 전주역에서 택시 또는 버스 이용`,
      },
      {
        id: 5,
        name: '남이섬',
        address: '강원특별자치도 춘천시 남이섬길 1',
        areaCode: '42',
        category1: '자연',
        category2: '섬',
        category3: '수목원/관광지',
        imageUrl: 'https://content.r9cdn.net/rimg/dimg/55/02/264dafe5-lm-169304-16804ac990d.jpg?width=1366&height=768&xhint=1655&yhint=1364&crop=true&watermarkposition=lowerright',
        latitude: 37.792556,
        longitude: 128.026402,
        description: `'겨울연가' 촬영지로 유명해진 아름다운 섬입니다. 사계절 내내 방문객들에게 특별한 경험을 선사합니다.
운영 시간: 08:00 ~ 21:00 (계절별 상이)
요금: 일반 16,000원 (선박 요금 포함)
주변 식당: 닭갈비 막국수 거리
주변 숙박: 켄싱턴 리조트 가평, 남이섬 펜션
가는 방법: 경춘선 가평역 하차 후 택시 또는 가평역-남이섬 셔틀버스 이용`,
      },
      {
        id: 6,
        name: 'N서울타워',
        address: '서울특별시 용산구 남산공원길 105',
        areaCode: '11',
        category1: '랜드마크',
        category2: '타워',
        category3: '전망대',
        imageUrl: 'https://aws-tiqets-cdn.imgix.net/images/content/47c53f31fc27419e9a5030df14036038.jpg?auto=format%2Ccompress&fit=crop&ixlib=python-3.2.1&q=70',
        latitude: 37.551167,
        longitude: 126.988229,
        description: `남산 정상에 위치한 서울의 상징적인 랜드마크입니다. 환상적인 서울의 전경과 야경을 감상할 수 있습니다.
운영 시간: 10:00 ~ 23:00 (주말 24:00)
요금: 전망대 성인 16,000원
주변 식당: N.GRILL, 한쿡
주변 숙박: 그랜드 하얏트 서울, 반얀트리 클럽 앤 스파 서울
가는 방법: 남산순환버스, 남산케이블카 이용`,
      },
      {
        id: 7,
        name: '롯데월드 어드벤처',
        address: '서울특별시 송파구 올림픽로 240',
        areaCode: '11',
        category1: '테마파크',
        category2: '놀이공원',
        category3: '실내/실외 테마파크',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/08/20/09/52/lotte-world-4417726_1280.jpg',
        latitude: 37.511394,
        longitude: 127.098006,
        description: `서울 잠실에 위치한 대규모 실내외 테마파크입니다. 다양한 어트랙션과 공연을 즐길 수 있습니다.
운영 시간: 10:00 ~ 21:00 (매일)
요금: 1일권 성인 62,000원
주변 식당: 롯데월드몰 내 다수, 송리단길
주변 숙박: 롯데호텔 월드, 시그니엘 서울
가는 방법: 지하철 2호선 잠실역 4번 출구`,
      },
      {
        id: 8,
        name: '부산 감천문화마을',
        address: '부산광역시 사하구 감천동 2-177',
        areaCode: '26',
        category1: '역사/문화',
        category2: '마을',
        category3: '벽화 마을',
        imageUrl: 'https://cdn.pixabay.com/photo/2018/06/08/13/26/busan-3462153_1280.jpg',
        latitude: 35.099159,
        longitude: 129.011684,
        description: `부산의 마추픽추라 불리는 독특한 마을입니다. 알록달록한 집들과 골목길 벽화가 인상적입니다.
운영 시간: 상시 (관광객 편의시설 09:00 ~ 18:00)
요금: 무료 (일부 체험 유료)
주변 식당: 감천문화마을 내 다수
주변 숙박: 남포동 주변 호텔, 게스트하우스
가는 방법: 지하철 1호선 토성역 6번 출구에서 마을버스 이용`,
      },
      {
        id: 9,
        name: '순천만 국가정원',
        address: '전라남도 순천시 국가정원1호길 47',
        areaCode: '46',
        category1: '자연',
        category2: '정원',
        category3: '생태 정원',
        imageUrl: 'https://cdn.pixabay.com/photo/2017/05/01/21/58/garden-2276536_1280.jpg',
        latitude: 34.931754,
        longitude: 127.533221,
        description: `순천만 국제정원박람회 개최 장소로, 세계 각국의 정원을 한눈에 볼 수 있는 아름다운 곳입니다.
운영 시간: 09:00 ~ 21:00 (계절별 상이)
요금: 성인 15,000원
주변 식당: 꼬막정식 대풍, 순천만가든
주변 숙박: 에코그라드호텔 순천, 순천만 게스트하우스
가는 방법: 순천역에서 택시 또는 시내버스 66번 이용`,
      },
      {
        id: 10,
        name: '안동 하회마을',
        address: '경상북도 안동시 풍천면 하회종가길 40',
        areaCode: '47',
        category1: '역사/문화',
        category2: '전통 마을',
        category3: '유네스코 세계유산',
        imageUrl: 'https://cdn.pixabay.com/photo/2016/09/20/19/27/korean-traditional-architecture-1683236_1280.jpg',
        latitude: 36.539352,
        longitude: 128.261226,
        description: `유네스코 세계유산으로 등재된 한국의 대표적인 전통 마을입니다. 풍산 류씨가 대대로 살아온 동성마을입니다.
운영 시간: 09:00 ~ 17:00 (계절별 상이)
요금: 성인 5,000원
주변 식당: 하회마을 내 식당, 안동찜닭골목
주변 숙박: 하회마을 내 민박, 안동 그랜드 호텔
가는 방법: 안동역에서 46번 버스 이용`,
      },
    ][i % 10];
    return {
      ...base,
      id: 11 + i,
      name: `${base.name} #${11 + i}`,
      latitude: base.latitude + ((i % 10) * 0.001),
      longitude: base.longitude + ((i % 10) * 0.001),
    };
  }),
];
