// попап edit profile
let popupEditProfile = document.querySelector(".popup_edit-profile");
// input name and job
let nameInput = document.querySelector("#popup-edit-username");
let jobInput = document.querySelector("#popup-edit-job");
// кнопка закрытия попапа edit profile
const popupCloseProfileButton = document.querySelector(".popup__button-exit_edit-form");

//попап add picture
let popupAddPicture = document.querySelector(".popup_add-picture");
// input названия фото
let pictureNameInput = document.querySelector("#popup-picture-name");

// input ссылки на фото
let pictureLinkInput = document.querySelector("#popup-picture-link");
//кнопка закрытия попапа addPicture в попапе
const popupCloseAddPictureButton = document.querySelector(".popup__button-exit_add-picture-form");
//кнопка создания карточки
const popupCreateCardButton = document.querySelector(".popup__button_create-card");

//попап открытия картинки на fullscreen
let popupOpenPicture = document.querySelector(".popup_open-picture")

//имя и работа profile
let profileName = document.querySelector(".profile__username");
let profileJob = document.querySelector(".profile__job");

//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");

// блок places
const placesContainer = document.querySelector(".places");


// функция открывает  попап
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}


// функция закрывает попап
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}


// функция submit для popupEditProfile
function formSubmitHandlerEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile)
}

//отправка в popup EditProfile
popupEditProfile.addEventListener("submit", formSubmitHandlerEditProfile);

popupEditProfileButton.addEventListener("click", ()=> {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

popupCloseProfileButton.addEventListener("click", ()=>closePopup(popupEditProfile));

//--------------------------

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addCardPlace (name, link) {
  const cardTemplate = document.querySelector("#place-template").content;
  const cardElement = cardTemplate.querySelector(".place").cloneNode(true);
  cardElement.querySelector(".place__title").textContent = name;
  cardElement.querySelector(".place__image").src = link;
  placesContainer.prepend(cardElement);

  cardElement.querySelector(".place__heart-button").addEventListener("click", function(evt){
    evt.target.classList.toggle("place__heart-button_active");
  })

  return cardElement
}

for (let i = 0; i < initialCards.length; i++){
  addCardPlace(initialCards[i].name, initialCards[i].link)
}

//открытие/закрытие попапа add picture
popupAddPictureButton.addEventListener("click", ()=>openPopup(popupAddPicture));
popupCloseAddPictureButton.addEventListener("click", ()=>closePopup(popupAddPicture))

function formSubmitAddCard(evt) {
  evt.preventDefault();
  addCardPlace(pictureNameInput.value, pictureLinkInput.value);
  closePopup(popupAddPicture);
}

popupAddPicture.addEventListener("submit", formSubmitAddCard)









