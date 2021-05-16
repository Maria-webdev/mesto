export class Popup {
    constructor(popup) {
      this._popup = popup;
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) { 
      if (evt.key === 'Escape') { 
        this.close(this._popup); 
      } 
    } 

    setEventListeners() {
      this._popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_visible")) {
          this.close(this._popup);
        }
        if (evt.target.classList.contains('popup__close-button')) {
          this.close(this._popup);
        }
      });
    }
  }