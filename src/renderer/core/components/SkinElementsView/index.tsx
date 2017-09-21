import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore';

interface SkinElementsViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinElementsView extends React.Component<SkinElementsViewProps> {
  renderList() {
    const skin = this.props.skinStore!.skin

    return skin.images.map(skinImage => {
      return (
        <img style={{maxWidth: '100%'}} src={skinImage.imagePath} />
      )
    })
  }

  render() {
    return <div>{ this.renderList() }</div>
  }
}
