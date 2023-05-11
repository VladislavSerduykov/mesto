import { Card } from "../components/Card.js";
import { FormValidation } from "../components/FormValidation.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  popupScale,
  buttonEditProfile,
  popupEdit,
  formEdit,
  buttonAddPlace,
  popupAdd,
  profileName,
  profileJob,
  gallery,
  formPopups,
  templateSelector,
  formValidators,
  formElements,
  profileImage,
  buttonEditAvatar,
  popupEditAvatar,
  popupRemoveCard,
} from "../utils/constants.js";
import { config } from "../utils/api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

let userId;

// Создание класса для взайимодействия с сервером
const api = new Api(config);

// Создание класса новой секции
const section = new Section((item) => {
  section.appendItem(createCard(item));
}, gallery);

// Создание новой карточки
const createCard = (data) => {
  const card = new Card(
    data,
    templateSelector,
    handleCardClick,
    () => {
      handleRemoveCard(card);
    },
    () => {
      handleLikeCard(card);
    },
    userId
  );

  return card.generateCard();
};
// callback-функция для удаления карточки
function handleRemoveCard(card) {
  removeCardPopup.setTarget(card);
  removeCardPopup.open();
}

// callback-функция для установки лайка карточки
function handleLikeCard(card) {
  card.hideLikeButton();

  api
    .toggleLikes(card._cardId, card._isLiked)
    .then((likes) => {
      card.setLikeCounter(likes);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      card.showLikeButton();
    });
}
// Создание класса пользователя
const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileJob,
  userImage: profileImage,
});

// Создание класса попапа с подтверждением удаления карточки
const removeCardPopup = new PopupWithConfirmation(popupRemoveCard, (card) => {
  removeCardPopup.renderLoading(true);
  api
    .deleteCard(card._cardId)
    .then(() => {
      card.delete();
      removeCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removeCardPopup.renderLoading(false);
    });
});

// Создание класса попапа с изменения аватара пользователя
const avatarEditPopup = new PopupWithForm(popupEditAvatar, (data) => {
  avatarEditPopup.renderLoading(true);
  api
    .setUserImage(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarEditPopup.close();
      avatarEditPopup.resetForm();
    })
    .catch((err) => {
      console.log(`Ошибка : ${err}`);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
});
avatarEditPopup.setEventListeners();

// Создание класса попапа с изменения информации пользователя
const profileEditPopup = new PopupWithForm(popupEdit, (data) => {
  profileEditPopup.renderLoading(true);
  api
    .changeUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileEditPopup.close();
      profileEditPopup.resetForm();
    })
    .catch((err) => {
      console.log(`Ошибка : ${err}`);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
});
profileEditPopup.setEventListeners();

// Добавление слушателей и попапа для добавления новой карточки
const popupAddPlace = new PopupWithForm(popupAdd, (data) => {
  popupAddPlace.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      section.prependItem(createCard(res));
      popupAddPlace.close();
      popupAddPlace.resetForm();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
    });
});
popupAddPlace.setEventListeners();
// Создание класса попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupScale);
popupWithImage.setEventListeners();

//callback-функция для передачи данных карточки попапу с увеличенным изображением
function handleCardClick(imageLink, imageText) {
  popupWithImage.open(imageLink, imageText);
}

Promise.all([api.getUserInfo(), api.getCardList()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    userId = res[0]._id;
    section.renderElements(res[1]);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

buttonEditProfile.addEventListener("click", () => {
  profileEditPopup.open();
  formValidators["save-name-profession"].clearInputsError();
  const userData = userInfo.getUserInfo();
  formEdit.elements.name.value = userData.name;
  formEdit.elements.profession.value = userData.about;
});

buttonAddPlace.addEventListener("click", () => {
  popupAddPlace.open();
  formValidators["save-new-gallery-element"].clearInputsError();
});

buttonEditAvatar.addEventListener("click", () => {
  avatarEditPopup.open();
});

formPopups.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});

removeCardPopup.setEventListeners();
