import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import {
  EditorContainer,
  EditorContent,
  EditorInput,
  EditorLayers,
  EditorViewlet,
  PreviewTextScrollBar,
  PreviewTextScrollBarThumb,
  PreviewVirtualizedEditor,
} from '../ClassNames/ClassNames.ts'
import { getEditorRowsDom } from '../GetEditorRowsDom/GetEditorRowsDom.ts'
import { getEditorSelectionDom } from '../GetEditorSelectionDom/GetEditorSelectionDom.ts'
import { getGutterDom } from '../GetGutterDom/GetGutterDom.ts'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'

export interface VirtualizedEditorOptions {
  readonly lineNumberStart?: number
  readonly onScrollBarPointerDown: number
  readonly onWheel: number
  readonly showScrollBar: boolean
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
