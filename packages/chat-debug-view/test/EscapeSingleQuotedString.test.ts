import { expect, test } from '@jest/globals'
import { escapeSingleQuotedString } from '../src/parts/EscapeSingleQuotedString/EscapeSingleQuotedString.ts'

test('escapeSingleQuotedString should escape backslashes and single quotes', () => {
  expect(escapeSingleQuotedString("path\\to\\it's")).toBe("path\\\\to\\\\it\\'s")
})
