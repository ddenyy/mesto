import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackSubmit){
    super(popupSelector)
    this._callBackSubmit = callBackSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._inputValues = {};
    this._sumbitButton =  this._popup.querySelector(".popup__button_submit")
  }

  _getInputValues = () => {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
  return this._inputValues;
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBackSubmit(this._getInputValues(), this._sumbitButton)
    });
  }

  close () {
    super.close();
    this._popup.querySelector(".popup__content").reset()
  }
}
