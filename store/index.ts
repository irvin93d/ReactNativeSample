import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { APIClientImpl } from '../API/APIClient'
import { weatherReducer } from './weather/reducers'

const rootReducer = combineReducers({
  weather: weatherReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const configureStore = (preloadedState?: RootState): Store => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      createLogger(),
      thunkMiddleware.withExtraArgument(APIClientImpl()),
    ),
  )
}
