import { inject, observer } from 'mobx-react'
import * as React from 'react'

import Button from 'renderer/common/components/Button'
import Navigator from 'renderer/core/components/Navigator'
import RouteRenderer from 'renderer/core/components/RouteRenderer'
import Titlebar from 'renderer/core/components/Titlebar'
import { AppStore } from 'renderer/core/stores/AppStore'

import './styles.scss'

interface AppProps {
  appStore?: AppStore
}

@inject('appStore')
@observer
export default class App extends React.Component<AppProps> {
  renderBody() {
    const appStore = this.props.appStore!

    if (!appStore.skin) {
      return (
        <div className="body">
          <Button label="Load Skin" onClick={appStore.loadSkin} />
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
