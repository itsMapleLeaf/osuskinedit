import { bind } from 'decko'
import { inject, observer } from 'mobx-react'
import * as React from 'react'

import ElementItem from 'renderer/skin/components/SkinElementsView/ElementItem'
import { SkinLoadingState } from 'renderer/skin/models/Skin'
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
    const { elements, loadStatus, loadError } = this.props.skinStore!.skin

    switch (loadStatus) {
      case SkinLoadingState.none:
      case SkinLoadingState.loading:
        return <div>Loading skin elements...</div>
      case SkinLoadingState.finished:
        return elements.map(element => <ElementItem element={element} key={element.options.name} />)
      case SkinLoadingState.failed:
        return this.renderError(loadError || new Error('unknown error'))
    }
  }

  renderError(error: Error) {
    return (
      <div style={{ whiteSpace: 'pre' }}>
        Error loading skin elements: {error.stack || error.toString()}
      </div>
    )
  }

  render() {
    return <div className="SkinElementsView">{this.renderElements()}</div>
  }
}
