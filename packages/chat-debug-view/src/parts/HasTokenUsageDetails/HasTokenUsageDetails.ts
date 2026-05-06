import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getTokenUsageDetails } from '../GetTokenUsageDetails/GetTokenUsageDetails.ts'

export const hasTokenUsageDetails = (event: ChatViewEvent): boolean => {
  return getTokenUsageDetails(event) !== undefined
}