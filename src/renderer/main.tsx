import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from 'renderer/core/components/App'
import stores from 'renderer/stores'

import './styles/flex.scss'
import './styles/global.scss'
import './styles/helpers.scss'

function Root() {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

async function start() {
  await stores.skinStore.initialize()
  ReactDOM.render(<Root />, document.getElementById('root'))
}

start().catch(console.error)
