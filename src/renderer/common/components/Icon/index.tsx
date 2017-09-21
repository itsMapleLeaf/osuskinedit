import * as React from 'react'
import * as icons from 'renderer/common/icons'
import './styles.scss'

interface IconProps {
  name: keyof typeof icons // lol
}

export default class Icon extends React.Component<IconProps> {
  renderSVG() {
    // TS should yell at you if you decide to specify an invalid icon name
    // so no checks should be required here, in theory
    // also autocomplete!
    return icons[this.props.name]()
  }

  render() {
    return (
      <div className="Icon">
        { this.renderSVG() }
      </div>
    )
  }
}
