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
      className: 'Token TokenText',
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
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('  '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"type"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token TokenString',
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
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('}'),
  ])
})

test('getEventNode should preserve numbered rows for nested json values', () => {
  const value = {
    nested: {
      count: 2,
      ok: true,
    },
  }

  const result = GetEventNode.getEventNode(value) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
    readonly text?: string
  }[]

  expect(result).toEqual([
    {
      childCount: 6,
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
      className: 'Token TokenText',
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
      childCount: 3,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('  '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"nested"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': {'),
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
      childCount: 5,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('    '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"count"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token TokenNumeric',
      type: VirtualDomElements.Span,
    },
    text('2'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(','),
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
    text('4'),
    {
      childCount: 4,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('    '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"ok"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token TokenBoolean',
      type: VirtualDomElements.Span,
    },
    text('true'),
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
    text('5'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('  }'),
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
    text('6'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('}'),
  ])
})

test('getEventNode should preserve numbered rows for nested json values', () => {
  const value = {
    nested: {
      count: 2,
      ok: true,
    },
  }

  const result = GetEventNode.getEventNode(value) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
    readonly text?: string
  }[]

  expect(result).toEqual([
    {
      childCount: 6,
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
      className: 'Token TokenText',
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
      childCount: 3,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('  '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"nested"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': {'),
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
      childCount: 5,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('    '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"count"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token TokenNumeric',
      type: VirtualDomElements.Span,
    },
    text('2'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(','),
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
    text('4'),
    {
      childCount: 4,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('    '),
    {
      childCount: 1,
      className: 'Token TokenKey',
      type: VirtualDomElements.Span,
    },
    text('"ok"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': '),
    {
      childCount: 1,
      className: 'Token TokenBoolean',
      type: VirtualDomElements.Span,
    },
    text('true'),
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
    text('5'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('  }'),
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
    text('6'),
    {
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('}'),
  ])
})
