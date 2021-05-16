

import './index.css';
import { initialCards } from "../utils/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popups, popup, popupFormEdit, popupFormAdd, closeEditBtn, closeAddBtn,
         closePicBtn, closeBtn, editBtn, addBtn, nameInput, aboutInput, nameForm, aboutForm, formEdit, formAdd,
         elements, placeInput, linkInput, pic, picTitle, validationElements} from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { formValidator } from "../components/formValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { popup } from "../components/popup.js";
import { popupWithForm } from "../components/popupWithForm.js";
import { popupWithImage, popupWithImage } from "../components/popupWithImage.js";
import { Section } from "../components/Section.js";

const formEditValidator = new formValidator(validationElements, popupFormEdit);
formEditValidator.enableValidation();
const formAddValidator = new formValidator(validationElements, popupFormAdd);
formAddValidator.enableValidation();

const userInfo = new userInfo(nameInput, aboutInput);
const popupImage = new popupWithImage(popupPic, pic, picTitle);
const popupAddForm = new popupWithForm(popupAdd, {
  submitHandler: (data) => {
    const element = createCard({
      name: data.place,
      link: data.URL
    })
    renderList.addItem(element);
    
    popupAddForm(close);
  }

});

const popupEditForm = new popupWithForm(popupEdit, {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupEditForm.close();
  }
});

function handleFormSubmitPopupEdit() {
  const getProfileInfo = getUserInfo.getUserInfo();
  nameForm.value = getProfileInfo.name;
  aboutForm.value = getProfileInfo.caption;
  formEditValidator.clearValidationState();
  popupEditForm.open();
}

function handleFormSubmitPopupAdd() {
  formAddValidator.clearValidationState();
  popupAddForm.open();
}


function createCard(item) {
  const card = new Card(item, "#element-template", {
    handleCardClick: (link, name) => {
   popupImage.open({link, name});
    }
  });
  const cardElement = card.generateCard();

  return cardElement;
}

const renderList = new Section ({
  items: initialCards,
  renderer: (item) => {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    renderList.addItem(cardElement);
  })}}, '.elements'

);

renderList.renderItems();
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

AddBtn.addEventListener("click", handleFormSubmitPopupAdd);
EditBtn.addEventListener("click", handleFormSubmitPopupEdit);