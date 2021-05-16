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
    const cardElement = createCard(item);
    renderList.addItem(cardElement);
  }}, '.elements'
);


renderList.renderItems();
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

addBtn.addEventListener("click", handleFormSubmitPopupAdd);
editBtn.addEventListener("click", handleFormSubmitPopupEdit);