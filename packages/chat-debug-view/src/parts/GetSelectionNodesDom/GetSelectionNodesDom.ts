import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import {
  ChatDebugViewTimelineSelectionMarker,
  ChatDebugViewTimelineSelectionMarkerEnd,
  ChatDebugViewTimelineSelectionMarkerStart,
  ChatDebugViewTimelineSelectionRange,
} from '../ClassNames/ClassNames.ts'
import { formatPercent } from '../FormatPercent/FormatPercent.ts'

export const getSelectionNodesDom = (
  hasSelection: boolean,
  selectionStartPercent: number | null,
  selectionEndPercent: number | null,
): readonly VirtualDomNode[] => {
  if (!hasSelection || selectionStartPercent === null || selectionEndPercent === null) {
    return []
  }
  return [
    {
      childCount: 0,
      className: ChatDebugViewTimelineSelectionRange,
      style: `left:${formatPercent(selectionStartPercent)};width:${formatPercent(selectionEndPercent - selectionStartPercent)};`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ChatDebugViewTimelineSelectionMarker, ChatDebugViewTimelineSelectionMarkerStart),
      style: `left:${formatPercent(selectionStartPercent)};`,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      className: mergeClassNames(ChatDebugViewTimelineSelectionMarker, ChatDebugViewTimelineSelectionMarkerEnd),
      style: `left:${formatPercent(selectionEndPercent)};`,
      type: VirtualDomElements.Div,
    },
  ]
}
