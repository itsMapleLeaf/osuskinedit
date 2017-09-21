import { inject, observer } from 'mobx-react'
import * as React from 'react'

import Button from 'renderer/common/components/Button'
import Navigator from 'renderer/core/components/Navigator'
import RouteRenderer from 'renderer/core/components/RouteRenderer'
import Titlebar from 'renderer/core/components/Titlebar'
import { SkinLoadingState } from 'renderer/skin/models/Skin';
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import './styles.scss'

interface AppProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class App extends React.Component<AppProps> {
  renderBody() {
    const skinStore = this.props.skinStore!

    if (skinStore.skin.loadStatus === SkinLoadingState.none) {
      return (
        <div className="body">
          <Button label="Load Skin" onClick={() => skinStore.loadSkin()} />
        </div>
      )
    }

    return (
      <div className="body">
        <Navigator />
        <RouteRenderer />
      </div>
    )
  }

  render() {
    return (
      <main className="App">
        <div className="header">
          <Titlebar />
        </div>
        {this.renderBody()}
      </main>
    )
  }
}
