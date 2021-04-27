export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector(".element__like-button").addEventListener("click", (event) => {
            this._likeBtnClick(event);
        });

        this._element.querySelector(".element__delete-button").addEventListener("click", (event) => {
            this._deleteBtnClick(event);
        });

        this._element.querySelector(".element__pic").addEventListener("click", () => this._handleCardClick(this));
    }

    _likeBtnClick() {
        this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
    }

    _deleteBtnClick() {
        this._element.querySelector(".element__delete-button");
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__title').alt = this._title;
        this._element.querySelector('.element__pic').src = this._image;

        return this._element;
    }
}