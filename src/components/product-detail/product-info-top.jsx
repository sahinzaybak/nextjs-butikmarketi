import ReactStars from 'react-stars'
const ProductInfoTop = ({ productTitle }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  return (
    <>
      <h1 className="product-info__name">{productTitle}</h1>
      <ReactStars
        count={5}
        value={4}
        onChange={ratingChanged}
        size={22} half={false}
        color1={'#e3eaea'}
        color2={'#ffcc65'}
      />
      <div className="d-flex align-items-center">
        <p>(6) Yorum</p>
        <p className="ml-2"><strong>Yorum Yap</strong></p>
      </div>
      <div className="product-info__item mt-3">
        <span className="product-info__title">Ürün Açıklaması</span>
        <p className="product-info__desc mt-1">Bakışlarını gücünü artıran, makyajın ve suratınızın güzelliğini ortaya çıkaran en önemli adımlardan biri kaş şekillendirmedir. Kaş sabitleyici sabun kullanarak gün boyu etkili bakışlara sahip olabilirsiniz.</p>
      </div>
    </>
  );
};

export default ProductInfoTop;
