import { mergeClassNames, type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { CategoryFilter } from '../EventCategoryFilter/EventCategoryFilter.ts'
import { ChatDebugViewTop, ChatDebugViewTopDevtools } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetFilterInputDom from '../GetFilterInputDom/GetFilterInputDom.ts'
import { getQuickFilterNodes } from '../GetQuickFilterNodes/GetQuickFilterNodes.ts'
import * as GetRefreshButtonDom from '../GetRefreshButtonDom/GetRefreshButtonDom.ts'

export const getDebugViewTopDom = (
  filterValue: string,
  useDevtoolsLayout: boolean,
  categoryFilters: readonly CategoryFilter[],
): readonly VirtualDomNode[] => {
  const refreshButtonDom = GetRefreshButtonDom.getRefreshButtonDom()
  if (useDevtoolsLayout) {
    const quickFilterNodes = getQuickFilterNodes(categoryFilters)
    return [
      {
        childCount: 2 + (quickFilterNodes.length > 0 ? 1 : 0),
        className: mergeClassNames(ChatDebugViewTop, ChatDebugViewTopDevtools),
        onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
        type: VirtualDomElements.Search,
      },
      GetFilterInputDom.getFilterInputDom(filterValue, true),
      ...quickFilterNodes,
      ...refreshButtonDom,
    ]
  }

  return [
    {
      childCount: 2,
      className: ChatDebugViewTop,
      onContextMenu: DomEventListenerFunctions.HandleHeaderContextMenu,
      type: VirtualDomElements.Search,
    },
    GetFilterInputDom.getFilterInputDom(filterValue, false),
    ...refreshButtonDom,
  ]
}
