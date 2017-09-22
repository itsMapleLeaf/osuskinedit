import { computed, observable } from 'mobx'

import { readFile } from 'renderer/common/util/fs'
import parseIni, { IniData } from 'renderer/common/util/parseIni'

export default class SkinIni {
  @observable data: IniData = []

  async read(iniPath: string) {
    const buffer = await readFile(iniPath)
    const content = buffer.toString()
    this.data = parseIni(content)
  }

  getPropertyBySection(sectionName: string, propertyName: string) {
    const section = this.data.find(section => {
      return section.name === sectionName
    })

    if (!section) return undefined

    return section.values[propertyName]
  }


  @computed get name() {
    return this.getPropertyBySection('General', 'Name')
  }

  @computed get author() {
    return this.getPropertyBySection('General', 'Author')
  }

  @computed get version() {
    return this.getPropertyBySection('General', 'Version')
  }
}
