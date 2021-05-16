import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup, photoImage, photoAlt) {
    super(popup);
    this._url = photoImage;
    this._title = photoAlt;
  }

  open({link, name}) {
    this._title.textContent = name;
    this._url.src = link;
    this._url.alt = name;
    super.open();
  }
}