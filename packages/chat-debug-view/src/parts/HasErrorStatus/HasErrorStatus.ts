import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { isToolEvent } from '../IsToolEvent/IsToolEvent.ts'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const isErrorStatusCode = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return value >= 400
  }
  if (typeof value === 'string') {
    const parsedStatus = Number(value)
    return Number.isFinite(parsedStatus) && parsedStatus >= 400
  }
  return false
}

export const hasErrorStatus = (event: ChatViewEvent): boolean => {
  if (event.type === 'error') {
    return true
  }
  if (event.success === false || event.ok === false) {
    return true
  }
  const { status } = event
  if (isErrorStatusCode(status)) {
    return true
  }
  const { result } = event
  if (isRecord(result)) {
    if (isErrorStatusCode(result.status)) {
      return true
    }
    if (isToolEvent(event) && 'error' in result && result.error !== undefined) {
      return true
    }
    if (typeof result.error === 'string' || typeof result.errorMessage === 'string' || typeof result.exception === 'string') {
      return true
    }
  }
  return typeof event.error === 'string' || typeof event.errorMessage === 'string' || typeof event.exception === 'string'
}
