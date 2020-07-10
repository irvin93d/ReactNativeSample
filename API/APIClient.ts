import axios from 'axios'
import { AnyAction } from 'redux'

export interface APIRequest<
  Data,
  SuccessAction = AnyAction,
  ErrorAction = AnyAction
> {
  method: 'GET' | 'POST'
  endpoint: string
  params: {
    [param: string]: string
  }
  onSuccess: (data: Data) => SuccessAction
  onFailure: () => ErrorAction
}

export interface APIGETRequest<Data, SuccessAction, ErrorAction>
  extends APIRequest<Data, SuccessAction, ErrorAction> {
  method: 'GET'
}

export interface APIClient {
  do: <Data, SuccessAction, ErrorAction>(
    request: APIRequest<Data, SuccessAction, ErrorAction>,
  ) => Promise<SuccessAction | ErrorAction>
}

// Params could include things like baseURL
export const APIClientImpl: () => APIClient = () => ({
  do: async <Data, SuccessAction, ErrorAction>(
    request: APIRequest<Data, SuccessAction, ErrorAction>,
  ) => {
    try {
      const result = await axios.get<Data>(request.endpoint, {
        params: request.params,
      })
      return request.onSuccess(result.data)
    } catch (error) {
      return request.onFailure()
    }
  },
})
