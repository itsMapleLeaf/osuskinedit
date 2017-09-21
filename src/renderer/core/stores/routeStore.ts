import { action, computed, observable } from 'mobx'
import * as React from 'react'
import { IconType } from 'renderer/common/icons/types'
import { FileView } from 'renderer/file/components/FileView/index'

interface RouteDefinition {
  [key: string]: Route
}

interface Route {
  component: React.ComponentClass
  icon: IconType
}

export const routes: RouteDefinition = {
  file: {
    component: FileView,
    icon: 'navFile',
  },
  elementList: {
    component: FileView,
    icon: 'navList',
  },
  skinData: {
    component: FileView,
    icon: 'navSkinData',
  },
  colors: {
    component: FileView,
    icon: 'navColors',
  },
  settings: {
    component: FileView,
    icon: 'navSettings',
  },
}

export class RouteStore {
  @observable currentRouteName = 'file'

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
