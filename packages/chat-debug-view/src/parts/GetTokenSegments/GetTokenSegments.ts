import { TokenBoolean, TokenKey, TokenNumeric, TokenString, TokenText } from '../ClassNames/ClassNames.ts'

export interface TokenSegment {
  readonly className: string
  readonly value: string
}

interface MutableTokenSegment {
  className: string
  value: string
}

type TokenHandler = (className: string, value: string) => void

const isDigit = (character: string | undefined): boolean => {
  return character !== undefined && character >= '0' && character <= '9'
}

const isWhitespace = (character: string | undefined): boolean => {
  return character === ' ' || character === '\n' || character === '\r' || character === '\t'
}

const getIntegerEnd = (json: string, start: number): number => {
  let i = start
  if (json[i] === '-') {
    i++
  }
  if (json[i] === '0') {
    return i + 1
  }
  if (!isDigit(json[i])) {
    return start
  }
  while (isDigit(json[i])) {
    i++
  }
  return i
}

const getFractionEnd = (json: string, start: number): number => {
  if (json[start] !== '.') {
    return start
  }
  const decimalStart = start
  let i = start + 1
  if (!isDigit(json[i])) {
    return decimalStart
  }
  while (isDigit(json[i])) {
    i++
  }
  return i
}

const getExponentEnd = (json: string, start: number): number => {
  if (json[start] !== 'e' && json[start] !== 'E') {
    return start
  }
  const exponentStart = start
  let i = start + 1
  if (json[i] === '+' || json[i] === '-') {
    i++
  }
  if (!isDigit(json[i])) {
    return exponentStart
  }
  while (isDigit(json[i])) {
    i++
  }
  return i
}

const getWhitespaceEnd = (json: string, start: number): number => {
  let i = start
  while (i < json.length && isWhitespace(json[i])) {
    i++
  }
  return i
}

const getStringEnd = (json: string, start: number): number => {
  let i = start + 1
  while (i < json.length) {
    const currentCharacter = json[i]
    if (currentCharacter === '\\') {
      i += 2
      continue
    }
    if (currentCharacter === '"') {
      return i + 1
    }
    i++
  }
  return i
}

const emitStringToken = (json: string, start: number, onToken: TokenHandler): number => {
  const end = getStringEnd(json, start)
  const lookAheadIndex = getWhitespaceEnd(json, end)
  const className = json[lookAheadIndex] === ':' ? TokenKey : TokenString
  onToken(className, json.slice(start, end))
  return end
}

const getLiteralToken = (json: string, start: number): TokenSegment | undefined => {
  if (json.startsWith('true', start)) {
    return { className: TokenBoolean, value: 'true' }
  }
  if (json.startsWith('false', start)) {
    return { className: TokenBoolean, value: 'false' }
  }
  if (json.startsWith('null', start)) {
    return { className: TokenBoolean, value: 'null' }
  }
  return undefined
}

const getNumberEnd = (json: string, start: number): number => {
  let i = getIntegerEnd(json, start)
  if (i === start) {
    return start
  }
  i = getFractionEnd(json, i)
  i = getExponentEnd(json, i)
  return i
}

export const forEachTokenSegment = (json: string, onToken: TokenHandler): void => {
  let i = 0
  while (i < json.length) {
    const character = json[i]
    if (character === '"') {
      i = emitStringToken(json, i, onToken)
      continue
    }

    const numberEnd = getNumberEnd(json, i)
    if (numberEnd > i) {
      onToken(TokenNumeric, json.slice(i, numberEnd))
      i = numberEnd
      continue
    }

    const literalToken = getLiteralToken(json, i)
    if (literalToken) {
      onToken(literalToken.className, literalToken.value)
      i += literalToken.value.length
      continue
    }

    onToken(TokenText, character)
    i++
  }
}

export const getTokenSegments = (json: string): readonly TokenSegment[] => {
  const segments: MutableTokenSegment[] = []
  forEachTokenSegment(json, (className, value) => {
    if (!value) {
      return
    }
    const lastSegment = segments.at(-1)
    if (lastSegment && lastSegment.className === className) {
      lastSegment.value += value
      return
    }
    segments.push({ className, value })
  })
  return segments
}
