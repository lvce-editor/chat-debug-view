import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getResponseEvent } from '../GetResponseEvent/GetResponseEvent.ts'

export interface TokenUsageDetails {
  readonly cachedTokens?: number
  readonly inputTokens?: number
  readonly outputTokens?: number
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getNumber = (value: Readonly<Record<string, unknown>>, ...keys: readonly string[]): number | undefined => {
  for (const key of keys) {
    if (typeof value[key] === 'number') {
      return value[key]
    }
  }
  return undefined
}

const getUsage = (event: Readonly<ChatViewEvent>): Record<string, unknown> | undefined => {
  const responseEvent = getResponseEvent(event)
  if (isObject(responseEvent) && isObject(responseEvent.usage)) {
    return responseEvent.usage
  }
  if (isObject(responseEvent) && isObject(responseEvent.value) && isObject(responseEvent.value.usage)) {
    return responseEvent.value.usage
  }
  return undefined
}

export const getTokenUsageDetails = (event: Readonly<ChatViewEvent>): TokenUsageDetails | undefined => {
  const usage = getUsage(event)
  if (!usage) {
    return undefined
  }
  const inputTokens = getNumber(usage, 'input_tokens', 'inputTokens')
  const outputTokens = getNumber(usage, 'output_tokens', 'outputTokens')
  let inputTokenDetails: Record<string, unknown> | undefined
  if (isObject(usage.input_tokens_details)) {
    inputTokenDetails = usage.input_tokens_details
  } else if (isObject(usage.inputTokensDetails)) {
    inputTokenDetails = usage.inputTokensDetails
  }
  const cachedTokens = inputTokenDetails
    ? getNumber(inputTokenDetails, 'cached_tokens', 'cachedTokens')
    : getNumber(usage, 'cached_tokens', 'cachedTokens')
  if (inputTokens === undefined && outputTokens === undefined && cachedTokens === undefined) {
    return undefined
  }
  return {
    ...(cachedTokens === undefined ? undefined : { cachedTokens }),
    ...(inputTokens === undefined ? undefined : { inputTokens }),
    ...(outputTokens === undefined ? undefined : { outputTokens }),
  }
}
