import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export const hasErrorStatus = (event: ChatViewEvent): boolean => {
  if (event.type === 'error') {
    return true
  }
  if (event.success === false || event.ok === false) {
    return true
  }
  const { status } = event
  if (typeof status === 'number' && status >= 400) {
    return true
  }
  if (typeof status === 'string') {
    const parsedStatus = Number(status)
    if (Number.isFinite(parsedStatus) && parsedStatus >= 400) {
      return true
    }
  }
  return typeof event.error === 'string' || typeof event.errorMessage === 'string' || typeof event.exception === 'string'
}