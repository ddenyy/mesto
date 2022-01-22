export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector(".page");
    this._extBtn = this._popup.querySelector(".popup__button-exit");
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open () {
    this._popup.classList.add("popup_opened");
    this._page.addEventListener("keydown", this._handleEscClose)
  }

  close () {
    this._popup.classList.remove("popup_opened");
    this._page.removeEventListener("keydown", this._handleEscClose)
    }

  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  setEventListeners () {
    this._popup.addEventListener("click", (evt) =>{
      if (evt.target === this._popup){
        this.close()
      }
    });
    this._extBtn.addEventListener("click", () =>{this.close()});
  }
}




