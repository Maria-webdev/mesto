export class UserInfo {
    constructor() {}
  
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