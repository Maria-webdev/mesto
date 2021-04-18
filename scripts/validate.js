const validationElements = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    errorClass: ".popup__error",
    errorMessageInput: "Вы пропустили это поле.",
    errorMessageUrl: "Введите адрес сайта."
};


const showInputError = (formElement, inputElement, validationElements) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    setCustomError(formElement, inputElement, validationElements);

    inputElement.classList.add(validationElements.inputErrorClass);
    errorElement.classList.add(validationElements.errorClass);
};

const hideInputError = (formElement, inputElement, validationElements) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    errorElement.classList.remove(validationElements.errorClass);
    inputElement.classList.remove(validationElements.inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, validationElements) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, validationElements);
    } else {
        showInputError(formElement, inputElement, validationElements);
    }
};

const setEventListeners = (formElement, validationElements) => {
    const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));
    const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            toggleButtonState(inputList, buttonElement, validationElements);
            checkInputValidity(formElement, inputElement, validationElements);
        });
    });
};

const enableValidation = (validationElements) => {
    const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => evt.preventDefault());

        setEventListeners(formElement, validationElements);
    });
};

const clearValidationState = (validationElements) => {
    const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(validationElements.inputSelector));

        inputList.forEach((inputElement) => {
            hideInputError(formElement, inputElement, validationElements);
        });
        const buttonElement = formElement.querySelector(validationElements.submitButtonSelector);

        toggleButtonState(inputList, buttonElement, validationElements);
    });
};

function toggleButtonState(inputList, buttonElement, validationElements) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", true);
        buttonElement.classList.add(validationElements.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove(validationElements.inactiveButtonClass);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function setCustomError(formElement, inputElement, validationElements) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains("popup__input_type_URL")) {
        errorElement.textContent = validationElements.errorMessageUrl;
    } else if (!inputElement.value.length <= 0) {
        errorElement.textContent = inputElement.validationMessage;
    } else {
        errorElement.textContent = validationElements.errorMessageInput;
    }
}

enableValidation(validationElements);
