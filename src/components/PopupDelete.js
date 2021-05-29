import { Popup } from "./Popup.js";

export class PopupDelete extends Popup {
  constructor(popup, {submitHandler}) {
    super(popup)
    this._submitHandler = submitHandler;
  }

  open(cardId) {
    super.open()
    this._cardId = cardId;
  }

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDafault();
      this._submitHandler();
    })
  }
}