export default class Popup {
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector(".page");
    this._extBtn = this._popup.querySelector(".popup__button-exit")
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open () {
    this._popup.classList.add("popup_opened");
  }

  close () {
    this._popup.classList.remove("popup_opened");
    }

  _handleEscClose = (evt) =>{
    if ((evt.key === "Escape") && (this._popup.classList.contains("popup_opened"))) {
      this.close()
    }
  }

  setEventListeners () {
    this._popup.addEventListener("click", (evt) =>{
      if (evt.target === this._popup){
        this.close()
      }
    });
    this._extBtn.addEventListener("click", () =>{this.close()} )
    this._page.addEventListener("keydown", (evt)=>{this._handleEscClose(evt)})
  }
}




