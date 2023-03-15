import {
  openPopup,
  popupScale,
  popupImage,
  popupImageCaption,
} from "./globalIndex.js";

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._image = ".gallery__image";
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
      .addEventListener("click", () => {
        this._element.remove();
        this._element = null;
      });
  }

  _setScaleListener() {
    this._element
      .querySelector(this._image)
      .addEventListener("click", () => {
        popupImage.src = this._link;
        popupImageCaption.textContent = this._name;
        popupImage.alt = this._name;
        openPopup(popupScale);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setLikeListener();
    this._setRemoveListener();
    this._setScaleListener();

    this._element.querySelector(this._image).src = this._link;
    this._element.querySelector(".gallery__caption").textContent = this._name;

    return this._element;
  }
}
