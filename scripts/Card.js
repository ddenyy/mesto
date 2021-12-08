import {
  popupOpenPictureItem,
  popupOpenPictureText,
  popupOpenPicture,
  openPopup,
  closePopup,
  popupOpenPictureExitBth
}
from "./index.js";

class Card {

  constructor(data, cardSelector){
    this._cardSelector = cardSelector;
    this._title = data.title;
    this._image = data.image;

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }


  _fillPopupPicture() {
    popupOpenPictureItem.src = this._image;
    popupOpenPictureItem.alt = this._title.textContent;
    popupOpenPictureText.textContent = this._title.textContent;
  }

  _openPopupPicture() {
    const picture = this._element.querySelector(".place__image");
    const text = this._element.querySelector(".place__title");
    picture.addEventListener("click", () => {
      this._fillPopupPicture(picture, text);
      openPopup(popupOpenPicture);
    })
  }


  _setEventListeners() {
    // слушатель на кнопку закрытия
    popupOpenPictureExitBth.addEventListener("click", () => {
      closePopup(popupOpenPicture);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__image').src = this._image;
    this._element.querySelector('.place__image').alt = this._title;
    this._element.querySelector('.place__title').textContent = this._title;
    return this._element;
  }


}


