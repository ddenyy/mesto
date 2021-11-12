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

// слушатель на кнопку открытия попапа
popupEditProfileButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupCloseProfileButton.addEventListener("click", () => closePopup(popupEditProfile));

//отправка popup EditProfile
popupEditProfile.addEventListener("submit", submitFormEditProfile);

const initialCards = [{
  name: 'Тепло',
  link: 'https://images.unsplash.com/photo-1636648207823-a09ef52fc496?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80'
},
{
  name: 'Сила',
  link: 'https://images.unsplash.com/photo-1523825086357-39d9158d4ba8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
},
{
  name: 'Мечта',
  link: 'https://images.unsplash.com/photo-1636550880539-dbf8aca1bf71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=385&q=80'
},
{
  name: 'Спокойствие',
  link: 'https://images.unsplash.com/photo-1636400397470-104101d3f4f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
},
{
  name: 'Знание',
  link: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80'
},
{
  name: 'Мир',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

initialCards.forEach((item) => {
  return addCardPlace(item.name, item.link)
})

function addCardPlace(name, link) {
  const cardElement = createCard(name, link);
  placesContainer.prepend(cardElement);
}

function createCard(name, link) {
  const cardTemplate = document.querySelector("#place-template").content;
  const cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  cardElement.querySelector(".place__title").textContent = name;
  cardElement.querySelector(".place__image").src = link;
  cardElement.querySelector(".place__image").alt = name;
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
popupAddPictureButton.addEventListener("click", () => openPopup(popupAddPicture));
popupCloseAddPictureButton.addEventListener("click", () => closePopup(popupAddPicture));

//функция отправки формы добавления карточки
function SubmitformAddCard(evt) {
  evt.preventDefault();
  addCardPlace(pictureNameInput.value, pictureLinkInput.value);
  closePopup(popupAddPicture);
  pictureNameInput.value = "";
  pictureLinkInput.value = "";
}

popupAddPicture.addEventListener("submit", SubmitformAddCard)
