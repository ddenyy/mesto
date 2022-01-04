import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupPicture = document.querySelector(".popup__picture");
    this._popupText = document.querySelector(".popup__picture-name");
  }

  open ({link, name}) {
    super.open()
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupText.textContent = name;
  }

}


