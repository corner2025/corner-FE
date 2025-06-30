const DutyFreePage = () => {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Navbar */}
      <nav className="w-full bg-gray-100 shadow-md rounded-md">
        <div className="flex justify-center gap-8 py-4">
          <button
            className="text-lg font-semibold hover:text-blue-500"
            onClick={() => scrollToSection("ranking")}
          >
            랭킹
          </button>
          <button
            className="text-lg font-semibold hover:text-blue-500"
            onClick={() => scrollToSection("lookup")}
          >
            조회
          </button>
          <button
            className="text-lg font-semibold hover:text-blue-500"
            onClick={() => scrollToSection("nearby")}
          >
            가까운 면세점 찾기
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="mt-10 mb-10 text-3xl" id="ranking">
        면세점 품목별 랭킹 순위
      </div>
      <div>
        <ul className="list-disc pl-5">
          <li>1위: 상품 A</li>
          <li>2위: 상품 B</li>
          <li>3위: 상품 C</li>
          <li>4위: 상품 D</li>
          <li>5위: 상품 E</li>
        </ul>
      </div>
      <div id="lookup" className="mt-50">
        <h1 className="text-center text-3xl mt-10">품목별 조회 페이지</h1>
        <p className="mt-5">
          면세점에서 가장 인기 있는 상품들을 확인해보세요! 다양한 품목이
          준비되어 있습니다.
        </p>
      </div>
      <div id="nearby" className="mt-50 mb-50">
        <h1 className="text-center text-3xl mt-10">가까운 면세점 찾기</h1>
        <p className="mt-5">현재 위치를 기반으로 가까운 면세점을 찾아보세요!</p>
      </div>
    </div>
  );
};

export default DutyFreePage;
