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

const getNumberEnd = (json: string, start: number): number => {
  let i = start
  if (json[i] === '-') {
    i++
  }

  if (json[i] === '0') {
    i++
  } else {
    if (!isDigit(json[i])) {
      return start
    }
    while (isDigit(json[i])) {
      i++
    }
  }

  if (json[i] === '.') {
    const decimalStart = i
    i++
    if (!isDigit(json[i])) {
      return decimalStart
    }
    while (isDigit(json[i])) {
      i++
    }
  }

  if (json[i] === 'e' || json[i] === 'E') {
    const exponentStart = i
    i++
    if (json[i] === '+' || json[i] === '-') {
      i++
    }
    if (!isDigit(json[i])) {
      return exponentStart
    }
    while (isDigit(json[i])) {
      i++
    }
  }

  return i
}

export const forEachTokenSegment = (json: string, onToken: TokenHandler): void => {
  let i = 0
  while (i < json.length) {
    const character = json[i]
    if (character === '"') {
      const start = i
      i++
      while (i < json.length) {
        const currentCharacter = json[i]
        if (currentCharacter === '\\') {
          i += 2
          continue
        }
        if (currentCharacter === '"') {
          i++
          break
        }
        i++
      }
      let lookAheadIndex = i
      while (lookAheadIndex < json.length && isWhitespace(json[lookAheadIndex])) {
        lookAheadIndex++
      }
      const className = json[lookAheadIndex] === ':' ? TokenKey : TokenString
      onToken(className, json.slice(start, i))
      continue
    }

    const numberEnd = getNumberEnd(json, i)
    if (numberEnd > i) {
      onToken(TokenNumeric, json.slice(i, numberEnd))
      i = numberEnd
      continue
    }

    if (json.startsWith('true', i)) {
      onToken(TokenBoolean, 'true')
      i += 4
      continue
    }

    if (json.startsWith('false', i)) {
      onToken(TokenBoolean, 'false')
      i += 5
      continue
    }

    if (json.startsWith('null', i)) {
      onToken(TokenBoolean, 'null')
      i += 4
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
