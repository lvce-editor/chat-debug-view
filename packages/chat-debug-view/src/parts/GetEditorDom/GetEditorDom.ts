import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
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
  PreviewTextScrollBar,
  PreviewTextScrollBarThumb,
  PreviewVirtualizedEditor,
} from '../ClassNames/ClassNames.ts'
import { getPreviewTextCursorStyle } from '../PreviewTextCursor/PreviewTextCursor.ts'

const defaultEditorCursor: PreviewTextCursor = {
  columnIndex: 0,
  rowIndex: 1,
}

const getEditorSelectionDom = (cursor: PreviewTextCursor | null = defaultEditorCursor): readonly VirtualDomNode[] => {
  const hasCursor = cursor !== null
  return [
    {
      childCount: hasCursor ? 1 : 0,
      className: EditorSelections,
      type: VirtualDomElements.Div,
    },
    ...(hasCursor
      ? [
          {
            childCount: 0,
            className: EditorSelection,
            style: getPreviewTextCursorStyle(cursor),
            type: VirtualDomElements.Div,
          },
        ]
      : []),
  ]
}

const getGutterDom = (lineData: readonly LineData[], showLineNumbers: boolean, lineNumberStart = 0): readonly VirtualDomNode[] => {
  const gutterNodes = showLineNumbers
    ? lineData.flatMap((_, index) => {
        return [
          {
            childCount: 1,
            className: ChatDebugViewEventLineNumber,
            type: VirtualDomElements.Span,
          },
          text(String(lineNumberStart + index + 1)),
        ]
      })
    : []
  return [
    {
      childCount: showLineNumbers ? lineData.length : 0,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
    ...gutterNodes,
  ]
}

const getEditorRowDom = (line: LineData): readonly VirtualDomNode[] => {
  return [
    {
      childCount: line.childCount,
      className: EditorRow,
      type: VirtualDomElements.Div,
    },
    ...line.nodes,
  ]
}

const getEditorRowsDom = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
  return [
    {
      childCount: lineData.length,
      className: EditorRows,
      type: VirtualDomElements.Div,
    },
    ...lineData.flatMap(getEditorRowDom),
  ]
}

export interface VirtualizedEditorOptions {
  readonly lineNumberStart?: number
  readonly onScrollBarPointerDown: number
  readonly onWheel: number
  readonly showScrollBar: boolean
}

export const getEditorDom = (
  lineData: readonly LineData[],
  showLineNumbers = true,
  cursor: PreviewTextCursor | null = defaultEditorCursor,
  onPointerDown?: number,
): readonly VirtualDomNode[] => {
  return [
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
    ...getGutterDom(lineData, showLineNumbers),
    {
      childCount: 2,
      className: EditorContent,
      onPointerDown,
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
    ...getEditorSelectionDom(cursor),
    ...getEditorRowsDom(lineData),
  ]
}

export const getVirtualizedEditorDom = (
  lineData: readonly LineData[],
  showLineNumbers = true,
  cursor: PreviewTextCursor | null = null,
  onPointerDown: number | undefined,
  options: VirtualizedEditorOptions,
): readonly VirtualDomNode[] => {
  const editorChildren = [
    {
      childCount: 2,
      className: EditorViewlet,
      role: 'code',
      type: VirtualDomElements.Div,
    },
    ...getGutterDom(lineData, showLineNumbers, options.lineNumberStart),
    {
      childCount: 2,
      className: EditorContent,
      onPointerDown,
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
    ...getEditorSelectionDom(cursor),
    ...getEditorRowsDom(lineData),
  ]

  return [
    {
      childCount: options.showScrollBar ? 2 : 1,
      className: mergeClassNames(EditorContainer, PreviewVirtualizedEditor),
      onWheel: options.onWheel,
      type: VirtualDomElements.Div,
    },
    ...editorChildren,
    ...(options.showScrollBar
      ? [
          {
            childCount: 1,
            className: PreviewTextScrollBar,
            onPointerDown: options.onScrollBarPointerDown,
            type: VirtualDomElements.Div,
          },
          {
            childCount: 0,
            className: PreviewTextScrollBarThumb,
            type: VirtualDomElements.Div,
          },
        ]
      : []),
  ]
}
