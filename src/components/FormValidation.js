export class FormValidation {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputLists = Array.from(form.querySelectorAll(this._inputSelector));
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hasValidInput() {
    return this._inputLists.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonForm() {
    if (this._hasValidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = "";
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  clearInputsError() {
    this._inputLists.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _setEventListeners() {
    this._toggleButtonForm();

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonForm();
      }, 0);
    });

    this._inputLists.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonForm();
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._form);
  }
}
