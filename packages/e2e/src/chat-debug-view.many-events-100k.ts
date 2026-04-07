import { createLargeStoredEventsTest } from './parts/CreateLargeStoredEventsTest/CreateLargeStoredEventsTest.ts'

export const name = 'chat-debug-view.many-events-100k'

export const skip = 1

export const test = createLargeStoredEventsTest(100_000)
