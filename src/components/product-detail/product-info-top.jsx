import ReactStars from 'react-stars'

const ProductInfoTop = ({ productTitle,productStar,commentsCount, productDescription }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  return (
    <>
      <h1 className="product-info__name">{productTitle}</h1>
      <ReactStars
        count={5}
        value={productStar}
        onChange={ratingChanged}
        size={22} half={false}
        color1={'#e3eaea'}
        color2={'#ffcc65'}
      />
      <div className="d-flex align-items-center">
        <p>({commentsCount}) Yorum</p>
        <p className="ml-2"><strong>Yorum Yap</strong></p>
      </div>
      <div className="product-info__item mt-3">
        <span className="product-info__title">Ürün Açıklaması</span>
        <p className="product-info__desc mt-1">{productDescription}</p>
      </div>
    </>
  );
};

export default ProductInfoTop;
