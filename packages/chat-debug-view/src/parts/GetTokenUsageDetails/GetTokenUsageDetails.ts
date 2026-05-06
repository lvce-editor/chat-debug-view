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

const getNumber = (value: Record<string, unknown>, ...keys: readonly string[]): number | undefined => {
  for (const key of keys) {
    if (typeof value[key] === 'number') {
      return value[key]
    }
  }
  return undefined
}

const getUsage = (event: ChatViewEvent): Record<string, unknown> | undefined => {
  const responseEvent = getResponseEvent(event)
  if (isObject(responseEvent) && isObject(responseEvent.usage)) {
    return responseEvent.usage
  }
  if (isObject(responseEvent) && isObject(responseEvent.value) && isObject(responseEvent.value.usage)) {
    return responseEvent.value.usage
  }
  return undefined
}

export const getTokenUsageDetails = (event: ChatViewEvent): TokenUsageDetails | undefined => {
  const usage = getUsage(event)
  if (!usage) {
    return undefined
  }
  const inputTokens = getNumber(usage, 'input_tokens', 'inputTokens')
  const outputTokens = getNumber(usage, 'output_tokens', 'outputTokens')
  const inputTokenDetails = isObject(usage.input_tokens_details)
    ? usage.input_tokens_details
    : isObject(usage.inputTokensDetails)
      ? usage.inputTokensDetails
      : undefined
  const cachedTokens = inputTokenDetails
    ? getNumber(inputTokenDetails, 'cached_tokens', 'cachedTokens')
    : getNumber(usage, 'cached_tokens', 'cachedTokens')
  if (inputTokens === undefined && outputTokens === undefined && cachedTokens === undefined) {
    return undefined
  }
  return {
    cachedTokens,
    inputTokens,
    outputTokens,
  }
}
