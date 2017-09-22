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

export default class AppRouterView extends React.Component {
  history = createMemoryHistory()

  componentWillMount() {
    this.history.push('/elementList')
  }

  renderNavLink(route: string, icon: IconType) {
    return (
      <NavLink to={route} className="NavigationButton" activeClassName="-isActive">
        <div className="icon">
          <Icon name={icon} />
        </div>
      </NavLink>
    )
  }

  render() {
    return (
      <Router history={this.history}>
        <div className="body">
          <div className="sidebar">
            {this.renderNavLink('/elementList', 'navList')}
            {this.renderNavLink('/skinData', 'navSkinData')}
            {this.renderNavLink('/colors', 'navColors')}
            {this.renderNavLink('/sounds', 'navSounds')}
            {this.renderNavLink('/settings', 'navSettings')}
          </div>

          <Route exact path="/elementList" component={SkinElementsView} />
          <Route exact path="/skinData" component={SkinMetadataView} />
          <Route exact path="/colors" component={SkinColorsView} />
          <Route exact path="/sounds" component={SkinSoundsView} />
          <Route exact path="/settings" component={SettingsView} />
        </div>
      </Router>
    )
  }
}
