import * as I18nString from '@lvce-editor/i18n'
import * as UiStrings from '../UiStrings/UiStrings.ts'

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const status = (): string => {
  return I18nString.i18nString(UiStrings.Status)
}

export const all = (): string => {
  return I18nString.i18nString(UiStrings.All)
}

export const closeDetails = (): string => {
  return I18nString.i18nString(UiStrings.CloseDetails)
}

export const detailSections = (): string => {
  return I18nString.i18nString(UiStrings.DetailSections)
}

export const duration = (): string => {
  return I18nString.i18nString(UiStrings.Duration)
}

export const ended = (): string => {
  return I18nString.i18nString(UiStrings.Ended)
}

export const failedToLoadChatDebugSession = (sessionId: string): string => {
  return I18nString.i18nString(UiStrings.FailedToLoadChatDebugSession, {
    PH1: sessionId,
  })
}

export const failedToLoadChatDebugSessionWithError = (sessionId: string, errorMessage: string): string => {
  return I18nString.i18nString(UiStrings.FailedToLoadChatDebugSessionWithError, {
    PH1: sessionId,
    PH2: errorMessage,
  })
}

export const filterEvents = (): string => {
  return I18nString.i18nString(UiStrings.FilterEvents)
}

export const fromSeconds = (seconds: string): string => {
  return I18nString.i18nString(UiStrings.FromSeconds, {
    PH1: seconds,
  })
}

export const invalidSessionId = (): string => {
  return I18nString.i18nString(UiStrings.InvalidSessionId)
}

export const invalidUriEncoding = (): string => {
  return I18nString.i18nString(UiStrings.InvalidUriEncoding)
}

export const invalidUriFormat = (): string => {
  return I18nString.i18nString(UiStrings.InvalidUriFormat)
}

export const missingUri = (): string => {
  return I18nString.i18nString(UiStrings.MissingUri)
}

export const network = (): string => {
  return I18nString.i18nString(UiStrings.Network)
}

export const noChatSessionFound = (sessionId: string): string => {
  return I18nString.i18nString(UiStrings.NoChatSessionFound, {
    PH1: sessionId,
  })
}

export const noEventsFound = (): string => {
  return I18nString.i18nString(UiStrings.NoEventsFound)
}

export const noEventsFoundMatching = (filterDescription: string): string => {
  return I18nString.i18nString(UiStrings.NoEventsFoundMatching, {
    PH1: filterDescription,
  })
}

export const noToolCallEvents = (): string => {
  return I18nString.i18nString(UiStrings.NoToolCallEvents)
}

export const preview = (): string => {
  return I18nString.i18nString(UiStrings.Preview)
}

export const refresh = (): string => {
  return I18nString.i18nString(UiStrings.Refresh)
}

export const refreshEvents = (): string => {
  return I18nString.i18nString(UiStrings.RefreshEvents)
}

export const resetColumns = (): string => {
  return I18nString.i18nString(UiStrings.ResetColumns)
}

export const response = (): string => {
  return I18nString.i18nString(UiStrings.Response)
}

export const secondsRange = (start: string, end: string): string => {
  return I18nString.i18nString(UiStrings.SecondsRange, {
    PH1: start,
    PH2: end,
  })
}

export const started = (): string => {
  return I18nString.i18nString(UiStrings.Started)
}

export const stream = (): string => {
  return I18nString.i18nString(UiStrings.Stream)
}

export const timing = (): string => {
  return I18nString.i18nString(UiStrings.Timing)
}

export const toSeconds = (seconds: string): string => {
  return I18nString.i18nString(UiStrings.ToSeconds, {
    PH1: seconds,
  })
}

export const tools = (): string => {
  return I18nString.i18nString(UiStrings.Tools)
}

export const type = (): string => {
  return I18nString.i18nString(UiStrings.Type)
}

export const ui = (): string => {
  return I18nString.i18nString(UiStrings.Ui)
}

export const unableToLoadDebugSessionInvalidUri = (uri: string): string => {
  return I18nString.i18nString(UiStrings.UnableToLoadDebugSessionInvalidUri, {
    PH1: uri,
  })
}

export const unableToLoadDebugSessionMissingUri = (): string => {
  return I18nString.i18nString(UiStrings.UnableToLoadDebugSessionMissingUri)
}

export const windowSummary = (start: string, end: string, duration: string): string => {
  return I18nString.i18nString(UiStrings.WindowSummary, {
    PH1: start,
    PH2: end,
    PH3: duration,
  })
}
