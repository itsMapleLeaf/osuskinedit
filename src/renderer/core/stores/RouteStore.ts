import { observable, computed, action } from 'mobx'

export const routes: { [key: string]: any } = {
  'file': {
    'component': null,
    'icon': 'navFile',
  },
  'elementList': {
    'component': null,
    'icon': 'navList',
  },
  'skinData': {
    'component': null,
    'icon': 'navSkinData',
  },
  'colors': {
    'component': null,
    'icon': 'navColors',
  },
  'settings': {
    'component': null,
    'icon': 'navSettings'
  }
}

export class RouteStore {
  @observable currentRouteName = 'file'

  @action
  setRoute(routeName: string) {
    this.currentRouteName = routeName;
  }

  @computed
  get currentRoute() {
    return routes[this.currentRouteName]
  }
}

export default new RouteStore
