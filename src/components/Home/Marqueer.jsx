import { Typewriter } from "react-simple-typewriter";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import Marquee from "react-fast-marquee";
const Marqueer = () => {
  return (
    <div className="my-10">
      <h1 className="text-3xl my-10 md:text-4xl lg:text-5xl font-extrabold w-fit mx-auto text-blue-950 dark:text-blue-600">
        Our{" "}
        <span className="text-green-600 dark:text-green-500">
          <Typewriter
            words={["Sponsors"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </h1>
      <Marquee>
        <div className="h-1 w-[300vh] bg-green-600 shadow-lg"></div>
      </Marquee>
      <Marquee direction="left" pauseOnHover={true} className="my-2">
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
        <img src={img2} className="w-[100px] mx-5 "></img>
        <img src={img1} className="w-[100px] mx-5 "></img>
      </Marquee>
      <Marquee>
        <div className="h-1 w-[300vh] bg-green-600 shadow-lg"></div>
      </Marquee>
    </div>
  );
};

export default Marqueer;
