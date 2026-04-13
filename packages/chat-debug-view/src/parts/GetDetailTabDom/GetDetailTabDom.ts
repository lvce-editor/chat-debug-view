import { mergeClassNames, type VirtualDomNode, VirtualDomElements, text, AriaRoles } from '@lvce-editor/virtual-dom-worker'
import type { DetailTab } from '../DetailTab/DetailTab.ts'
import { PanelTab, PanelTabSelected } from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { getPanelId } from '../GetPanelId/GetPanelId.ts'

export const getDetailTabDom = (detailTab: DetailTab): readonly VirtualDomNode[] => {
  const { isSelected } = detailTab
  return [
    {
      'aria-controls': getPanelId(detailTab.name),
      ariaSelected: isSelected,
      childCount: 1,
      className: mergeClassNames(PanelTab, isSelected ? PanelTabSelected : ''),
      name: detailTab.name,
      onChange: DomEventListenerFunctions.SelectDetailTab,
      onClick: DomEventListenerFunctions.SelectDetailTab,
      role: AriaRoles.Tab,
      tabIndex: isSelected ? 0 : -1,
      type: VirtualDomElements.Button,
    },
    text(detailTab.label),
  ]
}
