export interface InputItem {
  content: string
  role: string
}

export interface Body {
  input: InputItem[]
  model: string
}

export interface Headers {
  readonly [key: string]: string
}

export interface ContentItem {
  annotations: unknown[]
  text: string
  type: string
}

export interface OutputItem {
  content: ContentItem[]
  id: string
  role: string
  status: string
  type: string
}

export interface Value {
  created_at: number
  id: string
  model: string
  object: string
  output: OutputItem[]
  output_text: string
  parallel_tool_calls: boolean
  status: string
  tools: unknown[]
}

export interface EndValue {
  eventId: number
  headers: Headers
  requestId: string
  sessionId: string
  statusCode: number
  timestamp: string
  toolCalls: unknown[]
  turnId: string
  type: string
  value: Value
}

export interface SelectedEventDetailsOpenAiRequestResponse {
  readonly body: Body
  readonly endValue: EndValue
  readonly eventId: number
  readonly headers: Headers
  readonly method: string
  readonly requestId: string
  readonly sessionId: string
  readonly timestamp: string
  readonly turnId: string
  readonly type: string
}
