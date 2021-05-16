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
  
    setUserInfo(data) {
      this._name.textContent = data.name;
      this._about.textContent = data.about;
    }
}
