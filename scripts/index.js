const editProfile = document.querySelector(".profile__edit");
const popupEdit = document.querySelector(".popup_value_edit");
const formEdit = document.forms["save-name-profession"];
const addElement = document.querySelector(".profile__add");
const popupAdd = document.querySelector(".popup_value_add");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");
const formAddPlace = document.forms["save-new-gallery-element"];
const addPlaceButton = document.querySelector(".popup__button_add");
const gallery = document.querySelector(".gallery");
const popupZoom = document.querySelector(".popup_value_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image-caption");
const articleTemplate = document.querySelector("#gallery__element").content;
const popups = document.querySelectorAll(".popup");

function createGallery(items) {
  items.forEach((item) => {
    const card = createCard(item.link, item.name);
    gallery.append(card);
  });
}

function createCard(image, name) {
  const articleElement = articleTemplate
    .querySelector(".gallery__element")
    .cloneNode(true);
  const articleImage = articleElement.querySelector(".gallery__image");
  articleImage.src = image;
  articleElement.querySelector(".gallery__caption").textContent = name;
  articleImage.alt = name;
  articleElement
    .querySelector(".gallery__like")
    .addEventListener("click", (evt) =>
      evt.currentTarget.classList.toggle("gallery__like_active")
    );
  articleElement
    .querySelector(".gallery__delete")
    .addEventListener("click", () => articleElement.remove());
  articleImage.addEventListener("click", () => {
    popupImage.src = image;
    popupImageCaption.textContent = name;
    popupImage.alt = name;
    openPopup(popupZoom);
  });

  return articleElement;
}

function addPlace(evt) {
  evt.preventDefault();

  const newCard = createCard(
    formAddPlace.elements.link.value,
    formAddPlace.elements.name_place.value
  );

  gallery.prepend(newCard);

  if (evt.key === "Enter") {
    closePopup(popupAdd);
  }
  closePopup(popupAdd);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEdit.elements.name.value;
  profileJob.textContent = formEdit.elements.profession.value;

  if (evt.key === "Enter") {
    closePopup(popupEdit);
  }
  closePopup(popupEdit);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

createGallery(arrGallery);
editProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
addElement.addEventListener("click", () => openPopup(popupAdd));
formEdit.addEventListener("submit", handleProfileFormSubmit);
formAddPlace.addEventListener("submit", addPlace);

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