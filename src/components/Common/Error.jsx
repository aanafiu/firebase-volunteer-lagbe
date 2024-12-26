import Lottie from "lottie-react";
import error from "../../assets/error.json"
const Error = () => {
    return (
        <div className=" w-full h-svh rounded-xl bg-allText text-allBgDark flex-col font-bold text-3xl backdrop-blur-2xl shadow-xl ring-1 ring-black/5 p-6 justify-center items-center flex">
            <Lottie animationData={error}/>
        </div>
    );
};

export default Error;