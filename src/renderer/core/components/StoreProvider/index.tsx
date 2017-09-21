import * as React from 'react'

import { Provider } from 'mobx-react'

import appStore from 'renderer/core/stores/AppStore'
import routeStore from 'renderer/core/stores/RouteStore'

const stores = {
  routeStore,
  appStore,
}

console.log(stores)

const StoreProvider = (props: any) => <Provider {...props} {...stores}/>
export default StoreProvider
