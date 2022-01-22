export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, UserID, handleLikeSet, handleLikeDelete){
    this._data = data;
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._UserID = UserID;
    this.handleCardClick = handleCardClick;
    this.handleCardDelete = handleCardDelete;
    this.handleLikeSet = handleLikeSet;
    this.handleLikeDelete = handleLikeDelete;
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
    this._likeElement = this._element.querySelector(".place__heart-quantity");
    this._likeElement.textContent = this._likes.length;
    this._likeButton = this._element.querySelector(".place__heart-button");
    this._deleteButton = this._element.querySelector(".place__button-delete");
    this._setListeners();
    // если карточка не пользователя, то возможность удалить её убирается
    if (!this._checkIsOwnerCard()) {
      this._deleteElement(this._deleteButton)
    };
    //проверка на то, поставлен ли лайк пользователем этого аккаунта
    this._isLiked();
    this._placeImage.src = this._link;
    this._placeImage.alt = this._title;
    this._element.querySelector(".place__title").textContent = this._title;
    return this._element;
  }


  _setListeners = () =>{
    // функция удаления карточек
    this._deleteButton.addEventListener("click", () => {
      this.handleCardDelete({ data: this._data, element: this._element})
    })

    // обработчик лайка
    this._likeButton.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("place__heart-button_active")) {
        this.handleLikeDelete({data:this._data, counterlikes: this._likeElement})
        evt.target.classList.remove("place__heart-button_active")
      }
      else {
        this._setLike()
      }
    })

    this._placeImage.addEventListener("click", ()=>{
      this.handleCardClick(this._data)
    });
  }

  _setLike() {
    this.handleLikeSet({data:this._data, counterlikes: this._likeElement})
    this._likeButton.classList.add("place__heart-button_active")
  }

  _deleteLike() {
  }

  _checkIsOwnerCard() {
    // undefined т.к я не передаю userId когда создаю карточку через попап добавления
    if ((this._UserID == this._data.owner._id) || (this._UserID == undefined)) {
      return true
    }
    return false
  }

  _deleteElement(element){
    element.remove();
  }

  _isLiked(){
    this._likes.forEach((user) => {
      if (user._id === this._UserID) {
        this._likeButton.classList.add("place__heart-button_active")
      }
    })
  }

}


