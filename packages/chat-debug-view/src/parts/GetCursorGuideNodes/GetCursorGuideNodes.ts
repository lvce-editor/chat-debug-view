import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { ChatDebugViewTimelineCursorGuide, ChatDebugViewTimelineCursorGuideVisible } from '../ClassNames/ClassNames.ts'

export const getCursorGuideNodes = (hoverPercent: number | null): readonly VirtualDomNode[] => {
  return hoverPercent === null
    ? []
    : [
        {
          childCount: 0,
          className: `${ChatDebugViewTimelineCursorGuide} ${ChatDebugViewTimelineCursorGuideVisible}`,
          style: `left:${hoverPercent}%;`,
          type: VirtualDomElements.Div,
        },
      ]
}
