export class UserInfo {
    constructor(name, about) {
      this._name = name;
      this._about = about
    }
    
    getUserInfo() {
      const name = this._name.textContent;
      const about = this._about.textContent;
      return { name, about };
    }
  
    setUserInfo(name, about) {
      this._name.textContent = name;
      this._about.textContent = about;
    }
}
