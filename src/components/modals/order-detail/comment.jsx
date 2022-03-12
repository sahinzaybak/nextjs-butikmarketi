import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import ReactStars from 'react-stars'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ImageUploading from 'react-images-uploading';
import { CameraOutlined, DeleteOutlined } from '@ant-design/icons';

import ship from '../../../assets/images/message.png'
import received from '../../../assets/images/order.svg'
import Link from "next/link";
import close from '../../../assets/images/reply-message.svg'
import tick from '../../../assets/images/tick.svg'
import check from '../../../assets/images/check.png'

//Actions
import { fetchProductComments } from '../../../store/actions/orders'

const Comment = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccessInfo, setOpenSuccessInfo] = useState(false);
  const [defaultImageCount, setDefaultImageCount] = useState();
  const maxNumber = 3;

  useEffect(() => {
    if (props.comment != "") {
      setImages(props.comment.commentImages);
      props.comment.commentImages.forEach((item) => { //resim adedi kadar dön ve resim itemlarını useState at ki uploadImage'da map içinde dönebilelim.
        imageSliderArray.push(item)
        setImageList(imageSliderArray)
        setDefaultImageCount(props.comment.commentImages.length)
      });
    }
  }, [props.comment]);

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  let imageSliderArray = []
  let selectedAllImages = []
  const onChange = (imageList) => { //Resim seç
    console.log(imageList)
    setImages(imageList);
    imageList.forEach((item) => { //resim adedi kadar dön ve resim itemlarını useState at ki uploadImage'da map içinde dönebilelim.
      imageSliderArray.push(item)
      setImageList(imageSliderArray)
    });
  };

  let uploadImages;
  async function sendComment() {
    setOpenConfirm(false)
    setLoading(true)
    if (props.comment == "")
      uploadImages = await uploadImageFirst(); //resimleri s3'e yükle. ilk resim yüklerken

    else if (props.comment != "" && imageList.length > defaultImageCount)
      uploadImages = await uploadImageUpdate(); //resimleri s3'e yükle. resimleri güncellerken

    else if (props.comment != "" && imageList.length < defaultImageCount) //resimlerden bazılarını sildikten sonra
      uploadImages = imageList

    else
      uploadImages = await props.comment.commentImages //resime hiç dokunma sadece inputları güncellerken

    console.log(uploadImages)

    await dispatch(fetchProductComments(props.productId, props.userName, props.userId, props.comments, comment, rating, uploadImages))
    setLoading(false)
    props.onClose(false)
    setOpenSuccessInfo(true)
  }

  //Resimleri s3'e yükle. (Resimleri güncelle, sadece yeni eklenen resimleri ekler!)
  let config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } };
  async function uploadImageUpdate() {
    await Promise.all(imageList.map(async (item) => { //Seçilen resimleri aktar
      if (item.image.includes('base64')) {
        let { url } = await fetch("http://localhost:1337/api/orders/productComment", config).then(res => res.json()); //AWS işlemleri için. Her bir resim için ayrı link üretmesi gerekli.
        await fetch(url, { //aws url
          method: "PUT",
          headers: { "Content-Type": "multipart/form-data" },
          body: item.file
        })
        let imageUrl = url.split('?')[0]
        selectedAllImages.push({ image: imageUrl }, ...props.comment.commentImages)
      }

    }));
    return selectedAllImages;
  }

  //Resimleri s3'e yükle. (ilk defa resim eklerken)
  async function uploadImageFirst() {
    await Promise.all(imageList.map(async (item) => { //Seçilen resimleri aktar
      let { url } = await fetch("http://localhost:1337/api/orders/productComment", config).then(res => res.json()); //AWS işlemleri için. Her bir resim için ayrı link üretmesi gerekli.
      await fetch(url, { //aws url
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        body: item.file
      })
      let imageUrl = url.split('?')[0]
      selectedAllImages.push({ image: imageUrl })
    }));

    return selectedAllImages;
  }


  return (
    <>
      <Modal open={props.open} onClose={props.onClose} showCloseIcon={props.showCloseIcon} classNames={props.classNames} center>
        {loading &&
          <div className="order-loading">
            <div className="order-loading__wrp">
              <p>Yorumunuz gönderiliyor..</p>
            </div>
          </div>
        }
        {!loading &&
          <div>
            <div className="d-flex modal-top">
              <Image src={ship} alt="Ürün hakkında soru sor" />
              <h3 className="modal-title ml-3">Ürünü değerlendir</h3>
            </div>
            <div className="modal-form text-center">
              <div className="modal-item w-100">
                <h5>Ürüne puan verin</h5>
                <div className="d-flex align-items-center justify-content-center mt-1">
                  <ReactStars
                    count={5}
                    value={props.comment.star != "" ? props.comment.star : 0}
                    onChange={ratingChanged}
                    size={35} half={false}
                    color1={'#e3eaea'}
                    color2={'#faab66'}
                  />
                </div>
              </div>
              <div className="modal-item w-100 mt-4">
                <h5 className="mb-3">Ürün hakkındaki düşünceleriniz <span className="small-info">(İsteğe bağlı)</span></h5>
                <textarea defaultValue={props.comment.comment} onChange={e => setComment(e.target.value)} />
              </div>
              <ImageUploading
                multiple
                value={images}
                maxFileSize={10485760}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="image"
                acceptType={['jpg', 'jpeg', 'png',]}>
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
                            <img src={image['image']} alt="" className="w-100" />
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
              <div className="green-button d-flex align-items-center justify-content-center mt-3 ml-auto" onClick={() => setOpenConfirm(true)}>
                <Image src={ship} alt="Ürün hakkında soru sor" />
                <p>Ürünü değerlendir</p>
              </div>
            </div>
          </div>
        }
      </Modal>

      <Modal open={openConfirm} onClose={() => setOpenConfirm(false)} classNames={{ modal: 'modal-steps medium' }} center>
        <div className="d-flex modal-top">
          <Image src={received} alt="Ürün hakkında soru sor" />
          <h3 className="modal-title ml-3">Değerlendirme Onayı</h3>
        </div>
        <div className="modal-form">
          <h3 className="large-title">Değerlendirmenizi veya yorumunuzu göndermek  <br /> istediğinizden emin misiniz?</h3>
          <div className="alert-modal__action d-flex align-items-center flex-column">
            <div className="green-button d-flex align-items-center mt-3" onClick={() => sendComment()}>
              <Image src={tick} alt="Ürün hakkında soru sor" />
              <p>Evet, eminim değerlendirmeyi hemen gönderebiliriz.</p>
            </div>
            <div className="green-button danger d-flex align-items-center mt-3">
              <Image src={close} alt="Ürün hakkında soru sor" onClick={() => setOpenConfirm(false)} />
              <p>Hayır, tekrar kontrol etmek istiyorum.</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={openSuccessInfo} onClose={() => setOpenSuccessInfo(false)} center>
        <div className="modal-form">
          <div className="modal-form__success text-center">
            <Image src={check} alt="Sipariş oluşturuldu." />
            <h3 className="large-title green mb-0 mt-2 mb-3">Tebrikler siparişiniz oluşturuldu.</h3>
            <p>Siparişinizi satıcı butik tarafından kargoya verilmeden <br />  yaklaşık 1 gün içerisinde iptal edebilirsiniz.</p>
            <Link href="/siparislerim">
              <div className="green-button mx-auto mt-4">
                <div className="d-flex align-items-center justify-content-center">
                  <p className="button-text">Ürün detaya git</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Modal>

    </>
  )
}

export default Comment;
