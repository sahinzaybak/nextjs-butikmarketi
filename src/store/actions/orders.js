import axios from "axios";
import cargoInfo from '../../api/cargo.json'

let currentDay = function (sp) {
  let today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + sp + mm + sp + dd;
};
export const fetchCreateOrder = (getOrdersValue) => (dispatch) => { //Sipariş oluştur. (Üyeliksiz)
  axios.post("http://localhost:1337/api/order-inactives", {
      data: {
        butikId: getOrdersValue.butikId,
        products: getOrdersValue.productId,
        nameSurname: getOrdersValue.username,
        phone: getOrdersValue.phone,
        address: getOrdersValue.address,
        description: getOrdersValue.desc,
        size: getOrdersValue.size,
        color: getOrdersValue.color,
        count: getOrdersValue.count,
        cargoNo:"",
        isOrderCancel:false,
        status: false, //üyeliksiz siparişlerde onay olmadan status false.
        totalPrice: getOrdersValue.price,
        orderDate: currentDay("-"),
      },
    }).then((value) => {
      axios.post("http://localhost:8080/sendMsg", {
        //Whatsapp mesaj gönder
        name: getOrdersValue.username,
        phone: parseInt(9 + getOrdersValue.phone),
        order_id: " ",
        user_id: value.data.data.id,
      });
    });
};

export const fetchCreateOrderMember = (getOrdersValue) => (dispatch) => { //Sipariş oluştur. (Üye)
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.post("http://localhost:1337/api/orders", {
      data: {
        butikId: getOrdersValue.butikId,
        products: getOrdersValue.productId,
        nameSurname: getOrdersValue.namesurname,
        phone: getOrdersValue.phone,
        address: getOrdersValue.address,
        description: getOrdersValue.desc,
        size: getOrdersValue.size,
        color: getOrdersValue.color,
        count: getOrdersValue.count,
        cargoNo:"",
        isOrderCancel:false,
        status: true, //üye siparişlerde status true.
        totalPrice: getOrdersValue.price,
        orderDate: currentDay("-"),
        userId: getOrdersValue.userId,
      },
    },config)
};

export const fetchOrderConfirm = (orderNumber,securityCode) => async (dispatch) => { //Siparişi onayla
  const orderInfo = await axios.get(`http://localhost:1337/api/order-inactives/${orderNumber}/${securityCode}`); //Önce siparişi bul.
  axios.put(`http://localhost:1337/api/order-inactives/${orderInfo.data.data.id}`, { //Sipariş ID'ye göre status'u güncelle.
    data: {
      status: true,
    },
  });
};

export const fetchOrderDetailInfo = (orderNumber,securityCode) => (dispatch) => { //Sipariş bilgilerini getir.
  axios.get(`http://localhost:1337/api/order-inactives/${orderNumber}/${securityCode}?populate=products,products.butiks`)
  .then((response) => {
      dispatch({
        type: "ORDER_DETAIL_INFO",
        payload: response.data.data
      });
    });
};

export const fetchOrderCancel = (orderId, isMember) => (dispatch) =>{ //Siparişi iptal et
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  if(isMember){ //üye ise orders tablosunda değişiklik yap token ile beraber.
    axios.put(`http://localhost:1337/api/orders/${orderId}`, {
      data: {
        isOrderCancel: true,
      },
    },config);
  }
  else{ // üye değilse order-inactives tablosunda değişiklik yap.
    axios.put(`http://localhost:1337/api/order-inactives/${orderId}`, {
      data: {
        isOrderCancel: true,
      },
    });
  }
};

export const fetchCargoInfo = () => (dispatch) => { //Kargo Takibi
  dispatch({
    type: "CARGO_INFO",
    payload: cargoInfo.value,
  });
};

export const fetchProductComments = (productId, username, userId, defaultComments, comment, rating, imageList) => async (dispatch) => { 
  debugger;
  //Ürüne Yorum Yap - Değerlendir.
  const productInfo = await axios.get(`http://localhost:1337/api/products?filters[id]=${productId}&populate=comments`);
  const isCommnet = productInfo.data.data[0].attributes.comments.some(x => x.userId == userId)
  if(isCommnet){
    const updateComment = []
    updateComment.push({
      userId:userId,
      comment_name: username,
      star: rating,
      comment:comment,
      commentImages: imageList,
    }) 
    for( var i = 0; i < defaultComments.length; i++){ 
      if ( defaultComments[i].userId === userId) { //defaultComment'te var olan userID'li yorumu sil ve güncel yorumu pushla(aşağıda)
        defaultComments.splice(i, 1); 
      }
   }
    defaultComments.push(updateComment[0])
    axios.put(`http://localhost:1337/api/products/${productId}`, {
      data: {
        comments:[
          ...defaultComments
        ]
      },
    });
  }
  else{
    axios.put(`http://localhost:1337/api/products/${productId}`, {
      data: {
        comments:[
          ...defaultComments,
          {
            userId:userId,
            comment_name: username,
            star: rating,
            comment:comment,
            commentImages: imageList,
          }
        ]
      },
    });
  }
};

//ÜYE
//Siparişlerim
export const fetchMyOrders = () => (dispatch) => { //Sipariş bilgilerini getir.
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.get(`http://localhost:1337/api/orders?populate=products.butiks,products.comments,products.comments.commentImages`, config)
  .then((response) => {
      dispatch({
        type: "MY_ORDER_LIST",
        payload: response.data.data
      });
      dispatch({
        type: "DEFAULT_MY_ORDER_LIST",
        payload: response.data.data
      });
    });
};

//Ürün yorumlarım
export const fetchUserProductComment = (productId) => (dispatch) => { //Sipariş bilgilerini getir.
  const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.get(`http://localhost:1337/api/products/userComment/${productId}?populate=comments.commentImages`, config)
  .then((response) => {
      dispatch({
        type: "USER_PRODUCT_COMMENT",
        payload: response.data
      });
    });
};