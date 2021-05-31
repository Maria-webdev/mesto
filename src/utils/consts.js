const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupPic = document.querySelector(".popup-pic");
const popupAvatar = document.querySelector(".popup_avatar");
const popupDelete = document.querySelector(".popup_delete");

const popupFormEdit = document.querySelector(".popup__form_type_edit");
const popupFormAdd = document.querySelector(".popup__form_type_add");
const popupFormAvatar = document.querySelector(".popup__form_type_avatar");

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const deleteBtn = document.querySelector(".element__delete-button");

const nameInput = document.querySelector(".profile__title");
const aboutInput = document.querySelector(".profile__subtitle");
const nameForm = document.querySelector(".popup__input_type_name");
const aboutForm = document.querySelector(".popup__input_type_about");

const pic = document.querySelector(".popup-pic__image");
const picTitle = document.querySelector(".popup-pic__title");

const profileAvatar = document.querySelector(".profile__avatar-edit-button");
const profileImage = document.querySelector(".profile__avatar");

const validationElements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  errorClass: "popup__error_visible",
  errorMessageInput: "Вы пропустили это поле.",
  errorMessageUrl: "Введите адрес сайта.",
  };

export { popupEdit, popupAdd, popupPic, popupAvatar, popupDelete, popupFormEdit, popupFormAdd, popupFormAvatar, editBtn, addBtn, deleteBtn, nameInput, aboutInput, nameForm, aboutForm,
         pic, picTitle, profileAvatar, profileImage, validationElements };
