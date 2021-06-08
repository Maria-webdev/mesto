export class Card { //создает шаблок карточки и сами карточки
  constructor({name, link, likes, owner, _id}, cardSelector, {handleCardClick, handleCardDelete, handleCardLike}, userId) {//принимаем название фотографии, ссылку на нее, 
    this._title = name; //вот "наш" name
    this._image = link;// "Наш" link
    this._cardSelector = cardSelector;//селектор шаблона карточки
    this._handleCardClick = handleCardClick;//ф-ция открытия модалки(?)
    this._element = this._getTemplate();//сохраняем пустой шаблон
    this._likes = likes;//лайки
    this._owner = owner._id;//id владельца карточки, тооо, кто добавио её
    this._userId = userId;//id пользователя 
    this._likesCounter = this._element.querySelector('.element__count');//счетчик лайков
    this._openPopupDelete = handleCardDelete;//обработчик нажатия на крпзину
    this._toggleLike = handleCardLike;//обработчик нажатия на лайк
    this._id = _id;//id карточки
  }

  _getTemplate() {//создаем шаблон карточки
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);//находим пустой шаблок карточки и копируем его

    return cardElement;//возвращаем рез
  }

  _setEventListeners() { // вешаем слушатели на карточки
    this._element.querySelector(".element__like-button").addEventListener("click", (event) => {//если случился клик в карточке по кнопке с с селектором .element__like-button'
      this._likeBtnClick(); //то вызываем приватныйметод this._likeBtnClick
    });

    //аналоично лайкам
    this._element.querySelector(".element__delete-button").addEventListener("click", (event) => {//
      this._deleteBtnClick();
    });

    this._element.querySelector(".element__pic").addEventListener("click", () => this._handleCardClick(this._image, this._title));//если случился клиу по модалке, открываем ее с нашими name и link
  }

  _likeBtnClick() {//меняем класс лайка, есди кнопку лайк нажали
    this._toggleLike(this._element);//
  }

  _deleteBtnClick() {//приватный метод, обработчик нажатия на корзину
    this._openPopupDelete(this._element);//открываем попап с удалением
  }

  generateCard() {//публичный метод создания карточки
    this._setEventListeners();//применяем  слушатели, вызываем приватный метод
    this._likesCounter.textContent = this._likes.length;//записываем в эл-т с селектором .element__count текст, равный длине массива лайков
    if(this._userId === this._owner) {//если id пользователя и владельца карточки совпадают
      this._element.querySelector('.element__delete-button').classList.add('element__delete-button_active');//то добавляем элементу с селектором element__delete-button селектор element__delete-button_active
    }
    this._likes.forEach(like => {//для каждого эл-та массива лайков
      if(like._id === this._userId) {//если id  лайка и id юзера совпадают
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');//то добавляем эл=ту с селектором element__like-button селектор element__like-button_active
      }
    })
    this._element.id = this._id;//хаписываем _id в _element.id
    this._element.querySelector(".element__title").textContent = this._title; //сохраняем в текст контент карточки 
    //в "ячейку" с селектором element__title сохраняем title
    this._element.querySelector(".element__pic").alt = this._title;//
    //аналогично
    this._element.querySelector(".element__pic").src = this._image; //
    //аналогично

    return this._element;//возвращаем рез
  }

  removeLike(card, result) {//публичный метод удаления лайков, принимаем ка параметр card( только я ее не использую, зачем тогда в параметры записываю?) и result из ответа от сервера
    this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');//у эл=та с селектором element__like-button удаляем селектор element__like-button_active
    this._element.querySelector('.element__count').textContent = result.likes.length;//в текст эл-та с селектором element__count записываем длину массива с лайками (после возрашения результата с сервера)
  }

  addLike(card, result) {//аналогично removeLike
    this._element.querySelector('.element__like-button').classList.add('element__like-button_active');//
    this._element.querySelector('.element__count').textContent = result.likes.length;//
  }
  
  delCard(card) {//публичный метод удаления карточки
    this._element.remove();//полностью удаляем карточку (this._getTemplate())
  }

}
