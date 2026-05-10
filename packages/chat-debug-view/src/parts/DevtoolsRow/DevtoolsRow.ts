import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'

export interface DevtoolsRow {
  readonly event: ChatViewEvent
  readonly index: number
  readonly isErrorStatus: boolean
  readonly isEven: boolean
  readonly isSelected: boolean
}
