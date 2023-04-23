export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._link = data.link;
    this._image = ".gallery__image";
    this._templateSelector = templateSelector;
    this._cardImage = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);

    return cardElement;
  }

  _setLikeListener() {
    this._cardImage
      .querySelector(".gallery__like")
      .addEventListener("click", (evt) => {
        evt.currentTarget.classList.toggle("gallery__like_active");
      });
  }

  _setRemoveListener() {
    this._cardImage
      .querySelector(".gallery__delete")
      .addEventListener("click", () => {
        this._cardImage.remove();
        this._cardImage = null;
      });
  }

  _setScaleListener() {
    this._cardImage.querySelector(this._image).addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.querySelector(this._image).src = this._link;
    this._cardImage.querySelector(this._image).alt = this._name;
    this._cardImage.querySelector(".gallery__caption").textContent = this._name;

    return this._cardImage;
  }

  _setEventListeners() {
    this._setLikeListener();
    this._setRemoveListener();
    this._setScaleListener();
  }
}
