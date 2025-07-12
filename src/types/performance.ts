// export type Performance = {
//     id: number; // 고유 ID
//     title: string; // 공연 제목
//     place: string; // 공연 장소
//     area?: string; // 지역 (선택적 속성)
//     genre: string; // 장르
//     startDate: Date; // 시작 날짜 (Date 객체로 변경)
//     endDate: Date; // 종료 날짜 (Date 객체로 변경)
//     imgUrl?: string; // 이미지 URL (선택적 속성, camelCase로 변경)
//     description?: string; // 설명 (선택적 속성)
//   };

export type Performance = {
    id: string;
    name: string;
    area: string;
    genre: string;
    startDate: string; // ex) "2025.07.31"
    endDate: string; // ex) "2025.07.31"
    posterUrl?: string;
    state: string;
    openRun: string;
}