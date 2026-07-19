import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { TokenSegment } from '../GetTokenSegments/GetTokenSegments.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import type { LineData } from './LineData/LineData.ts'
import { TokenText } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getEditorDom, getVirtualizedEditorDom } from '../GetEditorDom/GetEditorDom.ts'

const textNode: VirtualDomNode = {
  childCount: 1,
  className: TokenText,
  type: VirtualDomElements.Span,
}

const getTextLineData = (value: string): readonly LineData[] => {
  const lines = value.split('\n')
  return lines.map((line): LineData => {
    return {
      childCount: 1,
      nodes: [textNode, text(line)],
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

const getLineData = (value: string, tokenSegments?: readonly TokenSegment[]): readonly LineData[] => {
  return tokenSegments ? getTokenLineData(tokenSegments) : getTextLineData(value)
}

export interface TextNodeVirtualizationOptions {
  readonly endLineY: number
  readonly showScrollBar: boolean
  readonly startLineY: number
}

export const getTextNode = (
  value: string,
  showLineNumbers = true,
  cursor: PreviewTextCursor | null = null,
  tokenSegments?: readonly TokenSegment[],
  virtualization?: TextNodeVirtualizationOptions,
): readonly VirtualDomNode[] => {
  const lineData = getLineData(value, tokenSegments)
  if (virtualization) {
    const slicedLineData = lineData.slice(virtualization.startLineY, virtualization.endLineY)
    const visibleCursor =
      cursor && cursor.rowIndex >= virtualization.startLineY && cursor.rowIndex < virtualization.endLineY
        ? {
            ...cursor,
            rowIndex: cursor.rowIndex - virtualization.startLineY,
          }
        : null
    return getVirtualizedEditorDom(
      slicedLineData,
      showLineNumbers,
      visibleCursor,
      showLineNumbers ? DomEventListenerFunctions.HandlePreviewTextPointerDown : undefined,
      {
        lineNumberStart: virtualization.startLineY,
        onScrollBarPointerDown: DomEventListenerFunctions.HandlePreviewTextScrollBarPointerDown,
        onWheel: DomEventListenerFunctions.HandlePreviewTextWheel,
        showScrollBar: virtualization.showScrollBar,
      },
    )
  }
  return getEditorDom(lineData, showLineNumbers, cursor, showLineNumbers ? DomEventListenerFunctions.HandlePreviewTextPointerDown : undefined)
}
