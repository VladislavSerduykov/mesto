import { openPopup } from "./index.js";

const popupZoom = document.querySelector(".popup_value_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image-caption");

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);

    return cardElement;
  }

  _setLikeListener() {
    this._element
      .querySelector(".gallery__like")
      .addEventListener("click", (evt) => {
        evt.currentTarget.classList.toggle("gallery__like_active");
      });
  }

  _setRemoveListener() {
    this._element
      .querySelector(".gallery__delete")
      .addEventListener("click", () => this._element.remove());
  }

  _setZoomListener() {
    this._element
      .querySelector(".gallery__image")
      .addEventListener("click", () => {
        popupImage.src = this._link;
        popupImageCaption.textContent = this._name;
        popupImage.alt = this._name;
        openPopup(popupZoom);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setLikeListener();
    this._setRemoveListener();
    this._setZoomListener();

    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__caption").textContent = this._name;

    return this._element;
  }
}
