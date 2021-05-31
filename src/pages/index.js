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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
  authorization: '9d5a0019-b096-496e-ade0-699f2874ec7a',
  'Content-Type': 'application/json'
  }
})

api.getInitialCards()
  .then(data => renderList.renderItems(data))
  .catch(result => console.log(`${result} при загрузке карточек с сервера`))
 
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo(data.name, data.about, data._id)
    userInfo.setUserAvatar(data.avatar)
  })
  .catch(result => console.log(`${result} при загрузке данных профиля`))

const formEditValidator = new FormValidator(validationElements, popupFormEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationElements, popupFormAdd);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationElements, popupFormAvatar);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo(nameInput, aboutInput, profileImage);
const popupImage = new PopupWithImage(popupPic, pic, picTitle);

const popupAddForm = new PopupWithForm(popupAdd, {
  submitHandler: (data) => {
    const button = document.querySelector('.popup__button_add');
    button.textContent = 'Сохранение...';
    api.addCard(data.place, data.url)
      .then(result => {
        const element = createCard(result)
        renderList.addNewItem(element)
        popupAddForm.close()
     })
      .catch(result => console.log(`${result} при загрузке новой карточки`))
      .finally(() => { button.textContent = 'Сохранить' })
  }
});

const popupEditForm = new PopupWithForm(popupEdit, {
  submitHandler: (data) => {
    const button = document.querySelector('.popup__button_edit');
    button.textContent = 'Сохранение...';
    api.editUserInfo(data.name, data.about)
      .then(result => {
        userInfo.setUserInfo(result.name, result.about)
        popupEditForm.close()
      })
      .catch(result => console.log(`${result} при редактировании данных профиля`))
      .finally(() => { button.textContent = 'Сохранить' })
    }
});

const popupAva = new PopupWithForm(popupAvatar, {
  submitHandler: (data) => {
    const button = document.querySelector('.popup__button_avatar');
    button.textContent = 'Сохранение...';
    api.newAvatar(data.avatar)
      .then(result => {
        userInfo.setUserAvatar(result.avatar)
        popupAva.close();
      })
      .catch(result => console.log(`${result} при редактировании фото профиля`))
      .finally(() => { button.textContent = 'Сохранить' })
    }
});

const popupDel = new PopupDelete(popupDelete, {
  submitHandler: (cardId) => {
    api.deleteCard(popupDel.cardId().id)
      .then((res) => {
        card.delCard()
        popupDel.close()
      })
      .catch(result => console.log(`${result} при удалении карточки`))
    }
});

function handlePopupAvatar() {
  formAvatarValidator.clearValidationState();
  popupAva.open();
}

function handleFormSubmitPopupEdit() {
  const getProfileInfo = userInfo.getUserInfo();
  nameForm.value = getProfileInfo.name;
  aboutForm.value = getProfileInfo.about;
  formEditValidator.clearValidationState();
  popupEditForm.open();
}

function handleFormSubmitPopupAdd() {
  formAddValidator.clearValidationState();
  popupAddForm.open();
}

function createCard(item) { //ф-ция создания карточек
  const userId = userInfo.getUserId();
  const card = new Card(item, "#element-template", {//создаем экземплряр класса card, 
    //принтмаем аргументы: некий item, "ячейка", в html, в  которую новая карточка попадет, ф-ция открытия модалки с карточкой
    handleCardClick: (link, name) => {//вот тут с синтаксисом непонятно, почему с ":"
      popupImage.open({link, name});//открываем модалку с фотографией, на вход прин-ся объект, состоящий из link и name
    },
    handleCardDelete: (cardId) => {
      popupDel.open(cardId); 
    },
    handleCardLike: (card) => {
      if(card.querySelector('.element__like-button').classList.contains('element__like-button_active')) {
        api.handleDeleteLike(card.id)
        .then(result => card.removeLike())
        .catch(result => console.log(`${result} при снятии лайка`))
      }
      else {
        api.handleLikeCard(card.id)
          .then(result => card.addLike())
          .catch(result => console.log(`${result} при постановке лайка`))
        }
      }
    
    //link и name - const в классе card
  }, userId);
  const cardElement = card.generateCard();// кладем в конст результат работы ф-ции generateCard класса card для какой-то item

  return cardElement;//возвращаем полученныую конст
}

const renderList = new Section ({
  renderer: (item) => {//на вход принимает item
    const cardElement = createCard(item);//создаем карточку
    renderList.addItem(cardElement);//добавляем созданные карточки в dom(?) эл-т с селектором cardElement
  }}, '.elements'//
);


popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAva.setEventListeners();
popupDel.setEventListeners();

addBtn.addEventListener("click", handleFormSubmitPopupAdd);
editBtn.addEventListener("click", handleFormSubmitPopupEdit);
profileAvatar.addEventListener("click", handlePopupAvatar);