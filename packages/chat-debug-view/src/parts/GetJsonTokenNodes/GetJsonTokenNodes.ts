import { type VirtualDomNode, VirtualDomElements, text } from '@lvce-editor/virtual-dom-worker'
import { TokenText } from '../ClassNames/ClassNames.ts'
import { getTokenSegments } from '../GetTokenSegments/GetTokenSegments.ts'

export const getJsonTokenNodes = (value: unknown): readonly VirtualDomNode[] => {
  const json = JSON.stringify(value, null, 2)
  if (!json) {
    return [
      {
        childCount: 1,
        className: TokenText,
        type: VirtualDomElements.Span,
      },
      text(String(json)),
    ]
  }
  const segments = getTokenSegments(json)
  return segments.flatMap((segment) => {
    return [
      {
        childCount: 1,
        className: segment.className,
        type: VirtualDomElements.Span,
      },
      text(segment.value),
    ]
  })
}
