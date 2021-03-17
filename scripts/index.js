let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close-button');
let closePopupOverlay = document.querySelector('.popup__overlay');
let popupForm = document.querySelector('.popup__form');
let nameInput = popupForm.querySelector('.popup__form-name');
let aboutInput = popupForm.querySelector('.popup__form-about');
let nameNew = document.querySelector('.profile__title');
let aboutNew = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_visible');
    nameInput.value = nameNew.innerText;
    aboutInput.value = aboutNew.innerText;
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

  popupForm.addEventListener('submit', closePopup);
}

popupForm.addEventListener('submit', formSubmitHandler);


