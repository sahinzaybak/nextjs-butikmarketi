import axios from "axios";

//Whatsapp onay mesajı gönder
export const confirmForSendWhatsappMessage = (_nameSurname,_phone,_user_id,_user_token) => (dispatch) => {
	const config = {headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
	axios.put(`http://localhost:8080/sendMemberConfirm`, {//üyeliği onayla
	  name: _nameSurname,
	  phone:_phone,
	  user_id:_user_id,
	  user_token:localStorage.getItem("userToken"),
	  config,
	});
  };

//Onay kodunu onayla ve üyeliği aktif et (status => true)
export const userMemberConfirm = (_confirmCode, _userId,_nameSurname,_phone,_address) => (dispatch) => {
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
  axios.get("http://localhost:1337/api/users/me", config).then((value) => {//Önce wp mesajla vt'ye kaydedilen onay kodunu bi al.
    const getConfirmCode = value.data.confirmCode;
    if (getConfirmCode == _confirmCode) { //vt'deki onay kodu ile bizimkisi uyuyorsa
      axios.put(`http://localhost:1337/api/users/${_userId}`, { //bilgileri ekle ve üyeliği onayla
		nameSurname:_nameSurname,
		phone:_phone,
		address:_address,
        status: true,
        config,
      }).then(value => {
		axios.get("http://localhost:1337/api/users/me", config).then(value => {
		dispatch({
			type: "AUTH_INFO",
			payload: value.data
		  })
		})
	  });
    }
  });
};

//Kullanıcı bilgilerini düzenlesin.
export const userInfoUpdate = (_userId,_nameSurname,_address) => (dispatch) => {
	const config = { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}`}};
	axios.put(`http://localhost:1337/api/users/${_userId}`, {
		nameSurname:_nameSurname,
		address:_address,
		config,
	}).then(value => {
		axios.get("http://localhost:1337/api/users/me", config).then(value => {
		dispatch({
			type: "AUTH_INFO",
			payload: value.data
		  })
		})
	  });
  };


  
