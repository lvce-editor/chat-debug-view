import type { ChatDebugViewState } from '../State/ChatDebugViewState.ts'
import { getPayloadEvent } from '../GetPayloadEvent/GetPayloadEvent.ts'
import { getSelectedDetailTab } from '../GetSelectedDetailTab/GetSelectedDetailTab.ts'
import * as InputName from '../InputName/InputName.ts'

export type ChatDebugPayloadMismatch = {
  readonly actual: unknown
  readonly expected: unknown
  readonly message: string
  readonly path: string
}

export class ChatDebugPayloadError extends Error {
  public readonly actual: unknown
  public readonly expected: unknown
  public readonly path: string

  public constructor(mismatch: ChatDebugPayloadMismatch) {
    super(mismatch.message)
    this.name = 'ChatDebugPayloadError'
    this.actual = mismatch.actual
    this.expected = mismatch.expected
    this.path = mismatch.path
  }
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

const formatValue = (value: unknown): string => {
  return JSON.stringify(value)
}

const createMismatch = (actual: unknown, expected: unknown, path: string, message: string): ChatDebugPayloadMismatch => {
  return {
    actual,
    expected,
    message,
    path,
  }
}

const getArrayMismatch = (
  actual: unknown,
  expected: readonly unknown[],
  path: string,
): ChatDebugPayloadMismatch | undefined => {
  if (!Array.isArray(actual)) {
    return createMismatch(actual, expected, path, `Expected ${path} to be an array but got ${formatValue(actual)}`)
  }
  if (actual.length < expected.length) {
    return createMismatch(actual, expected, path, `Expected ${path} to have at least ${expected.length} items but got ${actual.length}`)
  }
  for (let index = 0; index < expected.length; index++) {
    const mismatch = getMismatch(actual[index], expected[index], `${path}[${index}]`)
    if (mismatch) {
      return mismatch
    }
  }
  return undefined
}

const getObjectMismatch = (
  actual: unknown,
  expected: Readonly<Record<string, unknown>>,
  path: string,
): ChatDebugPayloadMismatch | undefined => {
  if (!isObject(actual)) {
    return createMismatch(actual, expected, path, `Expected ${path} to be an object but got ${formatValue(actual)}`)
  }
  for (const key of Object.keys(expected)) {
    if (!Object.hasOwn(actual, key)) {
      return createMismatch(actual[key], expected[key], `${path}.${key}`, `Expected ${path}.${key} to exist`)
    }
    const mismatch = getMismatch(actual[key], expected[key], `${path}.${key}`)
    if (mismatch) {
      return mismatch
    }
  }
  return undefined
}

const getPrimitiveMismatch = (actual: unknown, expected: unknown, path: string): ChatDebugPayloadMismatch | undefined => {
  if (!Object.is(actual, expected)) {
    return createMismatch(actual, expected, path, `Expected ${path} to equal ${formatValue(expected)} but got ${formatValue(actual)}`)
  }
  return undefined
}

export const getMismatch = (actual: unknown, expected: unknown, path = 'payload'): ChatDebugPayloadMismatch | undefined => {
  if (Array.isArray(expected)) {
    return getArrayMismatch(actual, expected, path)
  }
  if (isObject(expected)) {
    return getObjectMismatch(actual, expected, path)
  }
  return getPrimitiveMismatch(actual, expected, path)
}

export const shouldHavePayload = async (state: ChatDebugViewState, match: unknown): Promise<ChatDebugViewState> => {
  if (!state.selectedEvent) {
    throw new Error('Expected selected event to exist')
  }
  const selectedDetailTab = getSelectedDetailTab(state.detailTabs)
  if (selectedDetailTab !== InputName.Payload) {
    throw new Error(`Expected selected detail tab to be payload but got ${selectedDetailTab}`)
  }
  const payload = getPayloadEvent(state.selectedEvent)
  const mismatch = getMismatch(payload, match)
  if (mismatch) {
    throw new ChatDebugPayloadError(mismatch)
  }
  return state
}
