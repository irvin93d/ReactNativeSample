import { APIClient } from 'API/APIClient'
import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Weather } from './types'

interface FetchingWeather extends Action {
  type: 'FetchingWeather'
}
const fetchingWeather: ActionCreator<FetchingWeather> = () => ({
  type: 'FetchingWeather',
})

interface FetchedWeather extends Action {
  type: 'FetchedWeather'
  weather: Weather
}
const fetchedWeather: ActionCreator<FetchedWeather> = (weather: Weather) => ({
  type: 'FetchedWeather',
  weather: weather,
})

interface FetchWeatherError extends Action {
  type: 'FetchWeatherError'
}
const fetchWeatherError: ActionCreator<FetchWeatherError> = () => ({
  type: 'FetchWeatherError',
})

export type FetchWeatherActions =
  | FetchingWeather
  | FetchedWeather
  | FetchWeatherError

export const fetchWeather: ActionCreator<ThunkAction<
  Promise<FetchedWeather | FetchWeatherError>, // Return type
  {}, // State, but we don't need it here, add to second param after dispatch if needed
  APIClient, // extra params. Can be use to pass in api (axios) as a third param https://medium.com/@saphidev/redux-in-react-and-combining-with-axios-94a2adfbeeb
  FetchWeatherActions // Any actions that can be dispatched
>> = () => async (
  dispatch,
  _getState,
  apiClient,
): Promise<FetchedWeather | FetchWeatherError> => {
  type APIResult = {
    current_condition: [
      {
        temp_C: string
        windspeedKmph: string
        weatherDesc: [{ value: string }]
      },
    ]
    nearest_area: [{ areaName: [{ value: string }] }]
    weather: []
  }
  dispatch(fetchingWeather())

  return apiClient.do<APIResult, FetchedWeather, FetchWeatherError>({
    endpoint: 'http://wttr.in',
    method: 'GET',
    params: {
      format: 'j1',
    },
    onSuccess: (data) => {
      const weather: Weather = {
        location: data.nearest_area[0].areaName[0].value,
        description: data.current_condition[0].weatherDesc[0].value,
        wind: data.current_condition[0].windspeedKmph + 'km/h',
        temperature: data.current_condition[0].temp_C + '\u00B0C',
      }
      return dispatch(fetchedWeather(weather))
    },
    onFailure: () => dispatch(fetchWeatherError()),
  })
}
