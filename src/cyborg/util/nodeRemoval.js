import { getAccount } from './getAccount'
import { handleDispatchError } from './substrateErrorHandling'
import { findModuleErrorsInBlock } from './substrateErrorHandling'

export const removeNode = async (clickEvent, workerId, api, currentAccount) => {
  clickEvent.stopPropagation()
  clickEvent.preventDefault()

  const fromAcct = await getAccount(currentAccount)

  await api.tx.edgeConnect
    .removeWorker(workerId)
    .signAndSend(...fromAcct, ({ status, events, dispatchError }) => {
      handleDispatchError(dispatchError, api)
      findModuleErrorsInBlock(status, events, api)
    })
    .catch(error => {
      console.error('Other Errors', error)
      toast.error(error.toString())
    })
}
