
import {initialCards} from "./inital-cards.js";
import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
import PopupWithImage from "./PopupWithImage.js"
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");

function handleCardClick (data) {
  const popup = new PopupWithImage(".popup_picture_fullscreen", data);
  popup.setEventListeners();
  popup.open()
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
  cardList.addItem(cardElement)
  // закрываем попап после sumbit формы.
  popupAddCard.close()

},
"add-picture-form"
)

// слушатель на открытия попапа добавления карточки
popupAddPictureButton.addEventListener("click", ()=>{
  // открытие попапа добавления карточки
  popupAddCard.open()
  // форма в popupAddPicture
  const formAddPicture = document.querySelector("#add-picture-form");
// деактивация кнопки попапа
  formValidators[formAddPicture.getAttribute("id")].clearErrors()
  formValidators[formAddPicture.getAttribute("id")].disableBtn()
  // ставим слушателей на попап добавления карточки
  popupAddCard.setEventListeners()
})

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

// слушатель на открытие попапа редактирования профиля
popupEditProfileButton.addEventListener("click", () => {
  const inptName = document.querySelector("#popup-edit-username");
  const inptJob = document.querySelector("#popup-edit-job");
  const profileInfo = userInfo.getUserInfo();
  inptName.value = profileInfo.name;
  inptJob.value = profileInfo.job
  popupEditProfile.setEventListeners();
  popupEditProfile.open();

})


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
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    // получаем данные из атрибута id у формы
    const formId = formElement.getAttribute("id")
    // в обект записываем под id формы
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(configError);








