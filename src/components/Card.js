export class Card {
  constructor(
    { name, link, likes, owner, _id},
    templateSelector,
    handleCardClick,
    userId
  ) {
    this._id = _id;
    this._owner = owner;
    this._likes = likes;
    this._userId = userId;
    this._name = name;
    this._handleCardClick = handleCardClick;
    this._link = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__image");
    this._likeButton = this._element.querySelector(".gallery__like");
    this._likesCounter = this._element.querySelector('.gallery__like-counter')
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

  blockLikesButton() {
    this._likeButton.disabled = true;
  }

  unlockLikeButton(){
    this._likeButton.disabled = false;
  }

  _setRemoveListener() {
    this._element
      .querySelector(".gallery__delete")
      .addEventListener("click", () => {
        this.deleteCard()
      });
  }

  _checkLiked(){
    return this._likes.some(user => user._id === this._userId)
  }

  setLikeCounter(likes){
    if(likes){
      this._likes = likes;
      this._isLiked = this._checkLiked()
    }
    this._likesCounter.textContent = this._likes.length;

    if(this._isLiked) {
      this._likeButton.classList.add('.gallery__like_active')
    } else {
      this._likeButton.classList.remove('.gallery__like_active')
    }
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

    if (this._owner._id !== this._userId) {
      this._element.querySelector(".gallery__delete").remove();
    }

    return this._element;
  }

  _setEventListeners() {
    this._setLikeListener();
    this._setRemoveListener();
    this._setScaleListener();
  }

  deleteCard(){
    this._element.remove();
    this._element = null;
  }
}
