import './index.css'
import {initialCards} from "../components/inital-cards.js";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js"
import {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inputName,
  inputJob,
  configError,
  formValidators,
  profileAvatar,
  formEditAvatar,
  ButtonAcceptDelete,
} from "../utils/cosntants.js"
import features from 'core-js/features';

import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '74aad7c8-f4fa-465b-9587-ab3365fadc30',
    'Content-Type': 'application/json'
  }
});

// рендер карточек
api.getInitialCards()
.then( res => {
  cardList.renderCards(res)
})
.catch((err) => {console.log(err.status)})

// рендер профиля
api.getUserInfo()
.then(info => {
 const profile = {
    name: info.name,
    about: info.about,
    avatar: info.avatar
  }
  userInfo.setUserInfo(profile)
})
.catch(err => {console.log(err)})


// функция создания новой карточки
const createNewCard = (data) => {
  const card = new Card(data, "#place-template", handleCardClick, handleCardDelete)
  return card.createCard()
}

// попап открытия фото на полный экран
const popupFullScrImg = new PopupWithImage(".popup_picture_fullscreen");
popupFullScrImg.setEventListeners();

// ф-ция колбэк открытия на полный экран картинки в карточке
function handleCardClick (data) {
  popupFullScrImg.open(data)
};

// попап удаления карточки
// включаем слушателей на попап удаления карточек
const popupDeleteCard = new Popup(".popup_delete_card")
popupDeleteCard.setEventListeners();

// колбэк открытия попапа удаления карточки
const handleCardDelete = (element) => {
  //открой попап
  popupDeleteCard.open()
  ButtonAcceptDelete.addEventListener("click", ()=>{
    element.remove()
    popupDeleteCard.close()
  })
}

// контейнер каточек
const cardList = new Section(
  {
  renderer: (data)  => {
    cardList.addItem(createNewCard(data))
  }
},
".places");


//создаем попап добавления карточек
const popupAddCard = new PopupWithForm(".popup_add_picture", (data) => {
  // информация из импутов
  const dataForCard = {
    name: data["picture-name"],
    link: data["picture-link"]
  }
  // добавляем в секцию cardList нашу готовую карточку
  cardList.addItem(createNewCard(dataForCard));
  // закрываем попап после sumbit формы.
  popupAddCard.close();
});
// ставим слушателей на попап добавления карточки
popupAddCard.setEventListeners();

// класс работающий с информацией в профиле (имя и работа)
const userInfo = new UserInfo({nameSelector: ".profile__username", jobSelector:".profile__job", avatarSelector:".profile__image"});


const popupEditProfile = new PopupWithForm(".popup_edit_profile", (data) => {
  // объект данных из импутов
  const dataProfile = {name: data["user-name"], about: data["user-job"]};
  // обработка через api
  api.updateUserInfo(dataProfile)
   .then((res) => {
     return res.json()
   })
   .then((data) => {
    userInfo.setUserInfo(data);
    console.log(data)
   })
   .catch(err => console.log(err.status))
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

// попап редактирования аватарки
const popupEditAvatar = new PopupWithForm(".popup_change_avatar", (data) => {
  //profileAvatar.style.backgroundImage = `url(${data["avatar-image"]})`;
  api.updateUserAvatar(data["avatar-image"])
  .then((res) => {
   return res
  })
  .then(data => {
   console.log(data)
  })
  popupEditAvatar.close();
});

popupEditAvatar.setEventListeners()

// включение валидации

const enableValidation = (config) =>{
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута id у формы
    const formId = formElement.getAttribute("id");
    // в обект записываем под id формы
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(configError);

// слушатель на открытия попапа добавления карточки
popupAddPictureButton.addEventListener("click", ()=>{
  // открытие попапа добавления карточки
  popupAddCard.open();
  // деактивация кнопки попапа
  formValidators[formAddPicture.getAttribute("id")].clearErrors();
  formValidators[formAddPicture.getAttribute("id")].disableBtn();
})


// слушатель на открытие попапа редактирования профиля
popupEditProfileButton.addEventListener("click", () => {
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().about;
  popupEditProfile.open();
})

// слушатель на открытие попапа редактирования аватара
profileAvatar.addEventListener("click", () => {
  formValidators[formEditAvatar.getAttribute("id")].clearErrors();
  popupEditAvatar.open();
})

