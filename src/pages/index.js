import './index.css'
import {initialCards} from "../components/inital-cards.js";
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inputName,
  inputJob,
  configError,
  formValidators
} from "../utils/cosntants.js"


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
".places");

// рендерим все карточки разом.
cardList.renderer();

//создаем попап добавления карточек
const popupAddCard = new PopupWithForm(".popup_add_picture", (data) => {
  // информация из импутов
  //const inputValues = popupAddCard._getInputValues();
  const dataForCard = {
    name: data["picture-name"],
    link: data["picture-link"]
  }
  // на основе данных импутов создаем карточку
  const newCard = new Card(dataForCard, "#place-template", handleCardClick).createCard();
  // добавляем в секцию cardList нашу готовую карточку
  cardList.addItem(newCard);
  // закрываем попап после sumbit формы.
  popupAddCard.close();
});
// ставим слушателей на попап добавления карточки
popupAddCard.setEventListeners();

// класс работающий с информацией в профиле (имя и работа)
const userInfo = new UserInfo({nameSelector: ".profile__username", jobSelector:".profile__job"});


const popupEditProfile = new PopupWithForm(".popup_edit_profile", (evt) => {
  evt.preventDefault();
  // информация из импутов
  const inputValues = popupEditProfile._getInputValues();
  debugger
  const data = {
    name: inputValues["user-name"],
    job: inputValues["user-job"]
  }
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});

popupEditProfile.setEventListeners();

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
  inputJob.value = userInfo.getUserInfo().job;
  popupEditProfile.open();
})






