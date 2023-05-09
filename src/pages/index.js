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
const cards = {};

const api = new Api(config);

api.getUserInfo();

const section = new Section(createCard, gallery);
// Создание новой карточки
function createCard(data) {
  const card = new Card(
    data,
    templateSelector,
    handleCardClick,
    handleRemoveCard,
    handleLikeCard,
    userId
  );
  cards[data._id] = card;
  return card.generateCard();
}

function handleRemoveCard(cardId) {
  removeCardPopup.setTarget(cardId);
  removeCardPopup.open();
}

function handleLikeCard(cardId, isLiked) {
  cards[cardId].blockLikesButton()

  api.toggleLikes(cardId, isLiked)
    .then((likes) => {
      cards[cardId].setLikeCounter(likes)
    })
    .catch((err) => console.log(err)) 
    .finally(() => {
      cards[cardId].unlockLikeButton();
    })
}
// Получение данных о пользователе
const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileJob,
  userImage: profileImage,
});

const removeCardPopup = new PopupWithConfirmation(popupRemoveCard, (cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      cards[cardId].delete();
      removeCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removeCardPopup.renderLoading(false);
    });
});
removeCardPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm(popupEditAvatar, (data) => {
  avatarEditPopup.renderLoading(true);
  api
    .setUserImage(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка : ${err}`);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false);
    });
});

const profileEditPopup = new PopupWithForm(popupEdit, (data) => {
  profileEditPopup.renderLoading(true);
  api
    .changeUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileEditPopup.close();
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
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddPlace.renderLoading(false);
    });
});
popupAddPlace.setEventListeners();
// Открытие попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupScale);
popupWithImage.setEventListeners();

//Открывает попап с увеличенным изображением и устанавливает нужное описание
function handleCardClick(imageLink, imageText) {
  popupWithImage.open(imageLink, imageText);
}

Promise.all([api.getUserInfo(), api.getCardList()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    userId = res[0]._id;
    section.renderElements(res[1]);
  })
  .catch((err) => console.error(err));

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

avatarEditPopup.setEventListeners();
buttonEditAvatar.addEventListener("click", () => {
  avatarEditPopup.open();
});

formPopups.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});
