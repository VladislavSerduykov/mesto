export class FormValidation {
  constructor(data, form) {
    this._formSelector = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
    this._buttonElement = form.querySelector(this._submitButtonSelector);
  }

  _showInputError(form, inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    form.querySelector(`.${inputElement.id}-error`).textContent = errorMessage;
    form
      .querySelector(`.${inputElement.id}-error`)
      .classList.add(this._errorClass);
  }

  _hideInputError(form, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    form
      .querySelector(`.${inputElement.id}-error`)
      .classList.remove(this._errorClass);
    form.querySelector(`.${inputElement.id}-error`).textContent = "";
  }

  _hasValidInput(inputlist) {
    return inputlist.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonForm(inputList, buttonElement) {
    if (this._hasValidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = "";
    }
  }

  _isValid(form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  _clearErrorInput(formElement, inputList) {
    inputList.forEach((input) => {
      this._hideInputError(formElement, input);
    });
  }

  _setEventListeners(form) {
    this._toggleButtonForm(this._inputList, this._buttonElement);

    form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonForm(this._inputList, this._buttonElement);
      }, 0);
    });

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(form, input);
        this._toggleButtonForm(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formSelector);
  }
}
