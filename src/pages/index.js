

import './index.css';
import { initialCards } from "../utils/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popups, popup, popupFormEdit, popupFormAdd, closeEditBtn, closeAddBtn,
         closePicBtn, closeBtn, editBtn, addBtn, nameInput, aboutInput, nameForm, aboutForm, formEdit, formAdd,
         elements, placeInput, linkInput, pic, picTitle, validationElements} from "../utils/consts.js";
import { Card } from "../components/Card.js";
import { formValidator } from "../components/formValidator.js";

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