import { getAccount } from './getAccount'
import { handleDispatchError } from './substrateErrorHandling'
import { findModuleErrorsInBlock } from './substrateErrorHandling'
import { toast } from 'react-hot-toast'

const returnMasterNodeURL = masterNodeIpAndPort =>
  `http://${masterNodeIpAndPort}/cluster-status`

const returnWorkerClusterIsReachable = async (url, timeout = 5000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      undefined,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    console.log(await response.text())

    return true
  } catch (e) {
    toast('Worker Node is not reachable... Aborted.')
    return false
  }
}

export const addNode = async (
  clickEvent,
  api,
  currentAccount,
  deployIP,
  statusUpdateCallback
) => {
  clickEvent.preventDefault()

  statusUpdateCallback('PENDING')

  if (
    await returnWorkerClusterIsReachable(returnMasterNodeURL(deployIP), 5000)
  ) {
    const fromAcct = await getAccount(currentAccount)

    await api.tx.edgeConnect
      .registerWorker(undefined, deployIP)
      .signAndSend(...fromAcct, ({ status, events, dispatchError }) => {
        handleDispatchError(dispatchError, api)
        findModuleErrorsInBlock(status, events, api)
        statusUpdateCallback('DEPLOYED')
        setTimeout(() => statusUpdateCallback(''), 2000)
      })
      .catch(error => {
        console.error('Other Errors', error)
        toast.error(error.toString())
      })
  } else {
    statusUpdateCallback('')
  }
}
