export type Weather = {
  readonly location: string
  readonly description: string
  readonly temperature: string
  readonly wind: string
}

export type WeatherState = {
  readonly data?: Weather
  readonly error?: String
  readonly loading: Boolean
}
