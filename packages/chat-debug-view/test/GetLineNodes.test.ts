import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import * as GetLineNodes from '../src/parts/GetLineNodes/GetLineNodes.ts'

test('getLineNodeDom should render numbered row', () => {
  const result = GetLineNodes.getLineNodeDom(
    {
      childCount: 1,
      nodes: [
        {
          childCount: 1,
          className: 'Token TokenText',
          type: VirtualDomElements.Span,
        },
        text('first'),
      ],
    },
    0,
  ) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
    readonly text?: string
  }[]

  expect(result).toEqual([
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
    text('first'),
  ])
})

test('getLineNodes should render numbered rows', () => {
  const result = GetLineNodes.getLineNodes([
    {
      childCount: 1,
      nodes: [
        {
          childCount: 1,
          className: 'Token TokenText',
          type: VirtualDomElements.Span,
        },
        text('first'),
      ],
    },
    {
      childCount: 1,
      nodes: [
        {
          childCount: 1,
          className: 'Token TokenText',
          type: VirtualDomElements.Span,
        },
        text('second'),
      ],
    },
  ]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
    readonly text?: string
  }[]

  expect(result).toEqual([
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
    text('first'),
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
      childCount: 1,
      className: 'ChatDebugViewEventLineContent',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('second'),
  ])
})

test('getLineNodes should preserve content child counts', () => {
  const result = GetLineNodes.getLineNodes([
    {
      childCount: 3,
      nodes: [
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
        text(': {'),
      ],
    },
  ]) as readonly {
    readonly childCount?: number
    readonly className?: string
    readonly type?: number
  }[]

  expect(result).toEqual([
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
    text('"type"'),
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text(': {'),
  ])
})
