export {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inptName,
  inptJob
};
//кнопка откытия попапа editProfile в профиле на основной странице
const popupEditProfileButton = document.querySelector(".profile__edit-button");
//кнопка открытия попапа addPicture в профиле на основной странице
const popupAddPictureButton = document.querySelector(".profile__add-button");
// форма в popupAddPicture
const formAddPicture = document.querySelector("#add-picture-form");
// импуты в форме редактирования профиля
const inptName = document.querySelector("#popup-edit-username");
const inptJob = document.querySelector("#popup-edit-job");
