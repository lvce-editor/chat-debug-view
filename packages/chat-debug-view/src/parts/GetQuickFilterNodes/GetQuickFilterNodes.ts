// cspell:ignore multiselectable
import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewQuickFilterPill, ChatDebugViewQuickFilterPillSelected, ChatDebugViewQuickFilters } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

const getQuickFilterDom = (categoryFilter: CategoryFilter): readonly VirtualDomNode[] => {
  const { isSelected, label, name } = categoryFilter
  return [
    {
      ariaSelected: isSelected,
      childCount: 1,
      className: mergeClassNames(ChatDebugViewQuickFilterPill, isSelected ? ChatDebugViewQuickFilterPillSelected : ''),
      name,
      onClick: DomEventListenerFunctions.HandleEventCategoryFilter,
      role: AriaRoles.Option,
      type: VirtualDomElements.Button,
    },
    text(label),
  ]
}

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
