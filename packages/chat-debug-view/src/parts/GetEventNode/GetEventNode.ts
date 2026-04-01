import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { getTokenSegments } from '../GetTokenSegments/GetTokenSegments.ts'

interface TokenSegment {
  readonly className: string
  readonly value: string
}

const getJsonLines = (value: unknown): readonly (readonly TokenSegment[])[] => {
  const json = JSON.stringify(value, null, 2)
  if (!json) {
    return [[{ className: 'TokenText', value: String(json) }]]
  }
  const segments = getTokenSegments(json)
  const lines: TokenSegment[][] = []
  let currentLine: TokenSegment[] = []
  for (const segment of segments) {
    const parts = segment.value.split('\n')
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      if (part) {
        currentLine.push({
          className: segment.className,
          value: part,
        })
      }
      if (i < parts.length - 1) {
        lines.push(currentLine)
        currentLine = []
      }
    }
  }
  lines.push(currentLine)
  return lines
}

const getLineContentNodes = (line: readonly TokenSegment[]): readonly VirtualDomNode[] => {
  return line.flatMap((segment) => {
    return [
      {
        childCount: 1,
        className: segment.className,
        type: VirtualDomElements.Span,
      },
      text(segment.value),
    ]
  })
}

const getLineNodes = (lines: readonly (readonly TokenSegment[])[]): readonly VirtualDomNode[] => {
  return lines.flatMap((line, index) => {
    const lineContentNodes = getLineContentNodes(line)
    return [
      {
        childCount: 2,
        className: 'row',
        type: VirtualDomElements.Div,
      },
      {
        childCount: 1,
        className: 'ChatDebugViewEventLineNumber',
        type: VirtualDomElements.Span,
      },
      text(String(index + 1)),
      {
        childCount: lineContentNodes.length / 2,
        className: 'ChatDebugViewEventLineContent',
        type: VirtualDomElements.Span,
      },
      ...lineContentNodes,
    ]
  })
}

export const getEventNode = (event: ChatViewEvent): readonly VirtualDomNode[] => {
  const renderedEvent = {
    ...event,
    type: getEventTypeLabel(event),
  }
  const lines = getJsonLines(renderedEvent)
  const lineNodes = getLineNodes(lines)
  return [
    {
      childCount: lines.length,
      className: 'ChatDebugViewEvent',
      type: VirtualDomElements.Div,
    },
    ...lineNodes,
  ]
}
