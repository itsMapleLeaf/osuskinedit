import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import './index.scss'

interface SkinLiveEditViewProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class SkinLiveEditView extends React.Component<SkinLiveEditViewProps> {
  @computed
  get backgroundImage() {
    const { skin } = this.props.skinStore!
    const background = skin.getImage('menu-background')
    if (background) {
      return background.image.src
    }
    return ''
  }

  render() {
    return (
      <div className="SkinLiveEditView">
        <div className="previewContainer">
          <canvas
            className="background"
            width={1280}
            height={720}
            style={{ backgroundImage: `url(${this.backgroundImage})` }}
          />
        </div>
        <div className="sidePanel">fsdklfjklsdfjkslfjsd;</div>
      </div>
    )
  }
}
