const sectionExpression = /^\[([a-z]+)\]/i
const valueExpression = /^([a-z]+)\:\s*(.*)$/i

export interface IniSection {
  name: string
  values: { [key: string]: string }
}

export type IniData = IniSection[]

export default function parseIni(input: string) {
  const sections = [] as IniSection[]

  let currentSection: IniSection = {
    name: '',
    values: {},
  }

  input
    .split('\r\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .forEach(line => {
      const sectionMatch = line.match(sectionExpression)
      if (sectionMatch) {
        currentSection = {
          name: sectionMatch[1],
          values: {},
        }
        sections.push(currentSection)
        return
      }

      const valueMatch = line.match(valueExpression)
      if (valueMatch) {
        const [, key, value] = valueMatch
        currentSection.values[key] = value
        return
      }
    })

  return sections
}
