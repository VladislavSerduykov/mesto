const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage) => {

    const inputError = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(selectors.inputErrorClass)
    inputError.textContent = errorMessage;
    inputError.classList.add(selectors.errorClass)
}

const hideInputError = (formElement, inputElement) => {

    const inputError = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove(selectors.inputErrorClass)
    inputError.classList.remove(selectors.errorClass)
    inputError.textContent = '';
}

const hasValidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    })
}

const toggleButtonForm = (inputList, buttonElement) => {
    if(hasValidInput(inputList)){
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
        buttonElement.disabled = '';
    }
}

const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage)
    }else {
        hideInputError(formElement, inputElement)
    }
}

const setEventListeners = (formElement) => {
 
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))

    const buttonElement = formElement.querySelector(selectors.submitButtonSelector)

    toggleButtonForm(inputList,buttonElement)

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(formElement, input)
            toggleButtonForm(inputList,buttonElement)
        })
    })
}

const enableValidation  = (selectors) => {
    const forms = document.querySelectorAll(selectors.formSelector)

    forms.forEach((form) => {
        setEventListeners(form);
    })
}

enableValidation (selectors);