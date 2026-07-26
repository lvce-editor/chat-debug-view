import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
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

const editorViewletNode: VirtualDomNode = {
  childCount: 2,
  className: EditorViewlet,
  role: AriaRoles.Code,
  type: VirtualDomElements.Div,
}

const editorInputNode: VirtualDomNode = {
  'aria-autocomplete': 'list',
  'aria-multiline': true,
  'aria-roledescription': 'editor',
  autocapitalize: 'off',
  autocomplete: 'off',
  autocorrect: 'off',
  childCount: 0,
  className: EditorInput,
  name: 'editor',
  role: AriaRoles.TextBox,
  spellcheck: false,
  type: VirtualDomElements.TextArea,
  wrap: 'off',
}

const editorLayersNode: VirtualDomNode = {
  childCount: 2,
  className: EditorLayers,
  type: VirtualDomElements.Div,
}

const previewTextScrollBarThumbNode: VirtualDomNode = {
  childCount: 0,
  className: PreviewTextScrollBarThumb,
  type: VirtualDomElements.Div,
}

export interface VirtualizedEditorOptions {
  readonly lineNumberStart?: number
  readonly onScrollBarPointerDown: number
  readonly onWheel: number
  readonly showScrollBar: boolean
}

const getScrollBarNodes = (options: VirtualizedEditorOptions): readonly VirtualDomNode[] => {
  if (!options.showScrollBar) {
    return []
  }
  return [
    {
      childCount: 1,
      className: PreviewTextScrollBar,
      onPointerDown: options.onScrollBarPointerDown,
      type: VirtualDomElements.Div,
    },
    previewTextScrollBarThumbNode,
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
    editorViewletNode,
    ...getGutterDom(lineData, showLineNumbers, options.lineNumberStart),
    {
      childCount: 2,
      className: EditorContent,
      onPointerDown,
      type: VirtualDomElements.Div,
    },
    editorInputNode,
    editorLayersNode,
    ...getEditorSelectionDom(cursor),
    ...getEditorRowsDom(lineData),
  ]
  const scrollBarNodes = getScrollBarNodes(options)

  return [
    {
      childCount: options.showScrollBar ? 2 : 1,
      className: mergeClassNames(EditorContainer, PreviewVirtualizedEditor),
      onWheel: options.onWheel,
      type: VirtualDomElements.Div,
    },
    ...editorChildren,
    ...scrollBarNodes,
  ]
}
