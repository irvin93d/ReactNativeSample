/**
 * @format
 */

import React from 'react'
import 'react-native'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'
import App from '../App'

it('renders without exploding 💥', () => {
  renderer.create(<App />)
})
