import { inject, observer } from 'mobx-react'
import * as React from 'react'

import Button from 'renderer/common/components/Button'
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
    const Component = routeStore.currentRoute.component

    return (
      <div className="RouteRenderer">
        <Component />
      </div>
    )
  }
}
