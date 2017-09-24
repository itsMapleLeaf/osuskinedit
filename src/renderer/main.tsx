import './styles/global.scss'

import './styles/flex.scss'
import './styles/helpers.scss'

import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from 'renderer/core/components/App'
import stores from 'renderer/stores'

function Root() {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

async function start() {
  ReactDOM.render(<Root />, document.getElementById('root'))
  await stores.skinStore.initialize()
}

start().catch(console.error)
