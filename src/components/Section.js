export default class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  addItem = (element, insertMethod) => {
    if (insertMethod == 'append') {
      this._container.append(element);
    }
    else {
      this._container.prepend(element);
    }
  }

  renderCards = (cardsObject) => {
    cardsObject.array.forEach(item => {
      const objItem = {card: item, userId: cardsObject.userId, insertMethod: cardsObject.insertMethod };
      this._renderer(objItem);
    });
  }

}
