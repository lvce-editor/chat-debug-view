const trailingZeroFractionRegex = /\.0+$/
const trailingFractionZeroRegex = /(\.\d*?)0+$/

export const formatTimelinePresetValue = (value: number): string => {
  return value.toFixed(3).replace(trailingZeroFractionRegex, '').replace(trailingFractionZeroRegex, '$1')
}
