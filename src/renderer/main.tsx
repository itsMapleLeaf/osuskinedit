import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from 'renderer/core/components/App'
import StoreProvider from 'renderer/core/components/StoreProvider'
import './index.scss'

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
)
