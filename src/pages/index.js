const addIcon = new URL('../images/add-icon.svg', import.meta.url);
const headerLogo = new URL('../images/header__logo.svg', import.meta.url);
const editButton = new URL('../images/profile/__adit-button/profile__adit-button.svg', import.meta.url);
const deleteButton = new URL('../images/element/__delete-button/element__delete-button.svg', import.meta.url);
const likeButton = new URL('../images/element/__like-button/element__like-button.svg', import.meta.url);
const closeButton = new URL('../images/popup/__close-button/popup__close-button.svg', import.meta.url);
const addButton = new URL('../images/__like-button/element__like-button.svg', import.meta.url);
const likeButtonActive = new URL('../images/profile/__add-button/profile__add-button-center.svg', import.meta.url);
const avatar = new URL('../images/profile/__avatar/profile__avatar.svg', import.meta.url);
const pic1 = new URL('../images/element/__pic/Aachen_Germany_Imperial-Cathedral.png', import.meta.url);
const pic2 = new URL('../images/element/__pic/Gartenbrunnen_der_Würzburger_Residenz.png', import.meta.url);
const pic3 = new URL('../images/element/__pic/Koelner_Dom.png', import.meta.url);
const pic4 = new URL('../images/element/__pic/Schloss_Augustusburg_Bruehl.png', import.meta.url);
const pic5 = new URL('../images/element/__pic/Speyer-Cathedral.png', import.meta.url);
const pic6 = new URL('../images/element/__pic/Trier_Porta_Nigra_BW_3.png', import.meta.url);

const iconList = [
  // меняем исходные пути на переменные
  { name: 'Add Icon', link: headerLogo },
  { name: 'Add Icon', link: editButton },
  { name: 'Add Icon', link: deleteButton },
  { name: 'Add Icon', link: likeButton },
  { name: 'Add Icon', link: closeButton },
  { name: 'Add Icon', link: addButton },
  { name: 'Add Icon', link: likeButtonActive },
  { name: 'Add Icon', link: avatar },
  { name: 'Add Icon', link: Аахен },
  { name: 'Add Icon', link: Вюрцбург },
  { name: 'Add Icon', link: Кёльн },
  { name: 'Add Icon', link: Аугсбург },
  { name: 'Add Icon', link: Шпейер },
  { name: 'Add Icon', link: Трир },
]; 

import './index.css';
import { initialCards } from "../scripts/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popups, popup, popupFormEdit, popupFormAdd, closeEditBtn, closeAddBtn,
         closePicBtn, closeBtn, editBtn, addBtn, nameInput, aboutInput, nameForm, aboutForm, formEdit, formAdd,
         elements, placeInput, linkInput, pic, picTitle, validationElements} from "../scripts/consts.js";
import { Card } from "../scripts/Card.js";
import { formValidator } from "./formValidator.js";

const formEditValidator = new formValidator(validationElements, popupFormEdit);
formEditValidator.enableValidation();
const formAddValidator = new formValidator(validationElements, popupFormAdd);
formAddValidator.enableValidation();


function openPopup(popup) {
  popup.classList.add("popup_visible");
  document.addEventListener("keydown", closePopupEsc);
}

function openPopupEdit() {
  nameForm.value = nameInput.textContent;
  aboutForm.value = aboutInput.textContent;
  formEditValidator.clearValidationState();
  openPopup(popupEdit);
}

function openPopupAdd() {
  formAddValidator.clearValidationState();
  popupFormAdd.reset();
  openPopup(popupAdd);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector(".popup_visible");
    closePopup(popup);
  }
}

function closePopupOverlay() {
  const popups = document.querySelectorAll(".popup");

  popups.forEach((item) => {
    item.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_visible")) {
        closePopup(item);
      }
    });
  });
}

function closePopup(popup) {
  popup.classList.remove("popup_visible");
  document.removeEventListener("keydown", closePopupEsc);
}

function handleFormSubmitPopupEdit(evt) {
  evt.preventDefault();

  nameInput.textContent = nameForm.value;
  aboutInput.textContent = aboutForm.value;

  closePopup(popupEdit);
}

function handleFormSubmitPopupAdd(evt) {
  evt.preventDefault();

  const placeElement = createCard({ name: placeInput.value, link: linkInput.value });

  elements.prepend(placeElement);
  closePopup(popupAdd);
  popupFormAdd.reset();
}

function createCard(item) {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function renderList() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);

    document.querySelector(".elements").append(cardElement);
  });
}

renderList();

function handleCardClick(link, name) {
  openPopup(popupPic);

  pic.src = link;
  pic.alt = name;
  picTitle.textContent = name;
}

popupFormAdd.addEventListener("submit", handleFormSubmitPopupAdd);

editBtn.addEventListener("click", openPopupEdit);
addBtn.addEventListener("click", openPopupAdd);

closeAddBtn.addEventListener("click", () => closePopup(popupAdd));
closePicBtn.addEventListener("click", () => closePopup(popupPic));
closeEditBtn.addEventListener("click", () => closePopup(popupEdit));

popupFormEdit.addEventListener("submit", handleFormSubmitPopupEdit);


closePopupOverlay();