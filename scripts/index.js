const initialCards = [
  {
    name: 'Аахен',
    link: src='images/element/__pic/Aachen_Germany_Imperial-Cathedral.png'
  },
  {
    name: 'Вюрцбург',
    link: src='images/element/__pic/Gartenbrunnen_der_Würzburger_Residenz.png'
  },
  {
    name: 'Кёльн',
    link: src='images/element/__pic/Koelner_Dom.png'
  },
  {
    name: 'Аугсбург',
    link: src='images/element/__pic/Schloss_Augustusburg_Bruehl.png'
  },
  {
    name: 'Шпейер',
    link: src='images/element/__pic/Speyer-Cathedral.png'
  },
  {
    name: 'Трир',
    link: src='images/element/__pic/Trier_Porta_Nigra_BW_3.png'
  }
]; 

const popupEdit = document.querySelector('.popup__edit-profile');
const popupAdd = document.querySelector('.popup__add-new');
const popupPic = document.querySelector('.popup-pic');

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
  popup.classList.remove('popup-pic_visible');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.textContent = nameForm.value;
    aboutInput.textContent = aboutForm.value;

    closePopup(this.closest('.popup'));
}

function formSubmitHandlerPopupAdd(evt) {
  evt.preventDefault();

	const placeInput = document.querySelector('.popup__input_type_place-name');
	const placeValue = placeInput.value;
	const linkInput = document.querySelector('.popup__input_type_URL');
	const placeLink = linkInput.value;
	const arr = { name: placeValue, link: placeLink };
	const placeElement = createCard(arr);

	elements.prepend(placeElement);
	closePopup(this.closest('.popup'));
	linkInput.value = '', placeInput.value = '';
};

formAdd.addEventListener('submit', formSubmitHandlerPopupAdd);

editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', function(){ openPopup(popupAdd) });

popupAdd.querySelector('.popup__close-button').addEventListener('click', function(){ closePopup(this.closest('.popup')) });
popupPic.querySelector('.popup__close-button').addEventListener('click', function(){ closePopup(this.closest('.popup')) });

closeBtn.addEventListener('click', function(){ closePopup(this.closest('.popup')) });

formElement.addEventListener('submit', formSubmitHandler);

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
      popupPic.classList.add('popup-pic_visible');
      pic.src = evt.target.src;
      pic.alt = cardData.name;
      picTitle.textContent = cardData.name;
    });

	return element;
}

function createCards(){
	const placeElements = document.createDocumentFragment();

	initialCards.forEach(function (element, index) {
		placeElements.appendChild(createCard(element));
	});

	elements.append(placeElements);
}
createCards();