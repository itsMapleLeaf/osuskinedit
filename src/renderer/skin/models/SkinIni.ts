import { observable } from 'mobx'
import { IniData } from 'renderer/common/util/parseIni'

export default class SkinIni {
  @observable name = ''
  @observable version = ''
  @observable author = ''

  parseIniData(iniData: IniData) {
    const general = iniData.find(section => section.name === 'General')
    if (general) {
      this.name = general.values.Name
      this.version = general.values.Version
      this.author = general.values.Author
    }
  }
}
