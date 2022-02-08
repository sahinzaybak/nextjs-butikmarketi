import { useState } from "react";
import ReactStars from 'react-stars'
import { Link } from 'react-scroll'
import CommnetModal from '../modals/comment'
import StarRatings from 'react-star-ratings';

const ProductInfoTop = ({ productTitle, comments, commentsCount, productDescription }) => {
  const [openComment, setOpenComment] = useState(false);

  let totalStar = 0;
  comments.forEach(comment => {
    totalStar += comment.star
  });


  function onCloseComment() {
    setOpenComment(false)
  };

  function ratingChanged(newRating) {
    setRating(newRating)
  }
  return (
    <>
      <h1 className="product-info__name">{productTitle}</h1>
      <div className="d-flex align-items-center">
        <StarRatings
          rating={totalStar / commentsCount}
          starEmptyColor="#e3eaea"
          starRatedColor="#ffcc65"
          starDimension="22px"
          starSpacing="0px"
          changeRating={ratingChanged}
          numberOfStars={5}
          name='rating'
        />
        <p className="product-info__star-count">{(totalStar / commentsCount).toFixed(1)}</p>
      </div>

      <div className="d-flex align-items-center mt-1">
        <Link to="comments" spy={true} smooth={true}>
          <p className="cursor-pointer">({commentsCount}) Yorumu Gör</p>
        </Link>
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
