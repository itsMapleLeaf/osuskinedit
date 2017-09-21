import { action, observable } from 'mobx';
import { remote } from 'electron'

const dialog = remote.require('electron').dialog

import Skin from 'renderer/skin/models/Skin'

export class AppStore {
  @observable skin = false

  @action.bound loadSkin() {
    const path = dialog.showOpenDialog({
      properties: ['openDirectory']
    })

    const skin = new Skin(path[0])

    skin.load()

    this.skin = true
  }
}

export default new AppStore()
