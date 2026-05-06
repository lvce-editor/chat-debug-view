import { expect, test } from '@jest/globals'
import { VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../src/parts/GetTextNode/LineData/LineData.ts'
import {
  ChatDebugViewEventLineNumber,
  EditorContainer,
  EditorContent,
  EditorInput,
  EditorLayers,
  EditorRow,
  EditorRows,
  EditorSelection,
  EditorSelections,
  EditorViewlet,
  Gutter,
} from '../src/parts/ClassNames/ClassNames.ts'
import { getEditorDom } from '../src/parts/GetEditorDom/GetEditorDom.ts'

test('getEditorDom should render the non-virtualized editor DOM', () => {
  const lineData: readonly LineData[] = [
    {
      childCount: 1,
      nodes: [text('hello')],
    },
  ]

  const result = getEditorDom(lineData)

  expect(result).toEqual([
    {
      childCount: 1,
      className: EditorContainer,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: EditorViewlet,
      role: 'code',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ChatDebugViewEventLineNumber,
      type: VirtualDomElements.Span,
    },
    text('1'),
    {
      childCount: 2,
      className: EditorContent,
      onPointerDown: undefined,
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
      className: EditorInput,
      name: 'editor',
      role: 'textbox',
      spellcheck: false,
      type: VirtualDomElements.TextArea,
      wrap: 'off',
    },
    {
      childCount: 2,
      className: EditorLayers,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: EditorSelection,
      style: 'height: 20px; left: 0px; top: 20px; width: 0px;',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: EditorRows,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    text('hello'),
  ])
})
