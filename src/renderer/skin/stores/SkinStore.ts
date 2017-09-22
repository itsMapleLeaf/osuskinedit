import { remote } from 'electron'
import { action, observable } from 'mobx'

import Skin from 'renderer/skin/models/Skin'
import configStore from 'shared/configStore'

const dialog = remote.dialog

export class SkinStore {
  @observable skin = new Skin()

  @action.bound
  initialize() {
    const skinPath = configStore.get('lastLoadedSkin')
    if (skinPath) {
      this.skin.load(skinPath)
    }
  }

  @action.bound
  loadSkin() {
    const [path] = dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    configStore.set('lastLoadedSkin', path)
    this.skin.load(path)
  }
}

export default new SkinStore()
