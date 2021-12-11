export{Card}

 class Card {
  constructor(data, cardSelector, instruction){
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._instruction = instruction;
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
    this._setListeners();
    this._instruction(this._element)
    this._element.querySelector(".place__image").src = this._image;
    this._element.querySelector(".place__image").alt = this._title;
    this._element.querySelector(".place__title").textContent = this._title;
    return this._element;
  }


  _setListeners = () =>{
    // функция удаления карточек
    this._element.querySelector(".place__button-delete").addEventListener("click", () => {
      this._element.remove();
    })

    // обработчик лайка
    this._element.querySelector(".place__heart-button").addEventListener("click", (evt) => {
      evt.target.classList.toggle("place__heart-button_active");
    })

  }

}



