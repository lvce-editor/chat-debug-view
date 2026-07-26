import { join } from 'node:path'
import { root } from './root.ts'

export const threshold = 645_000

export const instantiations = 200_000

export const instantiationsPath = join(root, 'packages', 'chat-debug-view')

export const workerPath = join(root, '.tmp/dist-chat-debug-view/dist/chatDebugViewWorkerMain.js')

export const playwrightPath = new URL('../../../node_modules/playwright/index.mjs', import.meta.url).toString()
