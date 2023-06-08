import { createContext, useContext, useMemo, useReducer } from 'react'
import { IUser } from '@/models'

enum EReducerActionKind {
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

interface IReducerAction {
  type: EReducerActionKind
  payload?: IUser
}

export interface IAuthenticationState {
  loggedUser: IUser | null
}


interface IAuthenticationApi {
  setUser: (user: IUser) => void
  logout: () => void
}

const initialState: IAuthenticationState = {
  loggedUser: null,
}

const initialApi: IAuthenticationApi = {
  setUser: () => { },
  logout: () => { },
}

const AuthenticationStateContext = createContext(initialState)
const AuthenticationApiContext = createContext(initialApi)

const useAuthenticationStateContext = () => {
  const ctx = useContext(AuthenticationStateContext)

  if (!ctx) {
    throw new Error('useAuthenticationStateContext must be used within a AuthenticationStateContextProvider')
  }

  return ctx
}

const useAuthenticationApiContext = () => {
  const ctx = useContext(AuthenticationApiContext)

  if (!ctx) {
    throw new Error('useAuthenticationApiContext must be used within a AuthenticationApiContextProvider')
  }

  return ctx
}

const reducer = (state: IAuthenticationState, action: IReducerAction): IAuthenticationState => {
  const { type, payload } = action
  switch (type) {
    case EReducerActionKind.SET_USER:
      return {
        ...state,
        loggedUser: payload as IUser,
      }
    case EReducerActionKind.LOGOUT:
      return {
        ...state,
        loggedUser: null,
      }
    default:
      throw new Error(`Unknown action type ${type}`)
  }
}

interface IProps {
  children: React.ReactNode
}

const AuthenticationContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const submitRentalApi = useMemo<IAuthenticationApi>(() => {
    return {
      setUser: (user: IUser) => {
        dispatch({
          type: EReducerActionKind.SET_USER,
          payload: user,
        })
      },
      logout: () => {
        dispatch({
          type: EReducerActionKind.LOGOUT,
        })
      }
    }
  }, [dispatch])

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationApiContext.Provider value={submitRentalApi}>{children}</AuthenticationApiContext.Provider>
    </AuthenticationStateContext.Provider>
  )
}

export { useAuthenticationStateContext, useAuthenticationApiContext, AuthenticationContextProvider }
