import React from "react";
import Link from "next/link";
import SliderSlick from "react-slick";

const ButikCarousel = ({ butikLogos }) => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    touchThreshold: 100,
    slidesToShow: 10,
    // slidesToScroll: 9,
    variableWidth: true
  };

  return (
    <div className="butik-slider">
      <SliderSlick {...settings}>
        {butikLogos.map((butik, index) =>
          <Link href={`/${butik.butik_slug}`} key={index}>
            <div className="butik-slider__item">
              <img src={butik.butik_image} alt={butik.butik} />
            </div>
          </Link>
        )}
      </SliderSlick>
    </div>
  );
};

export default ButikCarousel;
