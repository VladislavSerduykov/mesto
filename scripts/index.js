import { Card } from "./card.js";
import { arrGallery } from "./card.js";
import { FormValidation } from "./formValidation.js";

const editProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_value_edit");
const formEdit = document.forms["save-name-profession"];
const addElement = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup_value_add");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const formAddPlace = document.forms["save-new-gallery-element"];
const gallery = document.querySelector(".gallery");
const popups = document.querySelectorAll(".popup");
const formsPopup = document.querySelectorAll(".popup__form");

function createGallery(items) {
  items.forEach((item) => {
    const card = new Card(item, "#gallery__element");
    const cardElement = card.generateCard();

    gallery.append(cardElement);
  });
}

function addPlace(evt) {
  evt.preventDefault();

  const newCard = new Card(
    {
      name: formAddPlace.elements.link.value,
      link: formAddPlace.elements.name_place.value,
    },
    "#gallery__element"
  );
  const newCardElement = newCard.generateCard();

  gallery.prepend(newCardElement);

  evt.target.reset();

  closePopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEdit.elements.name.value;
  profileJob.textContent = formEdit.elements.profession.value;

  closePopup(popupEdit);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

editProfile.addEventListener("click", () => {
  formEdit.elements.name.value = profileName.textContent;
  formEdit.elements.profession.value = profileJob.textContent;
  openPopup(popupEdit);
});
addElement.addEventListener("click", () => openPopup(popupAdd));
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
  const validationForm = new FormValidation(
    {
      inputSelector: ".popup__text",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_inactive",
      inputErrorClass: "popup__text_type_error",
      errorClass: "popup__input-error_active",
    },
    form
  );
  validationForm.enableValidation();
});
