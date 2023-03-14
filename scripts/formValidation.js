export class FormValidation {
  constructor(data,form) {
    this._formSelector = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = "";
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

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));

    const buttonElement = form.querySelector(this._submitButtonSelector);

    this._toggleButtonForm(inputList, buttonElement);

    form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonForm(inputList, buttonElement);
      }, 0);
    });

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(form, input);
        this._toggleButtonForm(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formSelector);
  }
}
