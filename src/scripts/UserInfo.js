export default class UserInfo {
  constructor({nameSelector, jobSelector}){
    this.profileName = document.querySelector(nameSelector);
    this.profileJob = document.querySelector(jobSelector);
  }

  getUserInfo () {
    let profileInfo = {name: this.profileName.textContent, job: this.profileJob.textContent}
    return profileInfo;
  }

  setUserInfo (inputs) {
    this.profileName.textContent = inputs.name;
    this.profileJob.textContent = inputs.job;
  }

}
