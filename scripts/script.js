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
const formEditProfile = document.getElementsByName("edit-Profile-form")[0];
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
const formAddPicture = document.getElementsByName("add-card-form")[0];
//---------------------
//попап открытия картинки на fullscreen
const popupOpenPicture = document.querySelector(".popup_picture_fullscreen");
// фото из попапа fullscreen
const popupOpenPictureItem = document.querySelector(".popup__picture");
// подпись к фото из попапа fullscreen
const popupOpenPictureText = document.querySelector(".popup__picture-name");
// кнопка закрытия
const popupOpenPictureExitBth = document.querySelector(".popup__button-exit_place_picture");
//изображение с карточки
const placeImage = document.querySelector(".place__image");
//подпись к изображению к карточки
const placeTitle = document.querySelector(".place__title");
//--------------------
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
const page = document.querySelector(".page");
//массив всех попапов
const popups = Array.from(document.querySelectorAll('.popup'));

const setExitByEsc = (evt) =>{
  if (evt.key ==="Escape") {
         closePopup(document.querySelector(".popup_opened"))
       }
}

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
  hideInputError(formEditProfile, nameInput, {inputErrorClass: "popup__input_type_error", errorClass:"error-message_shown"});
  hideInputError(formEditProfile, jobInput, {inputErrorClass: "popup__input_type_error", errorClass:"error-message_shown"});
  disableButton(popupSaveEditProfileBtn)
  openPopup(popupEditProfile)
}

// функция открывает  попап
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  page.addEventListener("keydown", setExitByEsc);

}

// функция закрывает попап
const closePopup = (popupElement) => {
  page.removeEventListener("keydown", setExitByEsc);
  popupElement.classList.remove("popup_opened");
}


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

//функция заполняет подпись и картинку в попапе открытия картинки
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
  })
}

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

// ф-ция добавления карточки
const addCardPlace = (cardInfo) => {
  const cardElement = createCard(cardInfo);
  placesContainer.prepend(cardElement);
};

// проход по масиву карточек
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


// функция открытия попапа добавления карточки
const openPopupAddPicture = () =>{
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
  hideInputError(formAddPicture, pictureNameInput, {inputErrorClass: "popup__input_type_error", errorClass:"error-message_shown"});
  hideInputError(formAddPicture, pictureLinkInput, {inputErrorClass: "popup__input_type_error", errorClass:"error-message_shown"});
  disableButton(popupCreateCardButton);
  openPopup(popupAddPicture);
}


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
popupAddPictureButton.addEventListener("click", openPopupAddPicture);
popupCloseAddPictureButton.addEventListener("click", ()=>{closePopup(popupAddPicture)});
// слушатель на кнопку закрытия
popupOpenPictureExitBth.addEventListener("click", () => {
  closePopup(popupOpenPicture);
});
// слушатель на отрпавку формы папапа добавления карточек
popupAddPicture.addEventListener("submit", SubmitformAddCard);
// слушатель на кнопку открытия попапа редактирования профиля
popupEditProfileButton.addEventListener("click", openPopupEditProfile)
// слушатель на кнопку закрытия попапа редактирования профиля
popupCloseProfileButton.addEventListener("click", ()=>{closePopup(popupEditProfile)} );
//отправка popup EditProfile
popupEditProfile.addEventListener("submit", submitFormEditProfile);
// слушатель на кнопку закрытия
popupOpenPictureExitBth.addEventListener("click", () => {
  closePopup(popupOpenPicture);
})

