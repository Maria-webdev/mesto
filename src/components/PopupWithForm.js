import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, { submitHandler }) {
    super(popup);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inpValue = {};
    this._inoutList = this._form.querySelectorAll(".popup__input");
    this._inputList.forEach((input) => (this.inputValue[input.name] = input.value));
    return this.inpValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
