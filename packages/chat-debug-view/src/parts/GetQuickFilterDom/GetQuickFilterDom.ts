import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewQuickFilterPill, ChatDebugViewQuickFilterPillSelected } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const getQuickFilterDom = (categoryFilter: CategoryFilter): readonly VirtualDomNode[] => {
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
