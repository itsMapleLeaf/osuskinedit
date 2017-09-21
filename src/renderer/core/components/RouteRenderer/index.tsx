import { inject, observer } from 'mobx-react'
import * as React from 'react'

import { RouteStore } from 'renderer/core/stores/routeStore'

import './styles.scss'

interface RouteRendererProps {
  routeStore?: RouteStore
}

@inject('routeStore')
@observer
export default class RouteRenderer extends React.Component<RouteRendererProps> {
  render() {
    const routeStore = this.props.routeStore!
    const currentRoute = routeStore.currentRoute
    const Component = currentRoute ? currentRoute.component : 'div'

    return (
      <div className="RouteRenderer">
        <Component />
      </div>
    )
  }
}
