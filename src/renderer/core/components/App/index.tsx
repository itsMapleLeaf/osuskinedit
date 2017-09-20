import * as React from 'react'

import Titlebar from 'renderer/core/components/Titlebar'

export default class App extends React.Component {
  render() {
    return (
      <main className="App">
        <Titlebar />
      </main>
    )
  }
}
