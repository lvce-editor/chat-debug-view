export const General = 'general'
export const RequestHeaders = 'requestHeaders'
export const ResponseHeaders = 'responseHeaders'

export const headerSectionKeys = [General, ResponseHeaders, RequestHeaders] as const

export type HeaderSectionKey = (typeof headerSectionKeys)[number]

export const isHeaderSectionKey = (value: string): value is HeaderSectionKey => {
  return headerSectionKeys.includes(value as HeaderSectionKey)
}
