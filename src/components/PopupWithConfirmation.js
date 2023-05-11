import { Popup } from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._popupButton = this._form.querySelector(".popup__button_confirm");
    this._defaultButtonText = this._popupButton.textContent;
  }

  _handleFormSubmit() {
    this._handleSubmit(this._target);
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", () => this._handleFormSubmit());
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = "Удаление...";
    } else {
      this._popupButton.textContent = this._defaultButtonText;
    }
  }

  setTarget(target) {
    this._target = target;
  }
}
