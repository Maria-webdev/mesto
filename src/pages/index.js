
//импортируем переменные и классы
import './index.css';
import { initialCards } from "../utils/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popupAvatar, popupDelete, popupFormEdit, popupFormAdd, popupFormAvatar, editBtn, addBtn, deleteBtn,
         nameInput, aboutInput, nameForm, aboutForm, pic, picTitle, profileAvatar, profileImage, validationElements} from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { Api } from "../components/Api.js";
import { PopupDelete } from "../components/PopupDelete.js";

const api = new Api({//создаем экз класса
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',//адрес, к которому обращаемся
  headers: {//заголовок запроса состоит из
  authorization: '9d5a0019-b096-496e-ade0-699f2874ec7a',//мой токен 0лдя авторизации
  'Content-Type': 'application/json'//тип данных
  }
})

Promise.all([api.getUserInfo(), api.getInitialCards()])//отправляем на сервер  запросы, параметры: методы класса api с сохраненными данными пользователя и карточек
  .then(([profileInfo, cards]) => {//если запрос прошел норм, в качестве ркзультата должны вернуться 2 объекта(?), у первого мы берем 4 параметра: имя, "о", id, аватар
    userInfo.setUserInfo(profileInfo.name, profileInfo.about, profileInfo._id)//вызываем метод сохранения данных пользователя  класса userinfo, на вход принимаем первы3 параметра
    userInfo.setUserAvatar(profileInfo.avatar)//ввызываем метод сохранения аватара кдасса userinfo
    renderList.renderItems(cards)//вызываем метод класса section, принимаем на вход полученные от сервера cards
  })
  .catch(result => console.log(`${result} при загрузке данных с сервера`))//если что-то пошло не так, то выводим в консоль сообщение об ошибке 


const formEditValidator = new FormValidator(validationElements, popupFormEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationElements, popupFormAdd);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationElements, popupFormAvatar);//создаем экз классв ФормВАлидвтор
formAvatarValidator.enableValidation();//высываем метод enableValodation класса formValidator

const userInfo = new UserInfo(nameInput, aboutInput, profileImage);//создаем новый экз класса UserInfo
const popupImage = new PopupWithImage(popupPic, pic, picTitle);//создаем новый экз класса PopupWithImage

const popupAddForm = new PopupWithForm(popupAdd, {//создаем новый экз класса PopupWithForm, принимаем в качестве параметров попап с добавлением карточек и ф-цию submithandler
  submitHandler: (data) => {//обраотчик события сабмит, параметр на вход - data
    const button = document.querySelector('.popup__button_add');//находим кнопку доавления
    button.textContent = 'Сохранение...';//указывает текст кнопки после сабмита
    api.addCard(data.place, data.url)//вызываем метод addcard класса api, параметры на вход: параметры place и url (находим по name в разметке html) объекта data
      .then(result => {//в случае, если все ок, получаем result
        const element = createCard(result)//создаем карточку, на вход принимаем полученный в ответе от сервера result
        renderList.addNewItem(element)//вызываем метож addNewItem класса Section
        popupAddForm.close()//вызываем метод close класса Popup
     })
      .catch(result => console.log(`${result} при загрузке новой карточки`))//текст огибки в случае,если не ок
      .finally(() => { button.textContent = 'Сохранить' })//независмо от ответа сервера меняем текст кнопки
  }
});
//аналогично popupAddForm
const popupEditForm = new PopupWithForm(popupEdit, {//
  submitHandler: (data) => {//
    const button = document.querySelector('.popup__button_edit');//
    button.textContent = 'Сохранение...';//
    api.editUserInfo(data.name, data.about)//
      .then(result => {//
        userInfo.setUserInfo(result.name, result.about)//на вход принимаем параметры name и about (находим по name в разметке html) полученного объектра result
        popupEditForm.close()//
      })
      .catch(result => console.log(`${result} при редактировании данных профиля`))//
      .finally(() => { button.textContent = 'Сохранить' })//
    }
});
//аналогично popupAddForm
const popupAva = new PopupWithForm(popupAvatar, {//
  submitHandler: (data) => {//
    const button = document.querySelector('.popup__button_avatar');//
    button.textContent = 'Сохранение...';//
    api.newAvatar(data.avatar)//
      .then(result => {//
        userInfo.setUserAvatar(result.avatar)//на вход принимаем параметр avatar (находим по name в разметке html) полученного объектра result
        popupAva.close();//
      })
      .catch(result => console.log(`${result} при редактировании фото профиля`))//
      .finally(() => { button.textContent = 'Сохранить' })//
    }
});

