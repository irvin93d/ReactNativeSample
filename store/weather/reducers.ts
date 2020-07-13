import { Reducer } from 'redux'
import { FetchWeatherActions } from './actions'
import { WeatherState } from './types'

const initialState: WeatherState = { data: undefined, loading: false }

export const weatherReducer: Reducer<WeatherState, FetchWeatherActions> = (
  state: WeatherState = initialState,
  action: FetchWeatherActions,
) => {
  switch (action.type) {
    case 'FetchingWeather':
      return { ...state, loading: true, error: undefined }
    case 'FetchedWeather':
      return {
        ...state,
        loading: false,
        error: undefined,
        data: action.weather,
      }
    case 'FetchWeatherError':
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
