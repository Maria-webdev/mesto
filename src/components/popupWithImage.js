import { popup } from "../components/popup.js";

export class popupWithImage extends popup {
  constructor(popup, photoImage, photoAlt) {
    super(popup);
    this._text = photoImage;
    this._link = photoAlt;
  }

  open(link, text) {
    super.open();
    this._text.textContent = text;
    this._link.src = link;
    this._link.alt = text;
  }
}