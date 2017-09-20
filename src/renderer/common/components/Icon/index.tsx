import * as React from 'react'
import * as icons from 'renderer/common/icons'
import './styles.scss'

interface IconProps {
  name: string
}

export default class Icon extends React.Component<IconProps> {
  renderSVG() {
    const { name } = this.props

    const hasIcon = !!icons[name]

    if (hasIcon) return icons[name]()

    return 'Missing icon'
  }

  render() {
    return (
      <div className="Icon">
        { this.renderSVG() }
      </div>
    )
  }
}
