import { action, observable } from 'mobx';

export class AppStore {
  @observable skin = false

  @action.bound loadSkin() {
    this.skin = true
  }
}

export default new AppStore()
