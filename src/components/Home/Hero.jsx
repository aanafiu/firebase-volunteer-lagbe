
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import img1 from "../../assets/img1.jpeg"
import img2 from "../../assets/img2.jpeg"
import i1 from "../../assets/i1.jpeg"
import i2 from "../../assets/i2.jpeg"
import i3 from "../../assets/i3.jpeg"

const Hero = () => {
  return (
    <div className="my-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img2} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i1} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i2} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i3} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={img1} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i1} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i2} alt="slider images"  /></SwiperSlide>
        <SwiperSlide><img src={i3} alt="slider images"  /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
