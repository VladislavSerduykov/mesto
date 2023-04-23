import { Card } from "../scripts/card.js";
import { FormValidation } from "../scripts/formValidation.js";
import Section from "../scripts/Section.js";
import "../styles/index.css";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import {
  popupScale,
  buttonEditProfile,
  popupEdit,
  formEdit,
  buttonAddPlace,
  popupAdd,
  profileName,
  profileJob,
  formAddPlace,
  gallery,
  formsPopup,
  templateSelector,
  arrGallery,
} from "../scripts/constants.js";

const formValidators = {};
const formElements = {
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__input-error_active",
};
// Создание новой Секции
const section = new Section(
  { items: arrGallery, renderer: createCard },
  gallery
);
section.renderElements();

// Создание новой карточки
function createCard(data) {
  const card = new Card(data, templateSelector, handleCardClick);

  const cardElement = card.generateCard();

  return cardElement;
}
// Получение данных о пользователе
const userInfo = new UserInfo({ name: profileName, profession: profileJob });

const profileEditPopup = new PopupWithForm(popupEdit, (data) => {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
});

profileEditPopup.setEventListeners();

// Добавление слушателей и попапа для добавления новой карточки
const popupAddPlace = new PopupWithForm(popupAdd, (data) => {
  const newCard = createCard(data);
  section.addItem(newCard);
});
popupAddPlace.setEventListeners();
// Открытие попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupScale);
popupWithImage.setEventListeners();

function handleCardClick(imageLink, imageText) {
  popupWithImage.open(imageLink, imageText);
}

buttonEditProfile.addEventListener("click", () => {
  profileEditPopup.open();
  formValidators["save-name-profession"].clearErrorInput();
  const userData = userInfo.getUserInfo();
  formEdit.elements.name.value = userData.name;
  formEdit.elements.profession.value = userData.profession;
});

buttonAddPlace.addEventListener("click", () => {
  popupAddPlace.open();
  formAddPlace.elements.name_place.value = "";
  formAddPlace.elements.link.value = "";
  formValidators["save-new-gallery-element"].clearErrorInput();
});

formsPopup.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});