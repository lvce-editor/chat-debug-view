import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../src/parts/GetTextNode/LineData/LineData.ts'
import { ChatDebugViewEventLineNumber, Gutter } from '../src/parts/ClassNames/ClassNames.ts'
import { getGutterDom } from '../src/parts/GetGutterDom/GetGutterDom.ts'

const lineData: readonly LineData[] = [
  {
    childCount: 1,
    nodes: [text('first')],
  },
  {
    childCount: 1,
    nodes: [text('second')],
  },
]

test('getGutterDom should render line numbers starting from the provided offset', () => {
  const result = getGutterDom(lineData, true, 4)

  expect(result).toEqual([
    {
      childCount: 2,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewEventLineNumber,
      type: VirtualDomElements.Span,
    },
    text('5'),
    {
      childCount: 1,
      className: ChatDebugViewEventLineNumber,
      type: VirtualDomElements.Span,
    },
    text('6'),
  ])
})

test('getGutterDom should render an empty gutter when line numbers are hidden', () => {
  const result = getGutterDom(lineData, false)

  expect(result).toEqual([
    {
      childCount: 0,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
  ])
})
