import { Card } from "./card.js";
import { FormValidation } from "./formValidation.js";
import { openPopup, closeByEscape } from "./constants.js";
const buttonEditProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_value_edit");
const formEdit = document.forms["save-name-profession"];
const buttonAddPlace = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup_value_add");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const formAddPlace = document.forms["save-new-gallery-element"];
const gallery = document.querySelector(".gallery");
const popups = document.querySelectorAll(".popup");
const formsPopup = document.querySelectorAll(".popup__form");
const arrGallery = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const formValidators = {};
const formElements = {
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__input-error_active",
};
function createGallery(items) {
  items.forEach((item) => {
    const card = createCard(item, "#gallery__element");

    gallery.append(card);
  });
}

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);

  const cardElement = card.generateCard();

  return cardElement;
}

function addPlace(evt) {
  evt.preventDefault();

  const newCard = createCard(
    {
      name: formAddPlace.elements.link.value,
      link: formAddPlace.elements.name_place.value,
    },
    "#gallery__element"
  );

  gallery.prepend(newCard);

  evt.target.reset();

  closePopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEdit.elements.name.value;
  profileJob.textContent = formEdit.elements.profession.value;

  closePopup(popupEdit);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

buttonEditProfile.addEventListener("click", () => {
  formValidators["save-name-profession"].clearErrorInput();

  formEdit.elements.name.value = profileName.textContent;
  formEdit.elements.profession.value = profileJob.textContent;
  openPopup(popupEdit);
});
buttonAddPlace.addEventListener("click", () => {
  formAddPlace.elements.name_place.value = "";
  formAddPlace.elements.link.value = "";
  formValidators["save-new-gallery-element"].clearErrorInput();
  openPopup(popupAdd);
});
formEdit.addEventListener("submit", handleProfileFormSubmit);
formAddPlace.addEventListener("submit", addPlace);
createGallery(arrGallery);
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

formsPopup.forEach((form) => {
  const validationForm = new FormValidation(formElements, form);
  formValidators[form.getAttribute("name")] = validationForm;
  validationForm.enableValidation();
});
