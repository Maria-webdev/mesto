export class Popup {
    constructor(popup) {
      this._Popup = Popup;
      this._handleEscClose = this._handleEscClose.bind(this);
      
    }
  
    open() {
      this._Popup.classList.add("popup_visible");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this._Popup.classList.remove("popup_visible");
      document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) { 
      if (evt.key === 'Escape') { 
        this.close(this._Popup); 
      } 
    } 

    setEventListeners() {
      this._Popup.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup_visible")) {
          this.close(this._Popup);
        }
        if (evt.target.classList.contains("popup_close-button")) {
          this.close(this._Popup);
        }
      });
    }
  }
