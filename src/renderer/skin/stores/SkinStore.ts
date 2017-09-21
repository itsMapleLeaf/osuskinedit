import { remote } from 'electron'
import { action, observable } from 'mobx'
import Skin from 'renderer/skin/models/Skin'

const dialog = remote.dialog

export class SkinStore {
  @observable skin = new Skin()

  @action.bound
  loadSkin() {
    const path = dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    return this.skin.load(path[0])
  }
}

export default new SkinStore()
