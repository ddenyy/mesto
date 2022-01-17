export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}){
    this.profileName = document.querySelector(nameSelector);
    this.profileJob = document.querySelector(jobSelector);
    this.profileAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo () {
    let profileInfo = {name: this.profileName.textContent, about: this.profileJob.textContent}
    return profileInfo;
  }

  setUserInfo (inputs) {
    this.profileName.textContent = inputs.name;
    this.profileJob.textContent = inputs.about;
    this.profileAvatar.style.backgroundImage = `url(${inputs.avatar})`;
  }

}
