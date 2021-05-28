export class UserInfo {
    constructor(name, about, avatar) {
      this._name = name;
      this._about = about;
      this._avatar = avatar;
    }
    
    getUserInfo() {
      const name = this._name.textContent;
      const about = this._about.textContent;
      const id = this._id;
      return { name, about, id };
    }
  
    setUserInfo(name, about, id) {
      this._name.textContent = name;
      this._about.textContent = about;
      this._id = id;
    }

    setUserAvatar(link) {
      this._avatar.src = link;
    }

    getUserId() {
      return this._id;
    }
}
