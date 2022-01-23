import Popup from "./Popup.js"


export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, callBackSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form")
    this.callBackSubmit = callBackSubmit;
    this._submitEventHandler = this._submitEventHandler.bind(this);

  }

  _submitEventHandler(evt) {
    evt.preventDefault();
    this.callBackSubmit(this._data);
  }

  setEventListeners() {
    super.setEventListeners();
  }

  open(data) {
    this._form.addEventListener("submit", this._submitEventHandler);
    this._data = data;
    super.open();
  }

  close() {
    this._form.removeEventListener("submit", this._submitEventHandler);
    super.close()
  }
}

