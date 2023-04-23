import { Popup } from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageScale = this._popupSelector.querySelector(".popup__image");
    this._imageCaption = this._popupSelector.querySelector(
      ".popup__image-caption"
    );
  }

  open(imageText, imageLink) {
    this._imageScale.src = imageLink;
    this._imageScale.alt = imageText;
    this._imageCaption.textContent = imageText;
    super.open();
  }
}
