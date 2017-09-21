import * as React from 'react'
import { action, computed, observable } from 'mobx'

import { IconType } from 'renderer/common/icons/types'

import SkinElementsView from 'renderer/core/components/SkinElementsView'
import SkinMetadataView from 'renderer/core/components/SkinMetadataView'
import SkinColorsView from 'renderer/core/components/SkinColorsView'
import SkinSoundsView from 'renderer/core/components/SkinSoundsView'

import SettingsView from 'renderer/settings/components/SettingsView'

interface RouteDefinition {
  [key: string]: Route
}

interface Route {
  component: React.ComponentClass
  icon: IconType
}

export const routes: RouteDefinition = {
  elementList: {
    component: SkinElementsView,
    icon: 'navList',
  },
  skinData: {
    component: SkinMetadataView,
    icon: 'navSkinData',
  },
  colors: {
    component: SkinColorsView,
    icon: 'navColors',
  },
  sounds: {
    component: SkinSoundsView,
    icon: 'navSounds',
  },
  settings: {
    component: SettingsView,
    icon: 'navSettings',
  },
}

export class RouteStore {
  @observable currentRouteName = 'elementList'

  @action
  setRoute(routeName: string) {
    this.currentRouteName = routeName
  }

  @computed
  get currentRoute() {
    return routes[this.currentRouteName]
  }
}

export default new RouteStore()
