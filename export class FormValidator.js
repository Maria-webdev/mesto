export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector
        this._submitButtonSelector = config.submitButtonSelector
        this._inactiveButtonClass = config.inactiveButtonClass
        this._inputErrorClass = config.inputErrorClass
        this._errorClass = config.errorClass

        this._element = formElement
    }

    _allInputsEmpty = () => {
        //Если true - все поля пустые
        return !this._inputList.some(inputElement => inputElement.value.length > 0)
    }

    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => !inputElement.validity.valid)
    }

    activeFormButton = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass)
        this._buttonElement.removeAttribute('disabled')
    }

    inActiveFormButton = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass)
        this._buttonElement.setAttribute('disabled', true)
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList) || this._allInputsEmpty(this._inputList)) {
            this.inActiveFormButton()
        } else {
            this.activeFormButton()
        }
    }

    // функция showInputError красит поле красным и выводит ошибку
    _showInputError = (inputElement) => {
        this._errorElement = this._element.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass)
    }

    // функция hideInputError убирает красное поле и снимает ошибку
    _hideInputError = (inputElement) => {
        this._errorElement = this._element.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        this._errorElement.classList.remove(this._errorClass)
    }

    // функция checkInput проверяет валидность поля
    _checkInput = (inputElement) => {
        if (inputElement.validity.valid) { this._hideInputError(inputElement) } else { this._showInputError(inputElement) }
    }

    // функция setInputListeners навешивает обработчики на все поля формы
    _setInputListeners = () => {
        this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector)) // ищем все input
        this._buttonElement = this._element.querySelector(this._submitButtonSelector) // ищем кнопку 

        this._inputList.forEach(
            inputElement => {
                inputElement.addEventListener('input', () => {
                    this._checkInput(inputElement) // Проверить сотояние поля. Валидно ли оно?
                    this._toggleButtonState() // Переключить состояние кнопки
                })
                this._toggleButtonState()
            }
        )
    }

    enableValidation() {
        this._element.addEventListener('submit', function(event) {
            event.preventDefault()
        })

        this._setInputListeners()
    }

}

export default FormValidator