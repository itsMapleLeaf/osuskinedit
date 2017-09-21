import * as ConfigStore from 'configstore'
import meta from '../../package.json'

const store = new ConfigStore(meta.name, {})

export default store
