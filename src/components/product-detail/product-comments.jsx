import ReactStars from 'react-stars'
import Avatar from 'react-avatar';

const ProductComments = ({ comments }) => {
  return (
    <div id="comments" className="product-detail__comments mt-4 pt-3">
      <h3 className="text-center mb-4">Ürün Değerlendirmeleri ({comments.length})</h3>
      <div className="product-detail__comments-wrp">
        {comments.map((comment, index) => (
          <div className="product-detail__comments-item" key={index}>
            <div className="d-flex">
              <Avatar className="product-detail__comments-avatar mr-3" name={comment.comment_name} round={true} />
            </div>
            <div className="d-flex flex-column w-100">
              <div className="d-flex align-items-center justify-content-between w-100">
                <h3 className="product-detail__comments-name mb-2">{comment.comment_name}</h3>
                <ReactStars
                  count={5}
                  value={3}
                  size={26} half={false}
                  color1={'#e3eaea'}
                  color2={'#ffcc65'}
                />
              </div>
              <p className="product-detail__comments-text">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductComments;
