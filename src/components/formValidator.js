export class FormValidator {
  constructor(validationElements, formElement) {
    this._form = formElement;
    this._inputList = Array.from(this._form.querySelectorAll(validationElements.inputSelector));
    this._buttonElement = this._form.querySelector(validationElements.submitButtonSelector);
    this._inactiveButtonClass = validationElements.inactiveButtonClass;
    this._errorClass = validationElements.errorClass;
    this._inputErrorClass = validationElements.inputErrorClass;
    this._errorMessageInput = validationElements.errorMessageInput;
    this._errorMessageUrl = validationElements.errorMessageUrl;
  }
  
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  
    this._setCustomError(inputElement);
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
  
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  };
  
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };
  
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState();
        this._checkInputValidity(inputElement);
      });
    });
  };
  
  enableValidation() {
    this._setEventListeners();
  };
  
  clearValidationState() {
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
    this._toggleButtonState();
  };
  
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _setCustomError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (inputElement.classList.contains("popup__input_type_URL")) {
      errorElement.textContent = this._errorMessageUrl;
    } else if (!inputElement.value.length <= 0) {
      errorElement.textContent = inputElement.validationMessage;
    } else {
      errorElement.textContent = this._errorMessageInput;
    }
  }
} 