import {Card} from "../components/Card.js"
import { FormValidation } from "../components/FormValidation.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
  arrGallery,
  formValidators,
  formElements
} from "../utils/constants.js";


// Создание новой Секции
const section = new Section(
  {items: arrGallery,renderer: createCard},
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
  section.prependItem(newCard);
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
  formValidators["save-new-gallery-element"].clearErrorInput();
});

formPopups.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});