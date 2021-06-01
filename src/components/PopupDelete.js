import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(popup) {
    super(popup)
  }

  open(submitHandler) {
    super.open()
    this._submitHandler = submitHandler;
  } 

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    })
  }
}