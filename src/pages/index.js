import './index.css';
import { initialCards } from "../utils/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popupFormEdit, popupFormAdd, editBtn, addBtn,
         nameInput, aboutInput, nameForm, aboutForm, pic, picTitle, validationElements} from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { formValidator } from "../components/formValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";

const formEditValidator = new formValidator(validationElements, popupFormEdit);
formEditValidator.enableValidation();
const formAddValidator = new formValidator(validationElements, popupFormAdd);
formAddValidator.enableValidation();

const userInfo = new UserInfo(nameInput, aboutInput);
const popupImage = new PopupWithImage(popupPic, pic, picTitle);

const popupAddForm = new PopupWithForm(popupAdd, {
  submitHandler: (data) => {
    const element = createCard({
      name: data.place,
      link: data.URL
    })
    renderList.addNewItem(element);
    popupAddForm.close();
  }
});

const popupEditForm = new PopupWithForm(popupEdit, {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupEditForm.close();
  }
});

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
  const card = new Card(item, "#element-template", {//создаем экземплряр класса card, 
    //принтмаем аргументы: некий item, "ячейка", в html, в  которую новая карточка попадет, ф-ция открытия модалки с карточкой
    handleCardClick: (link, name) => {//вот тут с синтаксисом непонятно, почему с ":"
      popupImage.open({link, name});//открываем модалку с фотографией, на вход прин-ся объект, состоящий из link и name
    }//link и name - const в классе card
  });
  const cardElement = card.generateCard();// кладем в конст результат работы ф-ции generateCard класса card для какой-то item

  return cardElement;//возвращаем полученныую конст
}

const renderList = new Section ({// отрисовываем первые 6 карточек
  items: initialCards,//берем items из файла initialcards
  renderer: (item) => {//на вход принимает item
    const cardElement = createCard(item);//создаем карточку
    renderList.addItem(cardElement);//добавляем созданные карточки в dom(?) эл-т с селектором cardElement
  }}, '.elements'//
);

renderList.renderItems();// вызываем ф-цию отрисовки карточек
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

addBtn.addEventListener("click", handleFormSubmitPopupAdd);
editBtn.addEventListener("click", handleFormSubmitPopupEdit);