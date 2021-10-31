// Находим форму в DOM
let formElement = document.querySelector(".popup"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__username"); // Воспользуйтесь инструментом .querySelector()

let jobInput = document.querySelector(".popup__description"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  let textJobInput = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value

  let textNameInput = nameInput.value;

  let profileName = document.querySelector(".profile__username"); // Выберите элементы, куда должны быть вставлены значения полей

  let profileDescription = document.querySelector(".profile__description");

  profileName.textContent = textNameInput;

  profileDescription.textContent = textJobInput;

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

const popupEditProfileButton = document.querySelector(".edit-button");

const popupCloseProfileButton = document.querySelector(".popup__button-exit");

const popupSaveProfileButton = document.querySelector(".popup__button");

function openformElement() {
  formElement.classList.remove("hidden");
}

function closeformElement() {
  formElement.classList.add("hidden");
}

popupEditProfileButton.addEventListener("click", openformElement);

popupCloseProfileButton.addEventListener("click", closeformElement);

popupSaveProfileButton.addEventListener("click", closeformElement);
