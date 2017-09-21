import * as React from 'react'

import { Provider } from 'mobx-react'

import routeStore from 'renderer/core/stores/routeStore'

const stores = {
  routeStore
}

const StoreProvider = (props: any) => <Provider {...props} {...stores}/>
export default StoreProvider
