// попап edit profile
const popupEditProfile = document.querySelector(".popup_edit_profile");
// input name and job
const nameInput = document.querySelector("#popup-edit-username");
const jobInput = document.querySelector("#popup-edit-job");
// кнопка закрытия попапа edit profile
const popupCloseProfileButton = document.querySelector(".popup__button-exit_place_edit-form");
//попап add picture
const popupAddPicture = document.querySelector(".popup_add_picture");
// input названия фото
const pictureNameInput = document.querySelector("#popup-picture-name");
// input ссылки на фото
const pictureLinkInput = document.querySelector("#popup-picture-link");
//кнопка закрытия попапа addPicture в попапе
const popupCloseAddPictureButton = document.querySelector(".popup__button-exit_place_add-form");
//кнопка создания карточки
const popupCreateCardButton = document.querySelector(".popup__button_create_card");
//попап открытия картинки на fullscreen
const popupOpenPicture = document.querySelector(".popup_picture_fullscreen");
// фото из попапа fullscreen
const popupOpenPictureItem = document.querySelector(".popup__picture");
// подпись к фото из попапа fullscreen
const popupOpenPictureText = document.querySelector(".popup__picture-name");
// кнопка закрытия
const popupOpenPictureExitBth = document.querySelector(".popup__button-exit_place_picture");
//имя и работа profile
const profileName = document.querySelector(".profile__username");
const profileJob = document.querySelector(".profile__job");
//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");
// блок places
const placesContainer = document.querySelector(".places");
// вся страница
const page = document.querySelector(".page__container");
//массив всех попапов
const popups = Array.from(document.querySelectorAll('.popup'));
//изображение с карточки
const placeImage = document.querySelector(".place__image");
//подпись к изображению к карточки
const placeTitle = document.querySelector(".place__title");


// функция submit для popupEditProfile
const submitFormEditProfile = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

// функция открывает  попап
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
}

// функция закрывает попап
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
}

//-----
const setEscEditProfile = (evt) =>{
  if (evt.key ==="Escape") {
    closePopup(popupEditProfile)
  }
}

const checkValidityEditProfile = () =>{
  const formEditProfile = document.getElementsByName("edit-Profile-form")
  const config = {
    errorClass: "error-message_shown",
    inputErrorClass: "popup__input_type_error"
  };
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  checkInputValidity(formEditProfile[0], nameInput, config)
}

const openPopupEditProfile = () =>{
  checkValidityEditProfile();
  page.addEventListener("keydown", setEscEditProfile);
  openPopup(popupEditProfile);
}

const closePopupEditProfile = () =>{
  closePopup(popupEditProfile)
  page.removeEventListener("keydown", setEscEditProfile);
}
//-----

// функция удаления карточек
const deletePlaceCard = (cardElement) => {
  cardElement.querySelector(".place__button-delete").addEventListener("click", () => {
    cardElement.remove();
  })
};

// функция лайка
const togglePlaceLike = (cardElement) => {
  cardElement.querySelector(".place__heart-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__heart-button_active");
  })
};

const setEscPopupPicture = (evt) =>{
  if (evt.key ==="Escape") {
    closePopup(popupOpenPicture)
  }
};

const fillPopupPicture = (picture, text) =>{
  popupOpenPictureItem.src = picture.src;
  popupOpenPictureItem.alt = text.textContent;
  popupOpenPictureText.textContent = text.textContent;
};

function openPopupPicture(element) {
  const picture = element.querySelector(".place__image");
  const text = element.querySelector(".place__title");
  picture.addEventListener("click", () => {
    fillPopupPicture(picture, text);
    openPopup(popupOpenPicture);
    page.addEventListener("keydown", setEscPopupPicture)
  })
}

// слушатель на кнопку закрытия
popupOpenPictureExitBth.addEventListener("click", () => {
  closePopup(popupOpenPicture);
  page.removeEventListener("keydown", setEscPopupPicture)
})


const createCard = (cardInfo) => {
  const cardTemplate = document.querySelector("#place-template").content;
  const cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  cardElement.querySelector(".place__title").textContent = cardInfo.name;
  cardElement.querySelector(".place__image").src = cardInfo.link;
  cardElement.querySelector(".place__image").alt = cardInfo.name;
  deletePlaceCard(cardElement);
  togglePlaceLike(cardElement);
  openPopupPicture(cardElement);
  return cardElement
};

const addCardPlace = (cardInfo) => {
  const cardElement = createCard(cardInfo);
  placesContainer.prepend(cardElement);
};

initialCards.forEach((item) => {
  return addCardPlace(item);
});

// проход по всем попапам и ставим им закрытие по оверлею.
popups.forEach((popup) =>{
  popup.addEventListener("click", (evt)=>{
    if (evt.target === popup){
      closePopup(popup)
    }
  })
});

//-------------------------
const setEscAddPicture = (evt) =>{
  if (evt.key ==="Escape") {
    closePopup(popupAddPicture)
  }
};
const checkValidityAddPicture = () =>{
  const config = {
    errorClass: "error-message_shown",
    inputErrorClass: "popup__input_type_error"
  };
  const formAddPicture = document.getElementsByName("add-card-form")
  const inactiveButtonClass = "popup__button_disabled";
  toggleButtonState(formAddPicture[0], popupCreateCardButton, inactiveButtonClass);
  hideInputError(formAddPicture[0], pictureNameInput, config);
  hideInputError(formAddPicture[0], pictureLinkInput, config);
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
};
const openAddPicture = () =>{
  page.addEventListener("keydown", setEscAddPicture);
  checkValidityAddPicture();
  openPopup(popupAddPicture);
};
const closeAddPicture = () =>{
  page.removeEventListener("keydown", setEscAddPicture);
  closePopup(popupAddPicture);
};
//--------------------------

//функция отправки формы добавления карточки
const SubmitformAddCard = (evt) => {
  evt.preventDefault();
  const nameInput = pictureNameInput.value;
  const linkInput = pictureLinkInput.value;
  let inputs = {
    name: nameInput,
    link: linkInput
  }
  addCardPlace(inputs);
  closePopup(popupAddPicture);
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_submit",
  inactiveButtonClass: "popup__button_disabled",
  errorClass:"error-message_shown",
  inputErrorClass: "popup__input_type_error"
});


//открытие/закрытие попапа add picture
popupAddPictureButton.addEventListener("click",  openAddPicture);
popupCloseAddPictureButton.addEventListener("click", closeAddPicture);
// слушатель на кнопку закрытия
popupOpenPictureExitBth.addEventListener("click", () => {
  closePopup(popupOpenPicture);
});
// слушатель на отрпавку формы папапа добавления карточек
popupAddPicture.addEventListener("submit", SubmitformAddCard);
// слушатель на кнопку открытия попапа редактирования профиля
popupEditProfileButton.addEventListener("click", openPopupEditProfile)
// слушатель на кнопку закрытия попапа редактирования профиля
popupCloseProfileButton.addEventListener("click", closePopupEditProfile);
//отправка popup EditProfile
popupEditProfile.addEventListener("submit", submitFormEditProfile);


