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
    readonly role?: string
    readonly type?: number
  }[]

  expect(result).toEqual([
    {
      childCount: 1,
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: 'Viewlet Editor',
      role: 'code',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'Gutter',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
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
      childCount: 2,
      className: 'EditorContent',
      type: VirtualDomElements.Div,
    },
    {
      'aria-autocomplete': 'list',
      'aria-multiline': true,
      'aria-roledescription': 'editor',
      autocapitalize: 'off',
      autocomplete: 'off',
      autocorrect: 'off',
      childCount: 0,
      className: 'EditorInput',
      name: 'editor',
      role: 'textbox',
      spellcheck: false,
      type: VirtualDomElements.TextArea,
      wrap: 'off',
    },
    {
      childCount: 2,
      className: 'EditorLayers',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Selections',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: 'EditorSelection',
      style: 'height: 20px; left: 0px; top: 20px; width: 0px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 3,
      className: 'EditorRows',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'EditorRow',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Token TokenText',
      type: VirtualDomElements.Span,
    },
    text('{'),
    {
      childCount: 4,
      className: 'EditorRow',
      type: VirtualDomElements.Div,
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
      childCount: 1,
      className: 'EditorRow',
      type: VirtualDomElements.Div,
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

  expect(result).toContainEqual(
    expect.objectContaining({
      childCount: 1,
      className: 'EditorContainer',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      childCount: 6,
      className: 'Gutter',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result).toContainEqual(
    expect.objectContaining({
      childCount: 6,
      className: 'EditorRows',
      type: VirtualDomElements.Div,
    }),
  )
  expect(result.filter((node) => node.className === 'ChatDebugViewEventLineNumber')).toHaveLength(6)
  expect(result).toContainEqual(expect.objectContaining({ text: '"nested"' }))
  expect(result).toContainEqual(expect.objectContaining({ text: '"count"' }))
  expect(result).toContainEqual(expect.objectContaining({ text: '2' }))
  expect(result).toContainEqual(expect.objectContaining({ text: 'true' }))
  expect(result).toContainEqual(expect.objectContaining({ text: '6' }))
})
