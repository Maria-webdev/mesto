export class Card {
  constructor({name, link}, cardSelector, handleCardClick) {
    this._title = name;
    this._image = link;
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

    this._element.querySelector(".element__pic").addEventListener("click", () => this._handleCardClick(this._image, this._title));
  }

  _likeBtnClick(event) {
    event.currentTarget.classList.toggle("element__like-button_active");
  }

  _deleteBtnClick() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__title").textContent = this._title;
    this._element.querySelector(".element__title").alt = this._title;
    this._element.querySelector(".element__pic").src = this._image;

    return this._element;
  }
}
