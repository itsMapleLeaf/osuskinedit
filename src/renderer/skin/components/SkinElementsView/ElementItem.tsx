import { observer } from 'mobx-react'
import * as React from 'react'

import SkinElement from 'renderer/skin/models/SkinElement'

interface ElementItemProps {
  element: SkinElement
}

@observer
export default class ElementItem extends React.Component<ElementItemProps> {
  render() {
    const { element } = this.props

    return (
      <div className="ElementItem">
        <div className="thumbnail">
          <div className="background"></div>
          <div className="canvas">
            <canvas/>
          </div>
        </div>
        <div className="footer">
          <div className="name">
            {element.name}
          </div>
        </div>
      </div>
    )
  }
}