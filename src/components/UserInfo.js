export class UserInfo {
    constructor(name, caption) {
      this._name = name;
      this._caption = caption
    }
    
    getUserInfo() {
      const name = this._name.textContent;
      const caption = this._caption.textContent;
      return { name, caption };
    }
  
    setUserInfo(data) {
      this._name = data.name;
      this._caption = data.caption;
    }
}
