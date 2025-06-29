import main from "../../assets/img/free-nature-images.jpg";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>main Page 입니다.</p>
      <img src={main} />
    </div>
  );
};

export default MainPage;
