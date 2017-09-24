import { inject, observer } from 'mobx-react'
import * as React from 'react'

import Titlebar from 'renderer/core/components/Titlebar'
import { SkinLoadingState } from 'renderer/skin/models/Skin'
import { SkinStore } from 'renderer/skin/stores/SkinStore'
import AppRouterView from './RouterView'

import './index.scss'

interface AppProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class App extends React.Component<AppProps> {
  renderBody() {
    const skinStore = this.props.skinStore!
    if (skinStore.skin.loadStatus !== SkinLoadingState.finished) {
      return (
        <div className="fill-area flex-center">
          <h1>Loading skin...</h1>
        </div>
      )
    }
    return <AppRouterView />
  }

  render() {
    return (
      <main className="App fullscreen flex-column">
        <div className="header">
          <Titlebar />
        </div>
        {this.renderBody()}
      </main>
    )
  }
}
