import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from 'renderer/core/components/App'
import stores from 'renderer/stores'

import './index.scss'

function Root() {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
