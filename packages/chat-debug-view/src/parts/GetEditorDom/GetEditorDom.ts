import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
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
  Row,
} from '../ClassNames/ClassNames.ts'
import { type LineData } from '../GetTextNode/LineData/LineData.ts'

const getEditorSelectionDom = (): readonly VirtualDomNode[] => {
  return [
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
  ]
}

const getGutterDom = (lineData: readonly LineData[], showLineNumbers: boolean): readonly VirtualDomNode[] => {
  const gutterNodes = showLineNumbers
    ? lineData.flatMap((_, index) => {
        return [
          {
            childCount: 1,
            className: Row,
            type: VirtualDomElements.Div,
          },
          {
            childCount: 1,
            className: ChatDebugViewEventLineNumber,
            type: VirtualDomElements.Span,
          },
          text(String(index + 1)),
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

export const getEditorDom = (lineData: readonly LineData[], showLineNumbers = true): readonly VirtualDomNode[] => {
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
    ...getEditorSelectionDom(),
    ...getEditorRowsDom(lineData),
  ]
}
