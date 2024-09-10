import { toast } from 'react-hot-toast'

export const handleDispatchError = (dispatchError, api) => {
  if (dispatchError) {
    if (dispatchError.isModule) {
      // for module errors, we have the section indexed, lookup
      const decoded = api.registry.findMetaError(dispatchError.asModule)
      const { docs, name, section } = decoded
      toast.error(
        `Dispatch Module Error: ${section}.${name}: ${docs.join(' ')}`
      )
      console.error(
        `Dispatch Module Error: ${section}.${name}: ${docs.join(' ')}`
      )
    } else {
      // Other, CannotLookup, BadOrigin, no extra info
      toast.error(`Dispatch Module Error: ${dispatchError.toString()}`)
      console.error(`Dispatch Module Error: ${dispatchError.toString()}`)
    }
  }
}

export const findModuleErrorsInBlock = (status, events, api) => {
  if (status.isInBlock || status.isFinalized) {
    // find/filter for failed events
    const failedEvents = events.filter(event =>
      api.events.system.ExtrinsicFailed.is(event)
    )
    // we know that data for system.ExtrinsicFailed is (DispatchError, DispatchInfo)
    failedEvents.forEach(
      ({
        event: {
          data: [error, info],
        },
      }) => {
        if (error.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(error.asModule)
          const { docs, method, section } = decoded
          toast.error(`${section}.${method}: ${docs.join(' ')}`)
          console.error(`${section}.${method}: ${docs.join(' ')}`)
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          toast.error(error.toString())
          console.error(error.toString())
        }
      }
    )
    const success = events.filter(({ event }) =>
      api.events.taskManagement.TaskScheduled.is(event)
    )
    if (success.length > 0) {
      console.log(success)
    }
  }
}
