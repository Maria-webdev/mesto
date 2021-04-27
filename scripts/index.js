import { initialCards } from '../scripts/initial-сards.js';
import * as all from '../scripts/consts.js';
import { Card } from '../scripts/Card.js';
/*import { initialCards } from '../scripts/validate';*/


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

function createCards() {
initialCards.forEach((item) => {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();

  document.querySelector('.elements').prepend(cardElement);
})
};
createCards();


function handleCardClick(card) {
  openPopup(popupPic);
}
/*
/*
function createCard(cardData) { 
	const element = cardTemplate.cloneNode(true); 
	const pic = document.querySelector('.popup-pic__image'); 
	const picTitle = document.querySelector('.popup-pic__title'); 
 
	element.querySelector('.element__title').textContent = cardData.name; 
  element.querySelector('.element__pic').src = cardData.link; 
  element.querySelector('.element__pic').alt = cardData.name; 
 
    element.querySelector('.element__pic').addEventListener('click', function(evt){ 
      openPopup(popupPic); 
      pic.src = evt.target.src; 
      pic.alt = cardData.name; 
      picTitle.textContent = cardData.name; 
    }); 
 
	return element; 
} 
 
function createCards() { 
  initialCards.forEach((element) => { 
    elements.append(createCard(element)) 
  }) 
  
} 
*/

formAdd.addEventListener('submit', handleFormSubmitPopupAdd);

editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', openPopupAdd);

closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
closePicBtn.addEventListener('click', () => closePopup(popupPic));
closeEditBtn.addEventListener('click', () => closePopup(popupEdit));

formEdit.addEventListener('submit', handleFormSubmit);

/*createCards();*/
closePopupOverlay();