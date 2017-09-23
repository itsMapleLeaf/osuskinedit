import { remote } from 'electron'
import { action, observable } from 'mobx'

import Skin from 'renderer/skin/models/Skin'
import configStore from 'shared/configStore'

const dialog = remote.dialog

export class SkinStore {
  @observable skin = new Skin()

  @action.bound
  async initialize() {
    const skinPath = configStore.get('lastLoadedSkin')
    if (skinPath) {
      await this.skin.load(skinPath)
    }
  }

  @action.bound
  async loadSkin() {
    const [path] = dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    configStore.set('lastLoadedSkin', path)
    await this.skin.load(path)
  }
}

export default new SkinStore()
