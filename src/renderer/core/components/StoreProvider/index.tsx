import * as React from 'react'

import { Provider } from 'mobx-react'

const stores = {}

const StoreProvider = (props: any) => <Provider {...props} {...stores}/>
export default StoreProvider
