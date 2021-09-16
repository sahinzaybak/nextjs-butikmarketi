import Image from 'next/image'
import info from '../../assets/images/information.svg'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const infoModal = ({ ...props }) => {
  return (
    <Modal {...props} center>
    <div className="d-flex modal-top">
      <Image src={info} alt="Ürün hakkında soru sor" />
      <h3 className="modal-title ml-3">ButikMarketi genel sipariş detayları</h3>
    </div>
    <div className="modal-form modal-info mt-4">
      <p>Siparişleriniz <u>ürün sahibi butik</u> tarafından adresinize gönderilir.</p>
      <p>Siparişlerinizi <u>kapıda ödeme kolaylığı</u> ile satın alabilirsiniz. </p>
      <p>Ürün teslimi sonrası gelen ürünü <u>geri iade</u> veya <u>ürün değişimi</u> yapabilirsiniz. </p>
      <p>Siparişinizi oluşturduktan sonra, ürününüzün takibi<u>(kargo süreci, ürünün size teslimi, sipariş sonrası doğru ürün kontrolü)</u> <u>tamamen bizim kontrolümüzde</u> olup, whatsapp üzerinden bilgilendirileceksiniz. </p>
      <p>Size teslim edilen ürün ile resimde beğenip, sipariş verdiğiniz ürün birbirinden <u>tamamen</u> farklı ise, ücretiniz <u>bizim tarafımızdan</u> eft ile hemen <u>iade edilip</u>, o butiğin üyeliği <u>anında iptal edilir.</u> </p>
      <p>Sitemize kayıtlı herhangi bir butiğin, bizim sitemiz dışındaki ürünlerini satın alırsanız, oluşabilecek olumsuzluklardan <u>biz sorumlu değiliz.</u></p>
    </div>
  </Modal>
  );
};

export default infoModal;
