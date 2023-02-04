import { useQuasar } from 'quasar'

export default function useNotify () {
  const $q = useQuasar()

  const notifySuccess = (message = 'All right!') => {
    $q.notify({
      type: 'positive',
      message
    })
  }

  const notifyError = (message = 'Failed!') => {
    $q.notify({
      type: 'negative',
      message
    })
  }

  return {
    notifySuccess,
    notifyError
  }
}
