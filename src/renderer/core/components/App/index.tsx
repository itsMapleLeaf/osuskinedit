import * as React from 'react'

import StoreProvider from 'renderer/core/components/StoreProvider'

import Titlebar from 'renderer/core/components/Titlebar'
import Navigator from 'renderer/core/components/Navigator'
import RouteRenderer from 'renderer/core/components/RouteRenderer'

import './styles.scss'

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider>
        <main className="App">
          <div className="header">
            <Titlebar/>
          </div>
          <div className="body">
            <Navigator/>
            <RouteRenderer/>
          </div>
        </main>
      </StoreProvider>
    )
  }
}