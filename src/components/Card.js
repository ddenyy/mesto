export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete){
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
  }

  _getTemplate = () =>{
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".place")
      .cloneNode(true);
    return cardElement;
  }

  createCard = () => {
    this._element = this._getTemplate();
    this._placeImage = this._element.querySelector(".place__image");
    this._setListeners();
    this._placeImage.src = this._link;
    this._placeImage.alt = this._title;
    this._element.querySelector(".place__title").textContent = this._title;
    return this._element;
  }


  _setListeners = () =>{
    // функция удаления карточек
    this._element.querySelector(".place__button-delete").addEventListener("click", () => {
      this.handleCardDelete(this._element)
    })

    // обработчик лайка
    this._element.querySelector(".place__heart-button").addEventListener("click", (evt) => {
      evt.target.classList.toggle("place__heart-button_active");
    })

    this._placeImage.addEventListener("click", ()=>{
      this.handleCardClick(this._data)
    });

  }

}


