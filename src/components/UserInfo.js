export default class UserInfo {
  constructor({ userName, userProfession, userImage }) {
    this._userName = userName;
    this._userProfession = userProfession;
    this._userImage = userImage;
  }

  User({name,about, avatar, cohort, _id}){
    this._name = name;
    this._profession = about;
    this._avatar = avatar;
    this._cohort = cohort
    this._id = _id;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name,
      profession: this._profession,
    }
    return userInfo;
  }

  setUserName(){
    this._userName.textContent = this._name;
  }

  setUserProfession(){
    this._userProfession.textContent = this._profession;
  }

  setuserImage(){
    this._userImage = this._avatar;
  }
}
