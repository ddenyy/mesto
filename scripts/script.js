let formElement = document.querySelector(".popup");
let nameInput = document.getElementById("popupEditUsername");
let jobInput = document.getElementById("popupEditJob");
let profileName = document.querySelector(".profile__username");
let profileJob = document.querySelector(".profile__job");
const popupEditProfileButton = document.querySelector(".profile__edit-button");
const popupCloseProfileButton = document.querySelector(".popup__button-exit");

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeformElement();
}

function openformElement() {
  formElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeformElement() {
  formElement.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);
popupEditProfileButton.addEventListener("click", openformElement);
popupCloseProfileButton.addEventListener("click", closeformElement);
