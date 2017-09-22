import createMemoryHistory from 'history/createMemoryHistory'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { NavLink, Route, Router } from 'react-router-dom'

import Button from 'renderer/common/components/Button'
import { IconType } from 'renderer/common/icons/types'
import Titlebar from 'renderer/core/components/Titlebar'
import SettingsView from 'renderer/settings/components/SettingsView'
import SkinColorsView from 'renderer/skin/components/SkinColorsView'
import SkinElementsView from 'renderer/skin/components/SkinElementsView'
import SkinMetadataView from 'renderer/skin/components/SkinMetadataView'
import SkinSoundsView from 'renderer/skin/components/SkinSoundsView'
import { SkinLoadingState } from 'renderer/skin/models/Skin'
import { SkinStore } from 'renderer/skin/stores/SkinStore'

import Icon from 'renderer/common/components/Icon'
import './styles.scss'

interface AppProps {
  skinStore?: SkinStore
}

@inject('skinStore')
@observer
export default class App extends React.Component<AppProps> {
  history = createMemoryHistory()

  componentWillMount() {
    this.history.push('/elementList')
  }

  setRoute(route: string) {
    this.history.push(route)
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

  renderLoadSkinScreen() {
    const skinStore = this.props.skinStore!
    return (
      <div className="body">
        <Button label="Load Skin" onClick={() => skinStore.loadSkin()} />
      </div>
    )
  }

  renderMainContent() {
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

  renderBody() {
    const skinStore = this.props.skinStore!
    if (skinStore.skin.loadStatus === SkinLoadingState.none) {
      return this.renderLoadSkinScreen()
    }
    return this.renderMainContent()
  }

  render() {
    return (
      <main className="App">
        <div className="header">
          <Titlebar />
        </div>
        {this.renderBody()}
      </main>
    )
  }
}
