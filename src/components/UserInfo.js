export default class UserInfo {
  constructor({ userName, userProfession, userImage }) {
    this._userName = userName;
    this._userProfession = userProfession;
    this._userImage = userImage;
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userProfession.textContent,
      avatar: this._userImage.src,
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.about;
    this._userImage.src = data.avatar;
  }
}
