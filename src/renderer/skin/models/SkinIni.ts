import { observable } from 'mobx'

import { readFile } from 'renderer/common/util/fs'
import { IniData, parseIni } from 'renderer/common/util/parseIni'

export default class SkinIni {
  @observable data: IniData = []

  @observable name = ''
  @observable author = ''
  @observable version = ''

  async read(iniPath: string) {
    const buffer = await readFile(iniPath)
    const content = buffer.toString()
    this.data = parseIni(content)

    this.name = this.getPropertyBySection('General', 'Name')
    this.author = this.getPropertyBySection('General', 'Author')
    this.version = this.getPropertyBySection('General', 'Version')
  }

  getPropertyBySection(sectionName: string, propertyName: string) {
    const section = this.data.find(section => {
      return section.name === sectionName
    })

    if (!section) return ''

    return section.values[propertyName] || ''
  }
}
