import { expect, test } from '@jest/globals'
import { toSingleQuotedString } from '../src/parts/ToSingleQuotedString/ToSingleQuotedString.ts'

test('toSingleQuotedString should wrap escaped content in single quotes', () => {
  expect(toSingleQuotedString("it's")).toBe("'it\\'s'")
})
