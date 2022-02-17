import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import Image from 'next/image'
import ship from '../../assets/images/shipped.svg'
import received from '../../assets/images/order.svg'
import ReactStars from 'react-stars'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ImageUploading from 'react-images-uploading';
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';

//Actions
import { fetchProductComments } from '../../store/actions/orders'
const Comment = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [rating, setRating] = useState([]);
  const maxNumber = 3;

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  let imageSliderArray = []
  const onChange = (imageList, addUpdateIndex) => {// data for submit
    setImages(imageList);
    const fmData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };
    imageList.forEach((item) => { //Seçilen resimleri aktar
      fmData.append("image", item.file);
      try {
        axios.post("https://api.imgbb.com/1/upload?key=8b372dc4d088f787a0516386606606eb", fmData, config).then(value => {
          if (value != null) {
            imageSliderArray.push({ image_slider: value.data.data.display_url })
            setImageList(imageSliderArray)
          }
        })
      } catch (err) { console.log(err) }
    });
  };

  function sendComment() {
    dispatch(fetchProductComments(props.productId, props.userName, props.comments, comment, rating, imageList))
  }

  return (
    <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={props.classNames} center>
      <div className="d-flex modal-top">
        <Image src={ship} alt="Ürün hakkında soru sor" />
        <h3 className="modal-title ml-3">Ürüne Yorum Yap</h3>
      </div>
      <div className="modal-form text-center">
        <div className="modal-item w-100">
          <h5>Ürüne puan verin</h5>
          <div className="d-flex align-items-center justify-content-center mt-1">
            <ReactStars
              count={5}
              value={0}
              onChange={ratingChanged}
              size={35} half={false}
              color1={'#e3eaea'}
              color2={'#faab66'}
            />
          </div>
        </div>
        <div className="modal-item w-100 mt-4">
          <h5 className="mb-3">Ürün hakkındaki düşünceleriniz <span className="small-info">(İsteğe bağlı)</span></h5>
          <textarea onChange={e => setComment(e.target.value)} />
        </div>
        <ImageUploading
          multiple
          value={images}
          maxFileSize={10485760}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={['jpg', 'png']}>
          {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps, errors }) => (
            <>
              {errors &&
                <div>
                  {errors.maxNumber && <span>En fazla 3 fotoğraf yükleyebilirsiniz.</span>}
                  {errors.acceptType && <span>Sadece jpg ve png formatında resimler yükleyebilirsiniz.</span>}
                  {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                </div>
              }
              <div className="upload__image-wrapper">
                <div className="d-flex flex-wrap mt-3">
                  <div className="upload-image-button" style={isDragging ? { borderColor: '#f7923a' } : undefined} onClick={onImageUpload} {...dragProps}>
                    <CameraOutlined style={{ fontSize: '22px' }} />
                    <p>Fotoğraf Ekle</p>
                  </div>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item mb-3">
                      <img src={image['data_url']} alt="" className="w-100" />
                      <div className="image-item__actions">
                        <div className="image-item__actions-item">
                          <DeleteOutlined onClick={() => onImageRemove(index)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="modal-comment__info mt-2">En fazla 3 dosya ekleyebilirsiniz. Toplam Dosya Boyutu 10 MB'ı geçmemelidir.</p>
            </>
          )}
        </ImageUploading>
        <div className="green-button d-flex align-items-center mt-3 ml-auto" onClick={sendComment}>
          <Image src={received} alt="Ürün hakkında soru sor" />
          <p>Ürünü sipariş et</p>
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