const popupDel = new PopupDelete(popupDelete);//создаем новый экз класса PopupDelete

function handlePopupAvatar() {//создаем ф-цию обработчик нажатия на  кнопку редактировать аватар
  formAvatarValidator.clearValidationState();//вызываем метод clearValidationState класса FormValidator
  popupAva.open();//вызываем метод open класса popup
}

function handleFormSubmitPopupEdit() {//создаем ф-цию обработчик нажатия на  кнопку редактировать
  const getProfileInfo = userInfo.getUserInfo();//
  nameForm.value = getProfileInfo.name;//сохраняем введенный в поле с тегом name="name" (в разметке Html ) в поле nameform(в consts)
  aboutForm.value = getProfileInfo.about;//сохраняем введенный в поле с тегом name="about" (в разметке Html ) в поле aboutform(в consts)
  formEditValidator.clearValidationState();//вызываем метод clearValidationState класса FormValidator
  p
  opupEditForm.open();//вызываем метод open класса popup
}
//аналогично handlePopupAvatar
function handleFormSubmitPopupAdd() {//
  formAddValidator.clearValidationState();//
  popupAddForm.open();//
}

function createCard(item) { //ф-ция создания карточек
  const userId = userInfo.getUserId();//создаем экз метода getUserId класса userInfo
  const card = new Card(item, "#element-template", {//создаем экземплряр класса card, принимаем в качестве параметров item, "ячейку", в html, в  которую новая карточка попадет,, методы handleCardClick, handleCardDelete, handleCardLike,  userId
    handleCardClick: (link, name) => {//обработчик нажатия на картинку
      popupImage.open({link, name});//открываем модалку с фотографией, на вход прин-ся объект, состоящий из link и name
    },
    handleCardDelete: (cardId) => {//обработчик нажатия на корзину, принимаем карточку как параметр
      popupDel.open(() => {//открываем попап с удалением
        api.deleteCard(cardId.id)//отправляем на сервер запрос на удаление карточки, принимаем на фход id карточки
          .then(() => {//в соучае ок ответа от сервера
            card.delCard();//вызываем метод delCard класса card
            popupDel.close();//закрываем попап
          })
          .catch(result => console.log(`${result} при удалении карточки`))//текст огибки, ечли ответ сервера не ок
      })
    },
    handleCardLike: (cardId) => {//люработчик нажатия на лайн, принимаем карточку как параметр
      if(cardId.querySelector('.element__like-button').classList.contains('element__like-button_active')) {//если  эл-т с селектором element__like-button содержит так же селектор element__like-button_active, т.е. если наш Like уже активен
        api.handleDeleteLike(cardId.id)//вызываем метод handleDeleteLike класса api, в качестве параметра принимаем карточку, отправляем запрос на сервер
        .then(result => card.removeLike(cardId, result))//в случае поучения норм ответа от сервера удаляем лайк
        .catch(result => console.log(`${result} при снятии лайка`))//иначе выдаем текст ошибки
      }
      else {
        api.handleLikeCard(cardId.id)//вызываем метод handleLikeCard класса api, в качестве параметра принимаем карточку, отправляем запрос на сервер
          .then(result => card.addLike(cardId, result))///в случае поучения норм ответа от сервера ставим карточку
          .catch(result => console.log(`${result} при постановке лайка`))//иначе выдаем текст ошибки
        }
      }
    
    //link и name - const в классе card
  }, userId);
  const cardElement = card.generateCard();// кладем в конст результат работы ф-ции generateCard класса card для какой-то item

  return cardElement;//возвращаем полученныую конст
}

const renderList = new Section ({//создаем новый экз класса Section, принимаем в кач параметов метод renderer, '.elements'
  renderer: (item) => {//на вход принимает item
    const cardElement = createCard(item);//создаем карточку
    renderList.addItem(cardElement);//добавляем созданные карточки в dom(?) эл-т с селектором cardElement
  }}, '.elements'//
);

//вызываем методы классов
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAva.setEventListeners();
popupDel.setEventListeners();

//вешаем соушатели
addBtn.addEventListener("click", handleFormSubmitPopupAdd);
editBtn.addEventListener("click", handleFormSubmitPopupEdit);
profileAvatar.addEventListener("click", handlePopupAvatar);
