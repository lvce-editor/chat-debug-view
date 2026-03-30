import type { Renderer } from '../Renderer/Renderer.ts'
import * as DiffType from '../DiffType/DiffType.ts'
import * as RenderCss from '../RenderCss/RenderCss.ts'
import * as RenderItems from '../RenderItems/RenderItems.ts'
import { renderIncremental } from '../RenderIncremental/RenderIncremental.ts'

export const getRenderer = (diffType: number): Renderer => {
  switch (diffType) {
    case DiffType.RenderCss:
      return RenderCss.renderCss
    case DiffType.RenderItems:
      return RenderItems.renderItems
    case DiffType.RenderIncremental:
      return renderIncremental
    default:
      throw new Error('unknown renderer')
  }
}
