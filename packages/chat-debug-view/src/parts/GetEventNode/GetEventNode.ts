import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { ChatViewEvent } from '../ChatViewEvent/ChatViewEvent.ts'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import type { TokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'
import { TokenText } from '../ClassNames/ClassNames.ts'
import { getEditorDom } from '../GetEditorDom/GetEditorDom.ts'
import { getEventTypeLabel } from '../GetEventTypeLabel/GetEventTypeLabel.ts'
import { forEachTokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'

interface MutableTokenSegment {
  className: string
  value: string
}

const getJsonLines = (value: unknown): readonly (readonly TokenSegment[])[] => {
  const json = JSON.stringify(value, null, 2)
  if (!json) {
    return [[{ className: TokenText, value: String(json) }]]
  }
  const lines: TokenSegment[][] = []
  let currentLine: MutableTokenSegment[] = []
  const pushLineSegment = (className: string, lineValue: string): void => {
    if (!lineValue) {
      return
    }
    const lastSegment = currentLine.at(-1)
    if (lastSegment && lastSegment.className === className) {
      lastSegment.value += lineValue
      return
    }
    currentLine.push({ className, value: lineValue })
  }
  forEachTokenSegment(json, (className, segmentValue) => {
    let start = 0
    for (let i = 0; i < segmentValue.length; i++) {
      if (segmentValue[i] === '\n') {
        pushLineSegment(className, segmentValue.slice(start, i))
        lines.push(currentLine)
        currentLine = []
        start = i + 1
      }
    }
    pushLineSegment(className, segmentValue.slice(start))
  })
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

const isChatViewEvent = (value: unknown): value is ChatViewEvent => {
  return typeof value === 'object' && value !== null && typeof (value as ChatViewEvent).type === 'string'
}

export const getEventNode = (value: unknown): readonly VirtualDomNode[] => {
  const renderedValue = isChatViewEvent(value)
    ? {
        ...value,
        type: getEventTypeLabel(value),
      }
    : value
  const lines = getJsonLines(renderedValue)
  const lineData: readonly LineData[] = lines.map((line) => {
    const lineContentNodes = getLineContentNodes(line)
    return {
      childCount: lineContentNodes.length / 2,
      nodes: lineContentNodes,
    }
  })
  return getEditorDom(lineData)
}
