import { observable, computed } from 'mobx'

const routes = {
  'file': {
    'component': null,
    'icon': 'navFile',
  }
}

type RouteName = keyof typeof routes

class RouteStore {
  @observable currentRouteName: RouteName = 'file'

  @computed get currentRoute() {
    return routes[this.currentRouteName]
  }
}

export default new RouteStore
