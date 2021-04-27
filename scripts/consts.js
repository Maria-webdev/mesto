
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

export { popupEdit,
         popupAdd,
         popupPic,
         popups,
         popup,
         closeEditBtn,
         closeAddBtn,
         closePicBtn,
         closeBtn,
         editBtn,
         addBtn,
         nameInput,
         aboutInput,
         nameForm,
         aboutForm,
         formEdit,
         formAdd,
         cardTemplate,
         elements,
         placeInput,
         linkInput
        };