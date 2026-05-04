import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import type { LineData } from './LineData/LineData.ts'
import { TokenText } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEditorDom } from '../GetEditorDom/GetEditorDom.ts'

const getTextLineData = (value: string): readonly LineData[] => {
  const lines = value.split('\n')
  return lines.map((line): LineData => {
    return {
      childCount: 1,
      nodes: [
        {
          childCount: 1,
          className: TokenText,
          type: VirtualDomElements.Span,
        },
        text(line),
      ],
    }
  })
}

const getTokenLineData = (tokenSegments: readonly TokenSegment[]): readonly LineData[] => {
  const lineData: LineData[] = []
  let currentNodes: VirtualDomNode[] = []
  let childCount = 0

  const pushLine = (): void => {
    lineData.push({
      childCount,
      nodes: currentNodes,
    })
    currentNodes = []
    childCount = 0
  }

  const pushSegment = (className: string, segmentValue: string): void => {
    if (!segmentValue) {
      return
    }
    currentNodes.push(
      {
        childCount: 1,
        className,
        type: VirtualDomElements.Span,
      },
      text(segmentValue),
    )
    childCount++
  }

  for (const segment of tokenSegments) {
    let start = 0
    for (let i = 0; i < segment.value.length; i++) {
      if (segment.value[i] !== '\n') {
        continue
      }
      pushSegment(segment.className, segment.value.slice(start, i))
      pushLine()
      start = i + 1
    }
    pushSegment(segment.className, segment.value.slice(start))
  }

  if (lineData.length === 0 || currentNodes.length > 0) {
    pushLine()
  }
  return lineData
}

export const getTextNode = (
  value: string,
  showLineNumbers = true,
  cursor: PreviewTextCursor | null = null,
  tokenSegments?: readonly TokenSegment[],
): readonly VirtualDomNode[] => {
  const lineData = tokenSegments ? getTokenLineData(tokenSegments) : getTextLineData(value)
  return getEditorDom(lineData, showLineNumbers, cursor, showLineNumbers ? DomEventListenerFunctions.HandlePreviewTextPointerDown : undefined)
}
