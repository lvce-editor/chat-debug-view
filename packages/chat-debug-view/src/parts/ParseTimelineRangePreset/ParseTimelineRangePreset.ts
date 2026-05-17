export const parseTimelineRangePreset = (value: string): { readonly timelineEndSeconds: string; readonly timelineStartSeconds: string } => {
  if (!value) {
    return {
      timelineEndSeconds: '',
      timelineStartSeconds: '',
    }
  }
  const [timelineStartSeconds = '', timelineEndSeconds = ''] = value.split(':', 2)
  return {
    timelineEndSeconds,
    timelineStartSeconds,
  }
}
