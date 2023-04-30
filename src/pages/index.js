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
} from "../utils/constants.js";
import { config } from "../utils/api.js";

const api = new Api(config);
api.getUserInfo();

const section = new Section(createCard, gallery)
// Создание новой карточки
function createCard(data) {
  const card = new Card(data, templateSelector, handleCardClick);

  const cardElement = card.generateCard();

  return cardElement;
}
// Получение данных о пользователе
const userInfo = new UserInfo({
  userName: profileName,
  userProfession: profileJob,
  userImage: profileImage
});

const profileEditPopup = new PopupWithForm(popupEdit, (data) => {
  api.changeUserInfo(data).then((res) => {
    userInfo.User(res);
    userInfo.setUserName();
    userInfo.setUserProfession();
  });
  profileEditPopup.close();
});

profileEditPopup.setEventListeners();

// Добавление слушателей и попапа для добавления новой карточки
const popupAddPlace = new PopupWithForm(popupAdd, (data) => {
  api.addNewCard(data)
    .then(res => {
      section.prependItem(createCard(res))
      popupAddPlace.close()
    })
});
popupAddPlace.setEventListeners();
// Открытие попапа с увеличенным изображением
const popupWithImage = new PopupWithImage(popupScale);
popupWithImage.setEventListeners();

function handleCardClick(imageLink, imageText) {
  popupWithImage.open(imageLink, imageText);
}

Promise.all([
  api.getUserInfo(),
  api.getCardList()
])
    .then((results) => {
    userInfo.User(results[0]);
    userInfo.setUserName();
    userInfo.setUserProfession();
    userInfo.setuserImage();

    section.renderElements(results[1])
})
    .catch(err => console.error(err));

buttonEditProfile.addEventListener("click", () => {
  profileEditPopup.open();
  formValidators["save-name-profession"].clearInputsError();
  const userData = userInfo.getUserInfo();
  formEdit.elements.name.value = userData.name;
  formEdit.elements.profession.value = userData.profession;
});

buttonAddPlace.addEventListener("click", () => {
  popupAddPlace.open();
  formValidators["save-new-gallery-element"].clearInputsError();
});

formPopups.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});
