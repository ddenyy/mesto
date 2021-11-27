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


// функция submit для popupEditProfile
function submitFormEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

// функция открывает  попап
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// функция закрывает попап
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

// слушатель на кнопку открытия попапа редактирования профиля
popupEditProfileButton.addEventListener("click", () => {
  const formEditProfile = document.getElementsByName("edit-Profile-form")
  const config = {
    errorClass: "error-message_shown",
    inputErrorClass: "popup__input_type_error"
  };
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  checkInputValidity(formEditProfile[0], nameInput, config)
  openPopup(popupEditProfile);
});

popupCloseProfileButton.addEventListener("click", () => closePopup(popupEditProfile));

//отправка popup EditProfile
popupEditProfile.addEventListener("submit", submitFormEditProfile);

initialCards.forEach((item) => {
  return addCardPlace(item)
})

function addCardPlace(cardInfo) {
  const cardElement = createCard(cardInfo);
  placesContainer.prepend(cardElement);
}

function createCard(cardInfo) {
  const cardTemplate = document.querySelector("#place-template").content;
  const cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  cardElement.querySelector(".place__title").textContent = cardInfo.name;
  cardElement.querySelector(".place__image").src = cardInfo.link;
  cardElement.querySelector(".place__image").alt = cardInfo.name;
  deletePlaceCard(cardElement);
  togglePlaceLike(cardElement);
  openPopupPicture(cardElement);
  return cardElement
}

function openPopupPicture(element) {
  const picture = element.querySelector(".place__image");
  const text = element.querySelector(".place__title");
  picture.addEventListener("click", () => {
    popupOpenPictureItem.src = picture.src;
    popupOpenPictureItem.alt = text.textContent;
    popupOpenPictureText.textContent = text.textContent;
    openPopup(popupOpenPicture);
  })
}

// слушатель на кнопку закрытия
popupOpenPictureExitBth.addEventListener("click", () => {
  closePopup(popupOpenPicture);
})

// ф-ция открытия и закрытие всех попапов при клике на оверлей
const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach((popup) =>{
  popup.addEventListener("click", (evt)=>{
    if (evt.target === popup){
      closePopup(popup)
    }
  })
  document.querySelector(".page__container").addEventListener("keydown", (evt) =>{
    if (evt.keyCode === 27) {
      closePopup(popup)
    }
  })
});

// функция удаления карточек
function deletePlaceCard(cardElement) {
  cardElement.querySelector(".place__button-delete").addEventListener("click", () => {
    cardElement.remove();
  })
}

// функция лайка
function togglePlaceLike(cardElement) {
  cardElement.querySelector(".place__heart-button").addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__heart-button_active");
  })
}

//открытие/закрытие попапа add picture
popupAddPictureButton.addEventListener("click", () => {
  const formAddPicture = document.getElementsByName("add-card-form")
  const inactiveButtonClass = "popup__button_disabled";
  toggleButtonState(formAddPicture[0], popupCreateCardButton, inactiveButtonClass)
  openPopup(popupAddPicture)
});
popupCloseAddPictureButton.addEventListener("click", () => {
  closePopup(popupAddPicture)
});

//функция отправки формы добавления карточки
function SubmitformAddCard(evt) {
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

popupAddPicture.addEventListener("submit", SubmitformAddCard)

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".bth_type_submit",
  inactiveButtonClass: "popup__button_disabled",
  errorClass:"error-message_shown",
  inputErrorClass: "popup__input_type_error"
});


