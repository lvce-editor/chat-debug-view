import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import {
  ChatDebugViewTimelineSelectionHandle,
  ChatDebugViewTimelineSelectionMarker,
  ChatDebugViewTimelineSelectionMarkerEnd,
  ChatDebugViewTimelineSelectionMarkerStart,
  ChatDebugViewTimelineSelectionRange,
} from '../ClassNames/ClassNames.ts'
import { formatPercent } from '../FormatPercent/FormatPercent.ts'
import * as TimelineSelectionHandleName from '../TimelineSelectionHandleName/TimelineSelectionHandleName.ts'

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
      className: mergeClassNames(
        ChatDebugViewTimelineSelectionHandle,
        ChatDebugViewTimelineSelectionMarker,
        ChatDebugViewTimelineSelectionMarkerStart,
      ),
      name: TimelineSelectionHandleName.Start,
      role: AriaRoles.None,
      style: `left:${formatPercent(selectionStartPercent)};`,
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: mergeClassNames(
        ChatDebugViewTimelineSelectionHandle,
        ChatDebugViewTimelineSelectionMarker,
        ChatDebugViewTimelineSelectionMarkerEnd,
      ),
      name: TimelineSelectionHandleName.End,
      role: AriaRoles.None,
      style: `left:${formatPercent(selectionEndPercent)};`,
      type: VirtualDomElements.Button,
    },
  ]
}
