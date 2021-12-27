import '../pages/index.css'
import {initialCards} from "./inital-cards.js";
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import PopupWithImage from "./PopupWithImage.js"
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inptName,
  inptJob
} from "./cosntants.js"

// спасибо вам за ревью! на самом деле даже странно как-то что так мало недочётов в работе)
const popupFullScrImg = new PopupWithImage(".popup_picture_fullscreen");
popupFullScrImg.setEventListeners();

// колбэк открытия на полный экран картинки в карточке
function handleCardClick (data) {
  popupFullScrImg.open(data)
};

// рендерим массив карточек в общем контейнере places
const cardList = new Section(
  {
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, "#place-template", handleCardClick)
    const cardElement = card.createCard()
    cardList.addItem(cardElement)
  }
},
".places"
)

// рендерим все карточки разом.
cardList.renderer();

//создаем попап добавления карточек
const popupAddCard = new PopupWithForm(".popup_add_picture", (evt) => {
  evt.preventDefault();
  // получаем данные из импутов
  let data = {
    name: popupAddCard._getInputValues()[0].value,
    link: popupAddCard._getInputValues()[1].value
  }
  // на основе данных импутов создаем карточку
  const newCard = new Card(data, "#place-template", handleCardClick);
  // получаем полностью готовую карточку в cardElement
  const cardElement =  newCard.createCard();
  // добавляем в секцию cardList нашу готовую карточку
  cardList.addItem(cardElement);
  // закрываем попап после sumbit формы.
  popupAddCard.close();
},
"add-picture-form"
)

// класс работающий с информацией в профиле (имя и работа)
const userInfo = new UserInfo({nameSelector: ".profile__username", jobSelector:".profile__job"});


const popupEditProfile = new PopupWithForm(".popup_edit_profile", (evt) => {
  evt.preventDefault();
  // информация из импутов
  let data = {
    name: popupEditProfile._getInputValues()[0].value,
    job: popupEditProfile._getInputValues()[1].value
  }
  userInfo.setUserInfo(data);
  popupEditProfile.close();
},
"edit-profile-form"
)

 const configError = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_submit",
  inactiveButtonClass: "popup__button_disabled",
  errorClass:"error-message_shown",
  inputErrorClass: "popup__input_type_error",
};


const formValidators ={};

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
  // ставим слушателей на попап добавления карточки
  popupAddCard.setEventListeners();
})


// слушатель на открытие попапа редактирования профиля
popupEditProfileButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  inptName.value = profileInfo.name;
  inptJob.value = profileInfo.job
  popupEditProfile.setEventListeners();
  popupEditProfile.open();
})







