import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import ReactStars from 'react-stars'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Comment = ({ ...props }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  return (
    <Modal {...props} center>
      <div className="d-flex modal-top">
        <Image src={ship} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Ürüne yorum yap</h3>
      </div>
      <div className="modal-form text-center">
        <div className="modal-item w-100">
          <h5>Ürüne puan verin</h5>
          <div className="d-flex align-items-center justify-content-center">
          <ReactStars
            count={5}
            value={3}
            onChange={ratingChanged}
            size={35} half={false}
            color1={'#e3eaea'}
            color2={'#ffcc65'}
          />
          </div>
        </div>
        <div className="modal-item w-100 mt-4">
        <h5 className="mb-3">Ürüne yorum yap</h5>
          <textarea />
        </div>
        <div className="green-button d-flex align-items-center mt-3 ml-auto">
          <Image src={received} alt="Ürün hakkında soru sor" />
          <p>Ürünü sipariş et</p>
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
