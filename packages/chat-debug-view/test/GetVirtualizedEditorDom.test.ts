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
  EditorSelections,
  EditorViewlet,
  Gutter,
  PreviewTextScrollBar,
  PreviewTextScrollBarThumb,
  PreviewVirtualizedEditor,
} from '../src/parts/ClassNames/ClassNames.ts'
import { getVirtualizedEditorDom } from '../src/parts/GetVirtualizedEditorDom/GetVirtualizedEditorDom.ts'

test('getVirtualizedEditorDom should render the editor with a scrollbar when requested', () => {
  const lineData: readonly LineData[] = [
    {
      childCount: 1,
      nodes: [text('virtual')],
    },
  ]

  const result = getVirtualizedEditorDom(lineData, true, null, 11, {
    lineNumberStart: 9,
    onScrollBarPointerDown: 12,
    onWheel: 13,
    showScrollBar: true,
  })

  expect(result).toEqual([
    {
      childCount: 2,
      className: `${EditorContainer} ${PreviewVirtualizedEditor}`,
      onWheel: 13,
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
    text('10'),
    {
      childCount: 2,
      className: EditorContent,
      onPointerDown: 11,
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
      childCount: 0,
      className: EditorSelections,
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
    text('virtual'),
    {
      childCount: 1,
      className: PreviewTextScrollBar,
      onPointerDown: 12,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: PreviewTextScrollBarThumb,
      type: VirtualDomElements.Div,
    },
  ])
})
