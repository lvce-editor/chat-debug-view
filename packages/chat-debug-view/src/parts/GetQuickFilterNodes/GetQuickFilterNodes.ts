// cspell:ignore multiselectable
import { type VirtualDomNode, VirtualDomElements, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewQuickFilters } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getQuickFilterDom } from '../GetQuickFilterDom/GetQuickFilterDom.ts'

export const getQuickFilterNodes = (categoryFilters: readonly CategoryFilter[]): readonly VirtualDomNode[] => {
  return [
    {
      'aria-multiselectable': true,
      childCount: categoryFilters.length,
      className: ChatDebugViewQuickFilters,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: AriaRoles.ListBox,
      type: VirtualDomElements.Div,
    },
    ...categoryFilters.flatMap(getQuickFilterDom),
  ]
}
