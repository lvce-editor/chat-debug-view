type BasicChatEventMethod = 'POST' | 'GET' | 'DELETE'

export interface BaseBasicChatEvent {
  readonly endId: number
  readonly method: BasicChatEventMethod
  readonly startId: number
}

export interface BasicChatEventRequestResponse extends BaseBasicChatEvent {
  readonly method: 'POST'
  readonly type: 'ai-request-responseT'
}

export interface BasicChatEventRequest {
  readonly method: 'POST'
  readonly type: 'ai-request'
}

// TODO add types for tool call events

export type BasicChatEvent = BasicChatEventRequestResponse | BasicChatEventRequest
