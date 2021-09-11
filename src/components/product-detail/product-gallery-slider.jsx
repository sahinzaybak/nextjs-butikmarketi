import { forwardRef } from "react";
import Image from 'next/image'
import Slider from "react-slick";
import instagram from '../../assets/images/instagram.svg'

const ProductGallerySlider = forwardRef((props, ref) => {
  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    touchThreshold: 100,
    fade: true,
    asNavFor: '.slider-nav'
  };
  return (
    <div className="product-detail__gallery">
      <div className="product-detail__instagram">
        <Image src={instagram} alt="Ürün hakkında soru sor" />
      </div>
      <Slider {...settingsMain} asNavFor={props.nav} ref={ref}>
        {props.images && props.images.map((image, index) => (
          <div className="slick-slide" key={index}>
            <img className="slick-slide-image" src={image.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default ProductGallerySlider;
