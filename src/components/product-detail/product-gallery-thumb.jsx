import { forwardRef } from "react";
import Slider from "react-slick";

const ProductGalleryThumb = forwardRef((props, ref) => {
  let sliderThumbCount
  if(props.images) sliderThumbCount = props.images.length 
  const settingsThumbs = {
    slidesToShow: sliderThumbCount,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '3px'
  };
  return (
    <div className="product-detail__thumbs product-info__item color mt-3">
      <div className="thumbnail-slider-wrap">
        <Slider {...settingsThumbs} asNavFor={props.nav} ref={ref}>
          {props.images && props.images.map((image, index) => (
            <div className="slick-slide" key={index}>
              <img className="slick-slide-image" src={image.image} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
});

export default ProductGalleryThumb;
