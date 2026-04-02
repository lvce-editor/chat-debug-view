export const getEffectiveTimelineRange = (
  timelineStartSeconds: string,
  timelineEndSeconds: string,
  timelineSelectionActive: boolean,
  timelineSelectionAnchorSeconds: string,
  timelineSelectionFocusSeconds: string,
): { readonly endSeconds: string; readonly startSeconds: string } => {
  if (!timelineSelectionActive) {
    return {
      endSeconds: timelineEndSeconds,
      startSeconds: timelineStartSeconds,
    }
  }
  return {
    endSeconds: timelineSelectionFocusSeconds,
    startSeconds: timelineSelectionAnchorSeconds,
  }
}
