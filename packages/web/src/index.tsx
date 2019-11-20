import { AppRegistry } from 'react-native'

import { App } from 'components/src/App'

AppRegistry.registerComponent('unitywallet', () => App)
AppRegistry.runApplication('unitywallet', {
  rootTag: document.getElementById('root'),
})
