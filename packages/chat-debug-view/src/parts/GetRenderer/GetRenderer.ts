import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderCss from '../RenderCss/RenderCss.ts'
import { renderIncremental } from '../RenderIncremental/RenderIncremental.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import { renderFocus } from './RenderFocus.ts'
import { renderFocusContext } from './RenderFocusContext.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderCss:
      return RenderCss.renderCss
    case DiffType.RenderFocus:
      return renderFocus
    case DiffType.RenderFocusContext:
      return renderFocusContext
    case DiffType.RenderIncremental:
      return renderIncremental
    case DiffType.RenderItems:
      return RenderItems.renderItems
    default:
      throw new Error('unknown renderer')
  }
}
