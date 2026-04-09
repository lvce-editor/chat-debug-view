import { terminate } from '@lvce-editor/viewlet-registry'
import * as Create from '../Create/Create.ts'
import { diff2 } from '../Diff2/Diff2.ts'
import { getMenuIds } from '../GetMenuIds/GetMenuIds.ts'
import * as HandleCloseDetails from '../HandleCloseDetails/HandleCloseDetails.ts'
import * as HandleDetailsContextMenu from '../HandleDetailsContextMenu/HandleDetailsContextMenu.ts'
import * as HandleDetailTab from '../HandleDetailTab/HandleDetailTab.ts'
import * as HandleEventCategoryFilter from '../HandleEventCategoryFilter/HandleEventCategoryFilter.ts'
import * as HandleEventRowClick from '../HandleEventRowClick/HandleEventRowClick.ts'
import * as HandleHeaderContextMenu from '../HandleHeaderContextMenu/HandleHeaderContextMenu.ts'
import * as HandleInput from '../HandleInput/HandleInput.ts'
import * as HandleSashPointerDown from '../HandleSashPointerDown/HandleSashPointerDown.ts'
import * as HandleSashPointerMove from '../HandleSashPointerMove/HandleSashPointerMove.ts'
import * as HandleSashPointerUp from '../HandleSashPointerUp/HandleSashPointerUp.ts'
import * as HandleTableBodyContextMenu from '../HandleTableBodyContextMenu/HandleTableBodyContextMenu.ts'
import * as HandleTimelineDoubleClick from '../HandleTimelineDoubleClick/HandleTimelineDoubleClick.ts'
import * as HandleTimelineInput from '../HandleTimelineInput/HandleTimelineInput.ts'
import * as HandleTimelinePointerDown from '../HandleTimelinePointerDown/HandleTimelinePointerDown.ts'
import * as HandleTimelinePointerMove from '../HandleTimelinePointerMove/HandleTimelinePointerMove.ts'
import * as HandleTimelinePointerUp from '../HandleTimelinePointerUp/HandleTimelinePointerUp.ts'
import * as HandleUseDevtoolsLayout from '../HandleUseDevtoolsLayout/HandleUseDevtoolsLayout.ts'
import * as HandleVisibilityToggles from '../HandleVisibilityToggles/HandleVisibilityToggles.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as Refresh from '../Refresh/Refresh.ts'
import { render2 } from '../Render2/Render2.ts'
import { renderEventListeners } from '../RenderEventListeners/RenderEventListeners.ts'
import * as Rerender from '../Rerender/Rerender.ts'
import * as Resize from '../Resize/Resize.ts'
import { saveState } from '../SaveState/SaveState.ts'
import * as SetEvents from '../SetEvents/SetEvents.ts'
import * as SetSessionId from '../SetSessionId/SetSessionId.ts'
import { getCommandIds, wrapCommand, wrapGetter } from '../State/ChatDebugViewStates.ts'

export const commandMap = {
  'ChatDebug.create': Create.create,
  'ChatDebug.diff2': diff2,
  'ChatDebug.getCommandIds': getCommandIds,
  'ChatDebug.getMenuIds': getMenuIds,
  'ChatDebug.handleCloseDetails': wrapCommand(HandleCloseDetails.handleCloseDetails),
  'ChatDebug.handleDetailsContextMenu': wrapCommand(HandleDetailsContextMenu.handleDetailsContextMenu),
  'ChatDebug.handleDetailTab': wrapCommand(HandleDetailTab.handleDetailTab),
  'ChatDebug.handleEventCategoryFilter': wrapCommand(HandleEventCategoryFilter.handleEventCategoryFilter),
  'ChatDebug.handleEventRowClick': wrapCommand(HandleEventRowClick.handleEventRowClick),
  'ChatDebug.handleHeaderContextMenu': wrapCommand(HandleHeaderContextMenu.handleHeaderContextMenu),
  'ChatDebug.handleInput': wrapCommand(HandleInput.handleInput),
  'ChatDebug.handleSashPointerDown': wrapCommand(HandleSashPointerDown.handleSashPointerDown),
  'ChatDebug.handleSashPointerMove': wrapCommand(HandleSashPointerMove.handleSashPointerMove),
  'ChatDebug.handleSashPointerUp': wrapCommand(HandleSashPointerUp.handleSashPointerUp),
  'ChatDebug.handleShowEventStreamFinishedEvents': wrapCommand(HandleVisibilityToggles.handleShowEventStreamFinishedEvents),
  'ChatDebug.handleShowInputEvents': wrapCommand(HandleVisibilityToggles.handleShowInputEvents),
  'ChatDebug.handleShowResponsePartEvents': wrapCommand(HandleVisibilityToggles.handleShowResponsePartEvents),
  'ChatDebug.handleTableBodyContextMenu': wrapCommand(HandleTableBodyContextMenu.handleTableBodyContextMenu),
  'ChatDebug.handleTimelineDoubleClick': wrapCommand(HandleTimelineDoubleClick.handleTimelineDoubleClick),
  'ChatDebug.handleTimelineEndSeconds': wrapCommand(HandleTimelineInput.handleTimelineEndSeconds),
  'ChatDebug.handleTimelinePointerDown': wrapCommand(HandleTimelinePointerDown.handleTimelinePointerDown),
  'ChatDebug.handleTimelinePointerMove': wrapCommand(HandleTimelinePointerMove.handleTimelinePointerMove),
  'ChatDebug.handleTimelinePointerUp': wrapCommand(HandleTimelinePointerUp.handleTimelinePointerUp),
  'ChatDebug.handleTimelineRangePreset': wrapCommand(HandleTimelineInput.handleTimelineRangePreset),
  'ChatDebug.handleTimelineStartSeconds': wrapCommand(HandleTimelineInput.handleTimelineStartSeconds),
  'ChatDebug.handleUseDevtoolsLayout': wrapCommand(HandleUseDevtoolsLayout.handleUseDevtoolsLayout),
  'ChatDebug.loadContent': wrapCommand(LoadContent.loadContent),
  'ChatDebug.loadContent2': wrapCommand(LoadContent.loadContent),
  'ChatDebug.refresh': wrapCommand(Refresh.refresh),
  'ChatDebug.render2': render2,
  'ChatDebug.renderEventListeners': renderEventListeners,
  'ChatDebug.rerender': wrapCommand(Rerender.rerender),
  'ChatDebug.resize': wrapCommand(Resize.resize),
  'ChatDebug.saveState': wrapGetter(saveState),
  'ChatDebug.setEvents': wrapCommand(SetEvents.setEvents),
  'ChatDebug.setSessionId': wrapCommand(SetSessionId.setSessionId),
  'ChatDebug.terminate': terminate,
}
