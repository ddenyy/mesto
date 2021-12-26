import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackSubmit, form){
    super(popupSelector)
    this._popup = document.querySelector(popupSelector);
    this._form = document.getElementById(form)
    this._callback = callBackSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"))
  }

  _getInputValues = () => {
    return this._inputList
  }

  setEventListeners = () => {
    super.setEventListeners()
    this._popup.addEventListener("submit", this._callback);
    this._extBtn.addEventListener("click", ()=>{this.close()});
  }

  close () {
    this._popup.classList.remove("popup_opened");
    this._inputList.forEach((input) => {
      input.value = "";
    })
  }
}
