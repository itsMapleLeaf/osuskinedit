import * as ConfigStore from 'configstore'
import meta from '../../package.json'

const store = new ConfigStore(meta.name, {
  window: {
    x: 100,
    y: 100,
    width: 800,
    height: 500,
    isMaximized: false,
  },
  lastLoadedSkin: '',
})

export default store
