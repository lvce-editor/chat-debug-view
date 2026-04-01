import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetEventNode from '../src/parts/GetEventNode/GetEventNode.ts'

test('getEventNode should render json details as numbered rows', () => {
  const event = {
    type: 'request',
  }

  const result = GetEventNode.getEventNode(event) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]

  expect(result).toEqual([
    {
      childCount: 3,
      className: 'ChatDebugViewEvent',
      type: VirtualDomElements.Div,
    },
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
    text('1'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'TokenText',
      type: VirtualDomElements.Span,
    },
    text('{'),
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
    text('2'),
    {
      childCount: 4,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'TokenText',
      type: VirtualDomElements.Span,
    },
    text('  '),
    {
      childCount: 1,
      className: 'TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"type"'),
    {
      childCount: 1,
      className: 'TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'TokenString',
      type: VirtualDomElements.Span,
    },
    text('"request"'),
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
    text('3'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'TokenText',
      type: VirtualDomElements.Span,
    },
    text('}'),
  ])
})