'use client'

import { createContext, useContext, useMemo, useReducer } from 'react'

enum EReducerActionKind {
  SET_MODAL_SHOW = 'SET_MODAL_SHOW',
  SET_SERVICE_TYPE = 'SET_SERVICE_TYPE',
  SET_BUILDING_TYPE = 'SET_BUILDING_TYPE',
  SET_FEATURES = 'SET_FEATURES',
  SET_ADMINISTRATION_TIME = 'SET_ADMINISTRATION_TIME',
  SET_POST_CODE = 'SET_POST_CODE',
  SET_PERSONAL_DATA = 'SET_PERSONAL_DATA',
  RESET = 'RESET',
}

interface IReducerAction {
  type: EReducerActionKind
  payload?: number | boolean | string | IRentalFeatures | IPersonalData
}

export interface ISubmitRentalState {
  isModalOpen: boolean
  serviceType: number | null
  buildingType: number | null
  features: IRentalFeatures
  administrationTime: number | null
  postCode: string | null
  personalData: IPersonalData
}

export interface IPersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
}
interface IRentalFeatures {
  roomCount: number
  minArea: number
}

interface ISubmitRentalApi {
  setShowModal: (isModalOpen: boolean) => void
  setServiceType: (serviceType: number) => void
  setBuildingType: (buildingType: number) => void
  setFeatures: (features: IRentalFeatures) => void
  setAdministrationTime: (administrationTime: number) => void
  setPostCode: (postCode: string) => void
  setPersonalData: (personalData: IPersonalData) => void
  reset: () => void
}

const initialState: ISubmitRentalState = {
  isModalOpen: false,
  serviceType: null,
  buildingType: null,
  features: {
    roomCount: 0,
    minArea: 0,
  },
  administrationTime: null,
  postCode: null,
  personalData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
}

const initialApi: ISubmitRentalApi = {
  setShowModal: () => {},
  setServiceType: () => {},
  setBuildingType: () => {},
  setFeatures: () => {},
  setAdministrationTime: () => {},
  setPostCode: () => {},
  setPersonalData: () => {},
  reset: () => {},
}

const SubmitRentalStateContext = createContext(initialState)
const SubmitRentalApiContext = createContext(initialApi)

const useSubmitRentalStateContext = () => {
  const ctx = useContext(SubmitRentalStateContext)

  if (!ctx) {
    throw new Error('useSubmitRentalStateContext must be used within a SubmitRentalStateContextProvider')
  }

  return ctx
}

const useSubmitRentalApiContext = () => {
  const ctx = useContext(SubmitRentalApiContext)

  if (!ctx) {
    throw new Error('useSubmitRentalApiContext must be used within a SubmitRentalApiContextProvider')
  }

  return ctx
}

const reducer = (state: ISubmitRentalState, action: IReducerAction): ISubmitRentalState => {
  const { type, payload } = action
  switch (type) {
    case EReducerActionKind.SET_MODAL_SHOW:
      return {
        ...state,
        isModalOpen: payload as boolean,
      }
    case EReducerActionKind.SET_SERVICE_TYPE:
      return {
        ...state,
        serviceType: payload as number,
      }
    case EReducerActionKind.SET_BUILDING_TYPE:
      return {
        ...state,
        buildingType: payload as number,
      }
    case EReducerActionKind.SET_FEATURES:
      return {
        ...state,
        features: payload as IRentalFeatures,
      }
    case EReducerActionKind.SET_ADMINISTRATION_TIME:
      return {
        ...state,
        administrationTime: payload as number,
      }
    case EReducerActionKind.SET_POST_CODE:
      return {
        ...state,
        postCode: payload as string,
      }
    case EReducerActionKind.SET_PERSONAL_DATA:
      return {
        ...state,
        personalData: payload as unknown as IPersonalData,
      }

    case EReducerActionKind.RESET:
      return initialState
    default:
      throw new Error(`Unknown action type ${type}`)
  }
}

interface IProps {
  children: React.ReactNode
}

const SubmitRentalContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const submitRentalApi = useMemo<ISubmitRentalApi>(() => {
    return {
      setShowModal: (isModalOpen: boolean) => dispatch({ type: EReducerActionKind.SET_MODAL_SHOW, payload: isModalOpen }),
      setServiceType: (serviceType: number) => dispatch({ type: EReducerActionKind.SET_SERVICE_TYPE, payload: serviceType }),
      setBuildingType: (buildingType: number) => dispatch({ type: EReducerActionKind.SET_BUILDING_TYPE, payload: buildingType }),
      setFeatures: (features: IRentalFeatures) => dispatch({ type: EReducerActionKind.SET_FEATURES, payload: features }),
      setAdministrationTime: (administrationTime: number) => dispatch({ type: EReducerActionKind.SET_ADMINISTRATION_TIME, payload: administrationTime }),
      setPostCode: (postCode: string) => dispatch({ type: EReducerActionKind.SET_POST_CODE, payload: postCode }),
      setPersonalData: (personalData: IPersonalData) => dispatch({ type: EReducerActionKind.SET_PERSONAL_DATA, payload: personalData }),
      reset: () => dispatch({ type: EReducerActionKind.RESET }),
    }
  }, [dispatch])

  return (
    <SubmitRentalStateContext.Provider value={state}>
      <SubmitRentalApiContext.Provider value={submitRentalApi}>{children}</SubmitRentalApiContext.Provider>
    </SubmitRentalStateContext.Provider>
  )
}

export { useSubmitRentalStateContext, useSubmitRentalApiContext, SubmitRentalContextProvider }
