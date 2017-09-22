import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import './styles.scss'

interface SkinElementsViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinElementsView extends React.Component<SkinElementsViewProps> {
  render() {
    return (
      <div className="SkinElementsView">
        <div className="categories" />
        <div className="categoryView" />
      </div>
    )
  }
}
