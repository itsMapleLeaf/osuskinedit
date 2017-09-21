import { observable, computed } from 'mobx'

import * as fs from 'fs'
import parseIni, { IniData } from 'renderer/common/util/parseIni'

export default class SkinIni {
  @observable data: IniData = []

  read(iniPath: string) {
    fs.readFile(iniPath, (error, buffer) => {
      const content = buffer.toString()

      this.data = parseIni(content)
    })
  }

  getPropertyBySection(sectionName: string, propertyName: string) {
    const section = this.data.find(section => {
      return section.name === sectionName
    })

    if (!section) return undefined

    const value = section.values[propertyName]

    return value
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
