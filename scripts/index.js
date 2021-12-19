
import { initialCards } from "./inital-cards.js";
import {Card} from "./Card.js"
import {
  popupOpenPicture,
  popupOpenPictureExitBtn,
  closePopup,
  openPopup,
  setImageClickHandler
} from "./utils.js"
import {FormValidator} from "./FormValidator.js"
//----------------------
// попап edit profile
const popupEditProfile = document.querySelector(".popup_edit_profile");
// input name and job
const nameInput = document.querySelector("#popup-edit-username");
const jobInput = document.querySelector("#popup-edit-job");
// кнопка сохранения изменений в профиле
const popupSaveEditProfileBtn = document.querySelector(".popup__button_update_profile")
// кнопка закрытия попапа edit profile
const popupCloseProfileButton = document.querySelector(".popup__button-exit_place_edit-form");
//форма изменения профиля
const formEditProfile = document.querySelector("#edit-Profile-form");
//---------------------
//попап add picture
const popupAddPicture = document.querySelector(".popup_add_picture");
// input названия фото
const pictureNameInput = document.querySelector("#popup-picture-name");
// input ссылки на фото
const pictureLinkInput = document.querySelector("#popup-picture-link");
// кнопка сохранения изменений имени/занятий в профиле
//кнопка закрытия попапа addPicture в попапе
const popupCloseAddPictureButton = document.querySelector(".popup__button-exit_place_add-form");
//кнопка создания карточки
const popupCreateCardButton = document.querySelector(".popup__button_create_card");
// форма добавления карточки
const formAddPicture = document.querySelector("#add-card-form");
//имя и работа profile
const profileName = document.querySelector(".profile__username");
const profileJob = document.querySelector(".profile__job");
//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");

const placesContainer = document.querySelector(".places");


// функция submit для popupEditProfile
const submitFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

// открыть попап редактора профиля
const openPopupEditProfile =() =>{
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidators[formEditProfile.getAttribute("id")].clearErrors();
  formValidators[formEditProfile.getAttribute("id")].disableBtn();
  openPopup(popupEditProfile)
}


// инструкция к добавлению карточки. чтобы открыть попап на фулскрин
const instruction = (...args) =>{ setImageClickHandler(...args)}

//ф-ция создания карточки
const createCard = (data) =>{
  const card = new Card(data, "#place-template", instruction)
  return card.createCard()
}

// ф-ция добавления карточки
const addCardPlace = (cardData) => {
  const cardElement = createCard(cardData);
  placesContainer.prepend(cardElement);
};

// проход по масиву карточек
initialCards.reverse().forEach((item) => {
  return addCardPlace(item);
});

// функция открытия попапа добавления карточки
const openPopupAddPicture = () =>{
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
  formValidators[formAddPicture.getAttribute("id")].clearErrors()
  formValidators[formAddPicture.getAttribute("id")].disableBtn()
  openPopup(popupAddPicture);
}


//функция отправки формы добавления карточки
const submitformAddCard = (evt) => {
  evt.preventDefault();
  const cardName = pictureNameInput.value;
  const cardLink = pictureLinkInput.value;
  let inputs = {
    name: cardName,
    link: cardLink
  }
  addCardPlace(inputs);
  closePopup(popupAddPicture);
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
}

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

//открытие/закрытие попапа add picture
popupAddPictureButton.addEventListener("click", openPopupAddPicture);
popupCloseAddPictureButton.addEventListener("click", ()=>{closePopup(popupAddPicture)});
// слушатель на кнопку закрытия
popupOpenPictureExitBtn.addEventListener("click", () => {closePopup(popupOpenPicture);});
// слушатель на отрпавку формы папапа добавления карточек
popupAddPicture.addEventListener("submit", submitformAddCard);
// слушатель на кнопку открытия попапа редактирования профиля
popupEditProfileButton.addEventListener("click", openPopupEditProfile)
// слушатель на кнопку закрытия попапа редактирования профиля
popupCloseProfileButton.addEventListener("click", ()=>{closePopup(popupEditProfile)} );
//отправка popup EditProfile
popupEditProfile.addEventListener("submit", submitFormEditProfile);







