import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore';

interface SkinMetadataViewProps {
  skinStore: SkinStore
}

@inject('skinStore')
@observer
export default class SkinMetadataView extends React.Component<SkinMetadataViewProps> {
  render() {
    const skinStore = this.props.skinStore!
    return <div>
      <div>Skin name: {skinStore.skin.ini.name}</div>
      <div>Skin author: {skinStore.skin.ini.author}</div>
      <div>Skin version: {skinStore.skin.ini.version}</div>
    </div>
  }
}
