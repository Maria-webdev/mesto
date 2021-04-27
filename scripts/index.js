
import { initialCards } from '../scripts/initial-сards.js';
import { Card  } from '../scripts/Card.js';
/*import { initialCards } from '../scripts/validate';*/


const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPic = document.querySelector('.popup-pic');
const popups = document.querySelectorAll('.popup');
const popup = document.querySelectorAll('.popup');

const closeEditBtn = document.querySelector('.popup__close-button_edit');
const closeAddBtn = document.querySelector('.popup__close-button_add');
const closePicBtn = document.querySelector('.popup__close-button_pic');
const closeBtn = document.querySelector('.popup__close-button');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('.profile__title');
const aboutInput = document.querySelector('.profile__subtitle');
const nameForm = document.querySelector('.popup__input_type_name');
const aboutForm = document.querySelector('.popup__input_type_about');

const formEdit = document.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form');

const cardTemplate = document.querySelector('#element-temlate').content;
const elements = document.querySelector('.elements');

const placeInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_URL');

function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closePopupEsc);
}

function openPopupEdit() {
  nameForm.value = nameInput.textContent;
  aboutForm.value = aboutInput.textContent;
  clearValidationState(validationElements);
  openPopup(popupEdit);
}

function openPopupAdd() {
  clearValidationState(validationElements);
  formAdd.reset();
  openPopup(popupAdd);
}

function closePopupEsc(evt) {
  if (evt.keyCode === 27) {
    const popup = document.querySelector('.popup_visible');
    closePopup(popup);
  }
}

function closePopupOverlay() {
  const popups = document.querySelectorAll('.popup');

  popups.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_visible')) {
        closePopup(item);
      }
    });
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupEsc);
}

function handleFormSubmit(evt) {
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
  formAdd.reset();
};

////////////////////////////////////////////////

//  cards


/////////////////////////////////////////////////
formAdd.addEventListener('submit', handleFormSubmitPopupAdd);

editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', openPopupAdd);

closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
closePicBtn.addEventListener('click', () => closePopup(popupPic));
closeEditBtn.addEventListener('click', () => closePopup(popupEdit));

formEdit.addEventListener('submit', handleFormSubmit);

/*createCards();*/
closePopupOverlay();