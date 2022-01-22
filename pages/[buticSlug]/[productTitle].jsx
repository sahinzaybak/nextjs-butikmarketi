//*** Ürün Detay Sayfası

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import SliderSlick from "react-slick";

//Components
import DetailHeader from '../../src/components/product-detail/detail-header'
import ProductGallerySlider from '../../src/components/product-detail/product-gallery-slider'
import ProductGalleryThumb from '../../src/components/product-detail/product-gallery-thumb'
import ProductInfoTop from '../../src/components/product-detail/product-info-top'
import ProductInfoBottom from '../../src/components/product-detail/product-info-bottom'
import ProductComments from '../../src/components/product-detail/product-comments'
import ProductDetailContentLoader from '../../src/components/content-loader/product-detail-loader'
import ProductCard from "../../src/components/product-card";

//Action
import { fetchProductDetail } from '../../src/store/actions/products'

const ProductDetail = () => {
  const router = useRouter();
  const productTitle = router.query.productTitle;
  const dispatch = useDispatch();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const settings = {
    lazyLoad: 'ondemand',
    infinite: true,
    arrows: true,
    autoplay: true,
    speed: 500,
    touchThreshold: 100,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  let productDetail = useSelector((state) => state.products.detailProductInfo); //Dolan "ürün bilgisini" al.
  // let similarProduct = useSelector((state) => state.products.categoryProductList); //Dolan "benzer ürün bilgisini" al.
  //"Girilen ürüne ait ürün detay bilgisi" doldurmak için action'a dispatch et. -> yesiltshirt
  console.log(productDetail)
  useEffect(() => {
      dispatch({ type: 'PRODUCT_DETAIL_CLEAR', payload: [] })
      dispatch(fetchProductDetail(productTitle));
  }, [productTitle]);

  //Sayfa yüklendiğinde filtreleme seçeneklerinin ilki seçili gelsin.
  useEffect(() => {
    if (productDetail != "") {
      dispatch({ type: 'SELECTED_FILTER_SIZE', payload: { index: 0, selectedTitle: productDetail?.sizes[0]?.size_title } })
      dispatch({ type: 'SELECTED_FILTER_COLOR', payload: { index: 0, selectedTitle: productDetail?.colors[0]?.color_title } })
    }
  }, [productDetail]);

  return (
    <>
      {productDetail == "" ? <ProductDetailContentLoader /> :
        <div className="product-detail">
          {productDetail && productDetail.comments && productDetail.butiks.data[0] &&
            <>
              <DetailHeader
                buticName={productDetail.butiks.data[0].attributes.butik_name}
                butikSlug={productDetail.butiks.data[0].attributes.butik_slug}
                buticLogo={productDetail.butiks.data[0].attributes.butik_image}
                productTitle={productDetail.title}
                price={productDetail.price}
                productColors={productDetail.colors}
                productSize={productDetail.sizes}
              />
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
                          productColors={productDetail.colors}
                          productSize={productDetail.sizes}
                        />
                      </div>
                    </div>
                  </div>
                  <ProductComments comments={productDetail.comments} />
                </div>
                {/* <div className="product-detail__similar pt-4 mt-4">
              <h3 className="text-center">İlginizi çekebilecek diğer ürünler</h3>
              <div className="mt-4">
                <SliderSlick {...settings}>
                  {similarProduct.products && similarProduct.products.map((product, index) =>
                    <ProductCard product={product} slide key={index} />
                  )}
                </SliderSlick>
              </div>
            </div> */}

              </div>
              <div className="product-detail__more pb-5">
                <div className="row">
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://footwearnews.com/wp-content/uploads/2019/05/met-gala-2019-converse.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla AYAKAKABI</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-tee-1623337322.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla T-SHIRT</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://glorytrends.com/wp-content/uploads/2020/04/womens-handbags-2021.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla ÇANTA</h2>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="product-detail__more-item">
                      <img src="https://ktnimg.mncdn.com/mnresize/406/534/product-images/1KAK68167PW001/1500Wx1969H/1KAK68167PW001_G01_zoom1_V02.jpg" alt="" />
                      <h2 className="product-detail__more-title">Daha fazla BLUZ</h2>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      }
    </>

  );
};

export default ProductDetail;
