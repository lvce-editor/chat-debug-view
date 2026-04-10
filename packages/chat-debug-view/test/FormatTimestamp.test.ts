import { expect, jest, test } from '@jest/globals'

test('formatTimestamp should lazily create and cache the timestamp formatter', async () => {
  const originalDateTimeFormat = Intl.DateTimeFormat
  let createCount = 0

  const WrappedDateTimeFormat = function (...args: Readonly<ConstructorParameters<typeof Intl.DateTimeFormat>>): Intl.DateTimeFormat {
    createCount++
    return Reflect.construct(originalDateTimeFormat, args, new.target ?? originalDateTimeFormat)
  } as typeof Intl.DateTimeFormat

  WrappedDateTimeFormat.supportedLocalesOf = originalDateTimeFormat.supportedLocalesOf.bind(originalDateTimeFormat)
  WrappedDateTimeFormat.prototype = originalDateTimeFormat.prototype

  Object.defineProperty(Intl, 'DateTimeFormat', {
    configurable: true,
    value: WrappedDateTimeFormat,
    writable: true,
  })

  jest.resetModules()

  try {
    const { formatTimestamp } = await import('../src/parts/FormatTimestamp/FormatTimestamp.ts')
    const first = formatTimestamp(new Date('2026-03-08T00:00:01.250Z'))
    const second = formatTimestamp(new Date('2026-03-08T00:00:02.500Z'))

    expect(first).toBe('Mar 08, 2026, 00:00:01.250 UTC')
    expect(second).toBe('Mar 08, 2026, 00:00:02.500 UTC')
    expect(createCount).toBe(1)
  } finally {
    Object.defineProperty(Intl, 'DateTimeFormat', {
      configurable: true,
      value: originalDateTimeFormat,
      writable: true,
    })
    jest.resetModules()
  }
})
