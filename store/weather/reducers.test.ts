import { FetchWeatherActions as Actions } from './actions'
import { weatherReducer as reducer } from './reducers'
import { WeatherState as State } from './types'

describe('weatherReducer', () => {
  type Test = {
    stateBefore: State
    expectedStateAfter: State
    action: Actions
  }
  const tests: Test[] = [
    {
      stateBefore: { loading: false },
      expectedStateAfter: { loading: true },
      action: { type: 'FetchingWeather' },
    },
    {
      stateBefore: { loading: true },
      expectedStateAfter: { loading: true },
      action: { type: 'FetchingWeather' },
    },
    {
      stateBefore: { loading: true },
      expectedStateAfter: { loading: false, error: 'an error' },
      action: { type: 'FetchWeatherError', error: 'an error' },
    },
    {
      stateBefore: { loading: false, error: 'an error' },
      expectedStateAfter: { loading: true },
      action: { type: 'FetchingWeather' },
    },
    {
      stateBefore: { loading: false, error: 'an error' },
      expectedStateAfter: { loading: true },
      action: { type: 'FetchingWeather' },
    },
    {
      stateBefore: { loading: true },
      expectedStateAfter: {
        loading: false,
        data: {
          location: 'fb hq',
          temperature: 'hot',
          description: 'party weather',
          wind: 'slow',
        },
      },
      action: {
        type: 'FetchedWeather',
        weather: {
          location: 'fb hq',
          temperature: 'hot',
          description: 'party weather',
          wind: 'slow',
        },
      },
    },
  ]
  it.each(tests)('%o', (test) => {
    const actualStateAfter = reducer(test.stateBefore, test.action)
    expect(actualStateAfter).toEqual(test.expectedStateAfter)
  })
})
