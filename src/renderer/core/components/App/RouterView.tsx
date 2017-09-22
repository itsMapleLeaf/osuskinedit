import createMemoryHistory from 'history/createMemoryHistory'
import * as React from 'react'
import { NavLink, Route, Router } from 'react-router-dom'

import Icon from 'renderer/common/components/Icon'
import { IconType } from 'renderer/common/icons/types'
import SettingsView from 'renderer/settings/components/SettingsView'
import SkinColorsView from 'renderer/skin/components/SkinColorsView'
import SkinElementsView from 'renderer/skin/components/SkinElementsView'
import SkinMetadataView from 'renderer/skin/components/SkinMetadataView'
import SkinSoundsView from 'renderer/skin/components/SkinSoundsView'

interface RouteDefinition {
  path: string,
  icon: IconType,
  component: React.ComponentClass,
}

const routes: RouteDefinition[] = [
  { path: '/elementList', icon: 'navList', component: SkinElementsView },
  { path: '/skinData', icon: 'navSkinData', component: SkinMetadataView },
  { path: '/colors', icon: 'navColors', component: SkinColorsView },
  { path: '/sounds', icon: 'navSounds', component: SkinSoundsView },
  { path: '/settings', icon: 'navSettings', component: SettingsView },
]

export default class AppRouterView extends React.Component {
  history = createMemoryHistory()

  componentWillMount() {
    this.history.push('/elementList')
  }

  renderNavLink = (route: RouteDefinition) => {
    return (
      <NavLink to={route.path} className="NavigationButton" activeClassName="-isActive" key={route.path}>
        <div className="icon">
          <Icon name={route.icon} />
        </div>
      </NavLink>
    )
  }

  renderRoute = (route: RouteDefinition) => {
    return <Route path={route.path} component={route.component} key={route.path} />
  }

  render() {
    return (
      <Router history={this.history}>
        <div className="body">
          <div className="sidebar">
            {routes.map(this.renderNavLink)}
          </div>
          {routes.map(this.renderRoute)}
        </div>
      </Router>
    )
  }
}
