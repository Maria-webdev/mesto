import { initialCards } from "../scripts/initial-сards.js";
import { popupEdit, popupAdd, popupPic, popups, popup, closeEditBtn,
         closeAddBtn, closePicBtn, closeBtn, editBtn, addBtn, nameInput,
         aboutInput, nameForm, aboutForm, formEdit, formAdd, elements,
         placeInput, linkInput, pic, picTitle } from "../scripts/consts.js";
import { Card } from "../scripts/Card.js";

function openPopup(popup) {
    popup.classList.add("popup_visible");
    document.addEventListener("keydown", closePopupEsc);
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
}

function createCard() {
    initialCards.forEach((item) => {
        const card = new Card(item, "#element-template", handleCardClick);
        const cardElement = card.generateCard();

        document.querySelector(".elements").prepend(cardElement);
    });
}

createCard();

function handleCardClick(card) {
    openPopup(popupPic);

    pic.src = card.link;
    pic.alt = card.name;
    picTitle.textContent = card.name;
}


formAdd.addEventListener("submit", handleFormSubmitPopupAdd);

editBtn.addEventListener("click", openPopupEdit);
addBtn.addEventListener("click", openPopupAdd);

closeAddBtn.addEventListener("click", () => closePopup(popupAdd));
closePicBtn.addEventListener("click", () => closePopup(popupPic));
closeEditBtn.addEventListener("click", () => closePopup(popupEdit));

formEdit.addEventListener("submit", handleFormSubmit);

closePopupOverlay();
