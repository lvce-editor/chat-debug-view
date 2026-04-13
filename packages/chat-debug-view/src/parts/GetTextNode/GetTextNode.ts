import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewEventRawText,
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
  TokenText,
} from '../ClassNames/ClassNames.ts'
import { type LineData } from './LineData/LineData.ts'

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

const getEditorTextNode = (lineData: readonly LineData[]): readonly VirtualDomNode[] => {
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
    {
      childCount: 0,
      className: Gutter,
      type: VirtualDomElements.Div,
    },
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

export const getTextNode = (value: string, showLineNumbers = true): readonly VirtualDomNode[] => {
  if (!showLineNumbers) {
    return [
      {
        childCount: 1,
        className: ChatDebugViewEventRawText,
        type: VirtualDomElements.P,
      },
      text(value),
    ]
  }
  const lines = value.split('\n')
  const lineData: readonly LineData[] = lines.map((line): LineData => {
    return {
      childCount: 2,
      nodes: [
        {
          childCount: 1,
          className: TokenText,
          type: VirtualDomElements.Span,
        },
        text(line),
      ],
    }
  })
  return getEditorTextNode(lineData)
}
