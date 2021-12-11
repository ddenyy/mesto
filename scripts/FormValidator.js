export{FormValidator};

class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
  }

  _toggleButtonState = () =>{
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._form.checkValidity();
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle(this._config.inactiveButtonClass, !isFormValid)
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _showInputError  (inputElement)  {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _checkInputValidity = (inputElement) =>{
      if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
      else {
      this._showInputError(inputElement);
    }
  }


  _setEventListeners = () =>{
    this._inputList.forEach((inputElement) =>{
      inputElement.addEventListener("input", ()=>{
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })


  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) =>{
      evt.preventDefault();
    })
    this._setEventListeners();
  }

  clearErrors () {
    this._inputList.forEach((inputElement) =>{
      const errorElements = this._form.querySelectorAll(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElements.forEach((item) =>{
        item.classList.remove(this._config.errorClass);
        item.textContent = '';
      })
    })
  }

  disableBtn () {
    this._form.
    querySelector(this._config.submitButtonSelector).
    classList.
    add(this._config.inactiveButtonClass)
  }
}
