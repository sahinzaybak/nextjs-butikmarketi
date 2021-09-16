import { useState } from "react";
import ReactStars from 'react-stars'
import { Link } from 'react-scroll'
import CommnetModal from '../modals/comment'

const ProductInfoTop = ({ productTitle, productStar, commentsCount, productDescription }) => {
  const [openComment, setOpenComment] = useState(false);
  const onCloseComment = () => setOpenComment(false);

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
        <Link to="comments" spy={true} smooth={true}>
          <p className="cursor-pointer">({commentsCount}) Yorumu Gör</p>
        </Link>
        <p className="ml-2 cursor-pointer" onClick={() => setOpenComment(true)}><strong>Yorum Yap</strong></p>
      </div>
      <div className="product-info__item mt-3">
        <span className="product-info__title">Ürün Açıklaması</span>
        <p className="product-info__desc mt-1">{productDescription}</p>
      </div>
      <CommnetModal open={openComment} onClose={onCloseComment} classNames={{ modal: 'modal-comment' }} />
    </>
  );
};

export default ProductInfoTop;
