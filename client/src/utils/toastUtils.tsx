import { ToastPosition, toast } from 'react-toastify'

export const toastError = (msg: string, pos?: ToastPosition) => {
  if (pos === undefined) pos = 'bottom-right'

  toast.error(msg ? msg : 'Something went wrong danger', {
    position: pos,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const toastWarning = (msg: string) => {
  toast.warn(msg ? msg : 'Something went wrong warn', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false
  })
}

export const toastSuccess = (msg: string) => {
  toast.success(msg ? msg : 'Success', {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const toastInfo = (msg: string) => {
  toast.info(msg ? msg : 'Info', {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: true
  })
}
