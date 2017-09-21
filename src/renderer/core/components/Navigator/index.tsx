import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { bind } from 'decko'

import Button from 'renderer/common/components/Button'

import { routes, RouteStore } from 'renderer/core/stores/routeStore'

import './styles.scss'

interface NavigatorProps {
  routeStore: RouteStore
}

@inject('routeStore') @observer
export default class Navigator extends React.Component<NavigatorProps> {
  renderButtons() {
    const { routeStore } = this.props;
    const keys = Object.keys(routes)

    return keys.map(key => {
      const route = routes[key]
      const isActive = key === routeStore.currentRouteName

      const handleClick = () => {
        routeStore.setRoute(key)
      }

      return (
        <Button
          key={key}
          type="NavigationButton"
          icon={route.icon}
          isActive={isActive}
          onClick={handleClick}
        />
      )
    })
  }

  render() {
    return (
      <div className="Navigator">
        { this.renderButtons() }
      </div>
    )
  }
}
