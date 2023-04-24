export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._handleCardClick = handleCardClick;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__image");
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
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__caption").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._setLikeListener();
    this._setRemoveListener();
    this._setScaleListener();
  }
}
