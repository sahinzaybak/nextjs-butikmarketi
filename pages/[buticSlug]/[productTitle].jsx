//*** Ürün Detay Sayfası

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Components
import DetailHeader from '../../src/components/product-detail/detail-header'
import ProductGallerySlider from '../../src/components/product-detail/product-gallery-slider'
import ProductGalleryThumb from '../../src/components/product-detail/product-gallery-thumb'
import ProductInfoTop from '../../src/components/product-detail/product-info-top'
import ProductInfoBottom from '../../src/components/product-detail/product-info-bottom'
import ProductComments from '../../src/components/product-detail/product-comments'
import ProductCard from "../../src/components/product-card";

//Action
import { fetchProductDetail, fetchCategoryProductList } from '../../src/store/actions/products'

const ProductDetail = () => {
  const router = useRouter();
  const productTitle = router.query.productTitle;
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  let productDetail = useSelector((state) => state.products.detailProductInfo); //Dolan "ürün bilgisini" al.
  let similarProduct = useSelector((state) => state.products.categoryProductList); //Dolan "ürün bilgisini" al.
  useEffect(() => {
    if (productTitle && similarProduct != null)
      dispatch(fetchProductDetail(productTitle));
    dispatch(fetchCategoryProductList("pantolon")); //"Girilen ürüne ait ürün detay bilgisi" doldurmak için action'a dispatch et.
  }, [productTitle]);

  return (
    <div className="product-detail">
      {productDetail && productDetail.comments &&
        <>
          <DetailHeader
            buticName={productDetail.butik}
            butikSlug={productDetail.butik_slug}
            buticLogo={productDetail.butik_image}
            productTitle={productDetail.title}
            price={productDetail.fiyat} />
          <div className="custom-container">
            <div className="product-detail__main">
              <div className="row">
                <div className="col-md-6">
                  <ProductGallerySlider
                    images={productDetail.images}
                    nav={nav2}
                    ref={slider => (setSlider1(slider))} />
                </div>
                <div className="col-md-6">
                  <div className="product-info">
                    <ProductInfoTop
                      productTitle={productDetail.title}
                      productStar={productDetail.star}
                      commentsCount={productDetail.comments.length}
                      productDescription={productDetail.description} />
                    <ProductGalleryThumb
                      images={productDetail.images}
                      nav={nav1}
                      ref={slider => (setSlider2(slider))} />
                    <ProductInfoBottom
                      buticName={productDetail.butik}
                      productColors={productDetail.colors} />
                  </div>
                </div>
              </div>
              <ProductComments comments={productDetail.comments} />
              <div className="product-detail__similar pt-4 mt-4">
                <h3 className="text-center">İlginizi çekebilecek ürünler</h3>
                <div className="mt-4 pt-3">
                  <div className="row">
                    {similarProduct.products && similarProduct.products.map((product, index) => (
                      <ProductCard product={product} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default ProductDetail;
