/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import Navigator from './Navigation/Navigator'
import { configureStore } from './store'

const store = configureStore()

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Navigator />
      </Provider>
    </>
  )
}

export default App
