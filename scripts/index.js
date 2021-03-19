let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let closePopupOverlay = document.querySelector('.popup__overlay');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__input_type_name');
let aboutInput = popupForm.querySelector('.popup__input_type_about');
let nameNew = document.querySelector('.profile__title');
let aboutNew = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_visible');
    nameInput.value = nameNew.textContent;
    aboutInput.value = aboutNew.textContent;
}

function closePopup() {
    popup.classList.remove('popup_visible');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
closePopupOverlay.addEventListener('click', closePopup);


function formSubmitHandler (evt) {
  evt.preventDefault();

  nameNew.textContent = nameInput.value;
  aboutNew.textContent = aboutInput.value;
  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);


