import { observable } from 'mobx'

class AppStore {
  @observable route = 'file'
}

export default new AppStore