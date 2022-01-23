import './index.css'
import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js"
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js"
import {
  popupEditProfileButton,
  popupAddPictureButton,
  formAddPicture,
  inputName,
  inputJob,
  configError,
  formValidators,
  profileAvatar,
  formEditAvatar,
  ButtonAcceptDelete,
  formEditProfile
} from "../utils/cosntants.js"
import features from 'core-js/features';

import Api from '../components/Api';

// класс для работы в api сервера
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '74aad7c8-f4fa-465b-9587-ab3365fadc30',
    'Content-Type': 'application/json'
  }
});

api.renderUserAndCards()
.then(([user, data]) => {
  userInfo.setUserInfo({  name: user.name, about: user.about, avatar: user.avatar});
  cardList.renderCards({ array: data, userId: user._id, insertMethod: 'append'})
})
.catch(err => console.log(err))



// попапы

// попап открытия фото на полный экран
const popupFullScrImg = new PopupWithImage(".popup_picture_fullscreen");
popupFullScrImg.setEventListeners();

// попап удаления карточки
// включаем слушателей на попап удаления карточек
const popupDeleteCard = new PopupWithConfirm(".popup_delete_card", (element) => {
  ButtonAcceptDelete.textContent = "Удаление..."
    api.deleteCard(element.data)
    .then(() => {
      element.element.remove();
      element.element = null;
    })
    .then(() => {
      popupDeleteCard.close()
    })
    .catch((err) => {`ошибка удаления карточки статус: ${err}`})
    .finally(() => {
      ButtonAcceptDelete.textContent = "Удалить";
    })
});
popupDeleteCard.setEventListeners();



// колбэк открытия попапа удаления карточки
const handleCardDelete = (element) => {
  //открой попап
  popupDeleteCard.open(element)
};


//создаем попап добавления карточек
const popupAddCard = new PopupWithForm(".popup_add_picture", (data, submitButton) => {
  // информация из импутов
  submitButton.textContent = "Добавление..."
  const dataForCard = {
    name: data["picture-name"],
    link: data["picture-link"],
  }

  api.addCard(dataForCard)
  .then(res =>  {
    cardList.addItem(createNewCard(res));
    // закрываем попап после sumbit формы.
    popupAddCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => {submitButton.textContent = "Сохранить."})
});
// ставим слушателей на попап добавления карточки
popupAddCard.setEventListeners();

// попап редактирования профиля
const popupEditProfile = new PopupWithForm(".popup_edit_profile", (data, submitButton) => {
  // объект данных из импутов
  const dataProfile = {name: data["user-name"], about: data["user-job"]};
  // обработка через api
  submitButton.textContent = "Сохранение..."
  api.updateUserInfo(dataProfile)
   .then((data) => {
    userInfo.setUserInfo(data);
   })
   .then(() => popupEditProfile.close())
   .catch(err => console.log(err.status))
   .finally(() => {submitButton.textContent = "Сохранить"})
});
popupEditProfile.setEventListeners();

// попап редактирования аватарки
const popupEditAvatar = new PopupWithForm(".popup_change_avatar", (data, submitButton) => {
  submitButton.textContent = "Сохранение..."
  api.updateUserAvatar(data["avatar-image"])
  .then(data => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    popupEditAvatar.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    submitButton.textContent = "Сохранить"
  })
});
popupEditAvatar.setEventListeners()

//=====================================================

// функция создания новой карточки
const createNewCard = (data, userId) => {
    const card = new Card(data, "#place-template", handleCardClick, handleCardDelete, userId, handleLikeSet, handleLikeDelete)
    return card.createCard()
}

// ф-ция колбэк открытия на полный экран картинки в карточке
function handleCardClick (data) {
  popupFullScrImg.open(data)
};


// колбэк постановки лайка на карточку
const handleLikeSet = (data) => {
  api.setLike(data.data)
  .then(res => {
    data.counterlikes.textContent = res.likes.length
  })
  .catch(err => console.log(err))
};

// колбэк удаления лайка на карточку
const handleLikeDelete = (data) => {
  api.deleteLike(data.data)
  .then((res) => {
    data.counterlikes.textContent = res.likes.length
  })
  .catch(err => console.log(err))
}

// класс работающий с информацией в профиле (имя и работа)
const userInfo = new UserInfo({nameSelector: ".profile__username", jobSelector:".profile__job", avatarSelector:".profile__image"});


// класс контейнера каточек
const cardList = new Section(
  {
  renderer: (data)  => {
    cardList.addItem(createNewCard(data.card, data.userId), data.insertMethod)
  }
},
".places");

// включение валидации

const enableValidation = (config) =>{
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута id у формы
    const formId = formElement.getAttribute("id");
    // в обект записываем под id формы
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(configError);

// слушатель на открытия попапа добавления карточки
popupAddPictureButton.addEventListener("click", ()=>{
  // открытие попапа добавления карточки
  popupAddCard.open();
  // деактивация кнопки попапа
  formValidators[formAddPicture.getAttribute("id")].clearErrors();
  formValidators[formAddPicture.getAttribute("id")].disableBtn();
})


// слушатель на открытие попапа редактирования профиля
popupEditProfileButton.addEventListener("click", () => {
  formValidators[formEditProfile.getAttribute("id")].clearErrors();
  formValidators[formEditProfile.getAttribute("id")].enableBth();
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().about;
  popupEditProfile.open();
})

// слушатель на открытие попапа редактирования аватара
profileAvatar.addEventListener("click", () => {
  formValidators[formEditAvatar.getAttribute("id")].clearErrors();
  popupEditAvatar.open();
})

