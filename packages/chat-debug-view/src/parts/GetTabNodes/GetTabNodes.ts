import { type VirtualDomNode, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ChatDebugStrings from '../ChatDebugStrings/ChatDebugStrings.ts'
import { ChatDebugViewDetailsTabs } from '../ClassNames/ClassNames.ts'
import { getDetailTabDom } from '../GetDetailTabDom/GetDetailTabDom.ts'

export const getTabNodes = (detailTabs: readonly DetailTab[]): readonly VirtualDomNode[] => {
  return [
    {
      'aria-label': ChatDebugStrings.detailSections(),
      childCount: detailTabs.length,
      className: ChatDebugViewDetailsTabs,
      role: AriaRoles.TabList,
      type: VirtualDomElements.Div,
    },
    ...detailTabs.flatMap(getDetailTabDom),
  ]
}
