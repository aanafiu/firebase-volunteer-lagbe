import Lottie from "lottie-react";
import loadingA from "../../assets/Loading.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-current z-50">
      <Lottie animationData={loadingA} className="w-32 h-32" />
    </div>
  );
};

export default Loader;
