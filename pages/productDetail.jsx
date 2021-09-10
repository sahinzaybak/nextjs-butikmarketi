import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Components
import DetailHeader from '../src/components/product-detail/detail-header'
import ProductGallerySlider from '../src/components/product-detail/product-gallery-slider'
import ProductGalleryThumb from '../src/components/product-detail/product-gallery-thumb'
import ProductInfoTop from '../src/components/product-detail/product-info-top'
import ProductInfoBottom from '../src/components/product-detail/product-info-bottom'


const ProductDetail = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  return (
    <div className="product-detail">
      <DetailHeader />
      <div className="custom-container">
        <div className="row">
          <div className="col-md-6">
            <ProductGallerySlider nav={nav2} ref={slider => (setSlider1(slider))} />
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <ProductInfoTop />
              <ProductGalleryThumb nav={nav1} ref={slider => (setSlider2(slider))} />
              <ProductInfoBottom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
