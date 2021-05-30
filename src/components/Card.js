export class Card { //создает шаблок карточки и сами карточки
  constructor({name, link, likes, owner, _id}, cardSelector, {handleCardClick, handleCardDelete, handleCardLike}, userId) {//принимаем название фотографии, ссылку на нее, 
    this._title = name; //вот "наш" name
    this._image = link;// "Наш" link
    this._cardSelector = cardSelector;//селектор шаблона карточки
    this._handleCardClick = handleCardClick;//ф-ция открытия модалки(?)
    this._element = this._getTemplate();//сохраняем пустой шаблон
    this._likes = likes;
    this._owner = owner._id;
    this._userId = userId;
    this._likesCounter = this._element.querySelector('.element__count');
    this._openPopupDelete = handleCardDelete;
    this._toggleLike = handleCardLike;
    this._id = _id;
  }

  _getTemplate() {//создаем шаблон карточки
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    //находим пустой шаблок карточки и копируем его

    return cardElement;//возвращаем рез
  }

  _setEventListeners() { // вешаем слушатели на карточки
    this._element.querySelector(".element__like-button").addEventListener("click", (event) => {
      this._likeBtnClick();//если случился клик в карточке по кнопке с с селектором .element__like-button'
      //то выполняем ф-цию this._likeBtnClick
    });

    this._element.querySelector(".element__delete-button").addEventListener("click", (event) => {
      this._deleteBtnClick();//аналоично лайкам
    });

    this._element.querySelector(".element__pic").addEventListener("click", () => this._handleCardClick(this._image, this._title));
  //если случился клиу по модалке, открываем ее
  }

  _likeBtnClick() {//меняем класс лайка, есди кнопку лайк нажали
    this._toggleLike(this._element);
  }

  _deleteBtnClick() {
    this._openPopupDelete(this._element)
  }

  generateCard() {
    this._setEventListeners();//применяем  слушатели
    this._likesCounter.textContent = this._likes.length;
    if(this._userId === this._owner) {
      this._element.querySelector('.element__delete-button').classList.add('element__delete-button_active');
    }
    this._likes.forEach(like => {
      if(like._id === this._userId) {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
      }
    })
    this._element.id = this._id;
    this._element.querySelector(".element__title").textContent = this._title; //сохраняем в текст контент карточки 
    //в "ячейку" с селектором element__title сохраняем title
    this._element.querySelector(".element__title").alt = this._title;
    //аналогично
    this._element.querySelector(".element__pic").src = this._image; //link
    //аналогично

    return this._element;//возвращаем рез
  }
}
