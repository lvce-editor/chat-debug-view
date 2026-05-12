import type { SelectedEventDetailsOpenAiRequestResponse } from '../SelectedEventDetailsOpenAiRequestResponse/SelectedEventDetailsOpenAiRequestResponse.ts'

export interface SelectedEventDetailsBase {
  readonly eventId: number
}

export type SelectedEventDetails = SelectedEventDetailsOpenAiRequestResponse
