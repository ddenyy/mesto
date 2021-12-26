 export {
//   setImageClickHandler,
//   popupOpenPicture,
//   popupOpenPictureExitBtn,
   closePopup,
   openPopup,
 }
// вся страница
const page = document.querySelector(".page");
//попап открытия картинки на fullscreen
const popupOpenPicture = document.querySelector(".popup_picture_fullscreen");
// фото из попапа fullscreen
const popupOpenPictureImage = document.querySelector(".popup__picture");
// подпись к фото из попапа fullscreen
const popupOpenPictureText = document.querySelector(".popup__picture-name");
// кнопка закрытия
const popupOpenPictureExitBtn = document.querySelector(".popup__button-exit_place_picture");


// function setImageClickHandler(name, link) {
//   popupOpenPictureImage.src = link;
//   popupOpenPictureImage.alt = name;
//   popupOpenPictureText.textContent = name;
//   openPopup(popupOpenPicture);
// }

// const setExitByEsc = (evt) =>{
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector(".popup_opened"))
//   }
// }

// функция открывает  попап
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_opened");
  }


// функция закрывает попап
const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_opened");
}



