import React from 'react'
import { Button, Text } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from 'store'
import { WeatherState } from 'store/weather/types'
import { fetchWeather } from '../store/weather/actions'

interface StateProps extends WeatherState {}

interface DispatchProps {
  fetchWeather: () => void
}

type Props = StateProps & DispatchProps

const WeatherView: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Button title="Fetch Weather" onPress={props.fetchWeather} />
      {props.loading && <Text>Loading</Text>}
      {props.error && <Text>Error: {props.error}</Text>}
      {!props.loading && props.data && (
        <>
          <Text>{props.data.location}</Text>
          <Text>{props.data.description}</Text>
          <Text>{props.data.wind}</Text>
          <Text>{props.data.temperature}</Text>
        </>
      )}
    </>
  )
}

export default WeatherView

const mapState = (state: RootState): StateProps => ({
  ...state.weather,
})

const mapDispatch = {
  fetchWeather,
}

export const ConnectedWeather = connect<
  StateProps,
  DispatchProps,
  {},
  RootState
>(
  mapState,
  mapDispatch,
)(WeatherView)
