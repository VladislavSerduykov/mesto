export default class UserInfo {
  constructor({ name, profession }) {
    this._name = name;
    this._profession = profession;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      profession: this._profession.textContent,
    };
    return userInfo;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._profession.textContent = userInfo.profession;
  }
}
