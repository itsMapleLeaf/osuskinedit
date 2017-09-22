import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import ElementItem from 'renderer/skin/components/SkinElementsView/ElementItem'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import './styles.scss'

interface SkinElementsViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinElementsView extends React.Component<SkinElementsViewProps> {
  @bind
  renderElements() {
    const { elements } = this.props.skinStore!.skin

    return (
      <div className="SkinElementsView">
        {elements.map(element => <ElementItem element={element} key={element.name} />)}
      </div>
    )
  }

  render() {
    return this.renderElements()
  }
}
