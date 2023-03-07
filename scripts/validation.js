const showInputError = (selectors, formElement, inputElement, errorMessage) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectors.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(selectors.errorClass);
};

const hideInputError = (selectors, formElement, inputElement) => {
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectors.inputErrorClass);
  inputError.classList.remove(selectors.errorClass);
  inputError.textContent = "";
};

const hasValidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonForm = (selectors, inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.disabled = "";
  }
};

const isValid = (selectors, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      selectors,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
};

const setEventListeners = (selectors, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(selectors.inputSelector)
  );

  const buttonElement = formElement.querySelector(
    selectors.submitButtonSelector
  );

  toggleButtonForm(selectors, inputList, buttonElement);

  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonForm(selectors, inputList, buttonElement);
    }, 0);
  });

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(selectors, formElement, input);
      toggleButtonForm(selectors, inputList, buttonElement);
    });
  });
};

const enableValidation = (selectors) => {
  const forms = document.querySelectorAll(selectors.formSelector);

  forms.forEach((form) => {
    setEventListeners(selectors, form);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__text_type_error",
  errorClass: "popup__input-error_active",
});