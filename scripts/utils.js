export {
  setImageClickHandler,
  popupOpenPicture,
  popupOpenPictureExitBtn,
  closePopup,
  openPopup,
}
// вся страница
const page = document.querySelector(".page");
//попап открытия картинки на fullscreen
const popupOpenPicture = document.querySelector(".popup_picture_fullscreen");
// фото из попапа fullscreen
const popupOpenPictureItem = document.querySelector(".popup__picture");
// подпись к фото из попапа fullscreen
const popupOpenPictureText = document.querySelector(".popup__picture-name");
// кнопка закрытия
const popupOpenPictureExitBtn = document.querySelector(".popup__button-exit_place_picture");


//функция заполняет подпись и картинку в попапе открытия картинки
const fillPopupPicture = (picture, text) =>{
  popupOpenPictureItem.src = picture.src;
  popupOpenPictureItem.alt = text.textContent;
  popupOpenPictureText.textContent = text.textContent;
};

function setImageClickHandler(element) {
  const picture = element.querySelector(".place__image");
  const text = element.querySelector(".place__title");
  picture.addEventListener("click", () => {
    fillPopupPicture(picture, text);
    openPopup(popupOpenPicture);
  })
}

const setExitByEsc = (evt) =>{
  if (evt.key ==="Escape") {
         closePopup(document.querySelector(".popup_opened"))
       }
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



