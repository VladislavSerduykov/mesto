import { Popup } from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBack) {
    super(popupSelector);
    this._callBack = callBack;
    this._form = this._popup.querySelector(".popup__form");
    this._formInputs = Array.from(this._form.querySelectorAll(".popup__text"));
  }

  _getInputValues() {
    const inputList = {};
    this._formInputs.forEach((input) => {
      inputList[input.name] = input.value;
    });
    return inputList;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBack(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}
