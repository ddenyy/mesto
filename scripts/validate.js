const enableValidation = (config) =>{
  const {formSelector, ...other} = config;
  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach((formItem) =>{
    formItem.addEventListener("submit", (evt) =>{
      evt.preventDefault();
    })
    setEventListeners(formItem, other);
  })
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config);
  } else {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass, } = config;
  // Находим блок, в котором отображается ошибка.
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  // Удаляем текст ошибки из блока.
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  // Записываем текст ошибки в блок отображения ошибки.
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const setEventListeners = (formElement, config) =>{
  const {inputSelector,
   submitButtonSelector,
   inactiveButtonClass,
   errorClass,
   inputErrorClass} = config;
   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
   const buttonElement = formElement.querySelector(submitButtonSelector);
   toggleButtonState(formElement, buttonElement, inactiveButtonClass);
   inputList.forEach((inputElement) =>{
     inputElement.addEventListener("input", ()=>{
      checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
      toggleButtonState(formElement, buttonElement, inactiveButtonClass);
     })
   })
}

const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) =>{
  const isFormValid = formElement.checkValidity();
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
}



