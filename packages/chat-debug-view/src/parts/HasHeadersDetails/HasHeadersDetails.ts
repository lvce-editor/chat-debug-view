import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getHeadersDetails } from '../GetHeadersDetails/GetHeadersDetails.ts'

export const hasHeadersDetails = (event: ChatViewEvent): boolean => {
  return getHeadersDetails(event) !== null
}
