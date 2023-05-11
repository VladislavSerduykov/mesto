export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleRemoveCard,
    handleLikeCard,
    userId
  ) {
    this._cardId = data._id;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;

    this._userId = userId;
    this._templateSelector = templateSelector;

    this._isLiked = this._checkLiked();
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__like");
    this._likesCounter = this._element.querySelector(".gallery__like-counter");
    this._cardImage = this._element.querySelector(".gallery__image");

    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = handleLikeCard;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);

    return cardElement;
  }

  hideLikeButton() {
    this._likeButton.disabled = true;
  }

  showLikeButton() {
    this._likeButton.disabled = false;
  }

  _likeCard() {
    this._handleLikeCard(this._cardId, this._isLiked);
  }

  _checkLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  setLikeCounter(likes) {
    if (likes) {
      this._likes = likes;
      this._isLiked = this._checkLiked();
    }
    this._likesCounter.textContent = this._likes.length;

    if (this._isLiked) {
      this._likeButton.classList.add("gallery__like_active");
    } else {
      this._likeButton.classList.remove("gallery__like_active");
    }
  }

  _handleRemove() {
    this._handleRemoveCard(this._cardId);
  }

  generateCard() {
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__caption").textContent = this._name;

    this.setLikeCounter();

    if (this._owner !== this._userId) {
      this._element.querySelector(".gallery__delete").remove();
    }

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__like")
      .addEventListener("click", () => this._likeCard());

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    if (this._element.querySelector(".gallery__delete")) {
      this._element
        .querySelector(".gallery__delete")
        .addEventListener("click", () => {
          this._handleRemove();
        });
    }
  }

  delete() {
    this._element.remove();
    this._element = null;
  }
}
