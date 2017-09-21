import * as ConfigStore from 'configstore'

const meta = require('../../package.json')
const store = new ConfigStore(meta.name, {})

export default store
