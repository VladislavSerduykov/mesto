import { Popup } from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._popupButton = this._form.querySelector(".popup__button_confirm");
    this._defaultButtonText = this._popupButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", () =>
      this._handleSubmit(this._target)
    );
  }

  setTarget(target) {
    this._target = target;
  }
}
