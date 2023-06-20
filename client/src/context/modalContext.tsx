import { createContext, useContext, useMemo, useReducer } from 'react'

export interface IModal {
  title: string | React.ReactNode
  content: string | React.ReactNode
}


enum EReducerActionKind {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

interface IModalApi {
  openModal: (modal: IModal) => {}
  closeModal: () => {}
}

interface IReducerAction {
  type: EReducerActionKind
  payload: IModal | null
}


type IModalState = {
  activeModal: IModal | null
}

const initialState: IModalState = {
  activeModal: null,
}


const initialApi: IModalApi = {
  openModal: () => ({}),
  closeModal: () => ({}),
}




const ModalStateContext = createContext(initialState)
const ModalApiContext = createContext(initialApi)

const useModalStateContext = () => {
  const ctx = useContext(ModalStateContext)

  if (!ctx) {
    throw new Error('useModalStateContext must be used within a ModalStateContextProvider')
  }

  return ctx
}

const useModalApiContext = () => {
  const ctx = useContext(ModalApiContext)

  if (!ctx) {
    throw new Error('useModalApiContext must be used within a ModalApiContextProvider')
  }

  return ctx
}




const reducer = (state: IModalState, action: IReducerAction): IModalState => {
  const { type, payload } = action
  switch (type) {
    case EReducerActionKind.OPEN_MODAL:
      return {
        ...state,
        activeModal: payload

      }
    case EReducerActionKind.CLOSE_MODAL:
      return {
        ...state,
        activeModal: null
      }
    default:
      throw new Error(`Unknown action type ${type}`)
  }
}



interface IProps {
  children: React.ReactNode
}

const ModalContextProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const submitRentalApi = useMemo<IModalApi>(() => {
    return {
      openModal: (modal: IModal) => {
        dispatch({
          type: EReducerActionKind.OPEN_MODAL,
          payload: modal,
        })
      },
      closeModal: () => {
        dispatch({
          type: EReducerActionKind.CLOSE_MODAL,
          payload: null
        })
      }
    }
  }, [dispatch])

  return (
    <ModalStateContext.Provider value={state}>
      <ModalApiContext.Provider value={submitRentalApi}>{children}</ModalApiContext.Provider>
    </ModalStateContext.Provider>
  )
}




export { useModalStateContext, useModalApiContext, ModalContextProvider }
