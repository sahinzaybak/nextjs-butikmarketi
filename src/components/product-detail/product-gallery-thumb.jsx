import {forwardRef } from "react";
import Slider from "react-slick";

const ProductGalleryThumb = forwardRef((props,ref) => {
  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '3px'
  };
  return (
    <div className="product-detail__thumbs product-info__item color mt-3">
      <span className="product-info__title">Ürün Resimleri</span>
      <div className="thumbnail-slider-wrap">
        <Slider {...settingsThumbs} asNavFor={props.nav} ref={ref}>
          <div className="slick-slide">
            <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-3.jpg" />
          </div>
          <div className="slick-slide">
            <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-11.jpg" />
          </div>
          <div className="slick-slide">
            <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-13.jpg" />
          </div>
          <div className="slick-slide">
            <img className="slick-slide-image" src="https://webizade.com/bm/img/resim-2.jpg" />
          </div>
        </Slider>
      </div>
    </div>
  );
});

export default ProductGalleryThumb;
