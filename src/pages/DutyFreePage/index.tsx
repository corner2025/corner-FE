import React from "react";

const DutyFreePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="mb-10 mt-10 text-3xl">면세점 품목별 랭킹 순위</div>
      <div>
        <ul className="list-disc pl-5">
          <li>1위: 상품 A</li>
          <li>2위: 상품 B</li>
          <li>3위: 상품 C</li>
          <li>4위: 상품 D</li>
          <li>5위: 상품 E</li>
        </ul>
      </div>
    </div>
  );
};

export default DutyFreePage;
