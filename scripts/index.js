const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPic = document.querySelector('.popup-pic');

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

const formElement = document.querySelector('.popup__form');
const formAdd = popupAdd.querySelector('.popup__form');

const cardTemplate = document.querySelector('#element-temlate').content;
const elements = document.querySelector('.elements');

const placeInput = document.querySelector('.popup__input_type_place-name');
const linkInput = document.querySelector('.popup__input_type_URL');

function openPopup(popup) {
	popup.classList.add('popup_visible');
}

function openPopupEdit() {
    openPopup(popupEdit);
    nameForm.value = nameInput.textContent;
    aboutForm.value = aboutInput.textContent;
}

function closePopup(popup) {
	popup.classList.remove('popup_visible');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.textContent = nameForm.value;
    aboutInput.textContent = aboutForm.value;

    closePopup(this.closest('.popup'));
}

function formSubmitHandlerPopupAdd(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
	const placeLink = linkInput.value;
	const placeCard = { name: placeValue, link: placeLink };
	const placeElement = createCard(placeCard);

	elements.prepend(placeElement);
	closePopup(this.closest('.popup'));
	linkInput.value = '';
  placeInput.value = '';
};

function createCard(cardData) {
	const element = cardTemplate.cloneNode(true);
	const pic = document.querySelector('.popup-pic__image');
	const picTitle = document.querySelector('.popup-pic__title');

	element.querySelector('.element__title').textContent = cardData.name;
  element.querySelector('.element__pic').src = cardData.link;
  element.querySelector('.element__pic').alt = cardData.name;

	element.querySelector('.element__like-button').addEventListener('click', function(evt){
		evt.target.classList.toggle('element__like-button_active'); 
	});

  element.querySelector('.element__delete-button').addEventListener('click', function(evt){
		evt.target.closest('.element').remove();
	});

    element.querySelector('.element__pic').addEventListener('click', function(evt){
      popupPic.classList.add('popup_visible');
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

formAdd.addEventListener('submit', formSubmitHandlerPopupAdd);

editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', () => openPopup(popupAdd));

closeAddBtn.addEventListener('click', () => closePopup(popupAdd));
closePicBtn.addEventListener('click', () => closePopup(popupPic));
closeEditBtn.addEventListener('click', () => closePopup(popupEdit));

formElement.addEventListener('submit', formSubmitHandler);

createCards();