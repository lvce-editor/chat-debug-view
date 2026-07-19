import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { LineData } from '../GetTextNode/LineData/LineData.ts'
import type { PreviewTextCursor } from '../PreviewTextCursor/PreviewTextCursor.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import { EditorContainer, EditorContent, EditorInput, EditorLayers, EditorViewlet } from '../ClassNames/ClassNames.ts'
import { getEditorRowsDom } from '../GetEditorRowsDom/GetEditorRowsDom.ts'
import { getEditorSelectionDom } from '../GetEditorSelectionDom/GetEditorSelectionDom.ts'
import { getGutterDom } from '../GetGutterDom/GetGutterDom.ts'

const editorContainerNode: VirtualDomNode = {
  childCount: 1,
  className: EditorContainer,
  type: VirtualDomElements.Div,
}

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

export { getVirtualizedEditorDom } from '../GetVirtualizedEditorDom/GetVirtualizedEditorDom.ts'
export type { VirtualizedEditorOptions } from '../GetVirtualizedEditorDom/GetVirtualizedEditorDom.ts'

export const getEditorDom = (
  lineData: readonly LineData[],
  showLineNumbers = true,
  cursor?: PreviewTextCursor | null,
  onPointerDown?: number,
): readonly VirtualDomNode[] => {
  return [
    editorContainerNode,
    editorViewletNode,
    ...getGutterDom(lineData, showLineNumbers),
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
}
