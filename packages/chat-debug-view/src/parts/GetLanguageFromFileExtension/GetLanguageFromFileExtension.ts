export type SyntaxHighlightLanguage = 'css' | 'html' | 'javascript' | 'json' | 'python' | 'typescript'

const extensionToLanguage: Record<string, SyntaxHighlightLanguage> = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  json: 'json',
  py: 'python',
  ts: 'typescript',
}

export const getLanguageFromFileExtension = (uri: string): SyntaxHighlightLanguage | undefined => {
  if (!URL.canParse(uri)) {
    return undefined
  }
  const url = new URL(uri)
  const path = url.pathname.toLowerCase()
  const lastDotIndex = path.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return undefined
  }
  const extension = path.slice(lastDotIndex + 1)
  return extensionToLanguage[extension]
}
