import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, {image, name}){
    super(popupSelector);
    this._image = image;
    this._name = name;
    this._popupPicture = document.querySelector(".popup__picture");
    this._popupText = document.querySelector(".popup__picture-name");
  }

  open () {
    super.open()
    this._popupPicture.src = this._image;
    this._popupPicture.alt = this._name;
    this._popupText.textContent = this._name;
  }

}


