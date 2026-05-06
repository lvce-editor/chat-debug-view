// cspell:ignore logprobs
import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ai-response-tokens-tab'

export const test: Test = async ({ ChatDebug, Command, expect, Locator }) => {
  const sessionId = `e2e-session-ai-response-tokens-tab-${Date.now()}`
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await Command.execute('ChatDebug.appendStoredEventForTest', {
    eventId: 4,
    headers: {
      'content-type': 'application/json',
    },
    requestId: 'f9e77fff-3b53-44ec-a177-738c28b0140e',
    sessionId,
    statusCode: 200,
    timestamp: '2026-05-06T08:09:12.229Z',
    toolCalls: [],
    turnId: 'fa5bc854-6952-4470-8b7a-44c304ee7b49',
    type: 'ai-response',
    value: {
      background: false,
      billing: {
        payer: 'openai',
      },
      completed_at: 1_778_054_953,
      created_at: 1_778_054_953,
      error: null,
      frequency_penalty: 0,
      id: 'resp_0e2bccd5ef6f1ef10069faf72959c8819083716aa9d357e91b',
      incomplete_details: null,
      instructions: null,
      max_output_tokens: null,
      max_tool_calls: null,
      metadata: {},
      model: 'gpt-5.4-mini-2026-03-17',
      moderation: null,
      object: 'response',
      output: [
        {
          content: [
            {
              annotations: [],
              logprobs: [],
              text: '4',
              type: 'output_text',
            },
          ],
          id: 'msg_0e2bccd5ef6f1ef10069faf729e320819084ac8bb487e8fc81',
          phase: 'final_answer',
          role: 'assistant',
          status: 'completed',
          type: 'message',
        },
      ],
      parallel_tool_calls: true,
      presence_penalty: 0,
      previous_response_id: null,
      prompt_cache_key: null,
      prompt_cache_retention: 'in_memory',
      reasoning: {
        effort: 'none',
        summary: null,
      },
      safety_identifier: null,
      service_tier: 'default',
      status: 'completed',
      store: true,
      temperature: 1,
      text: {
        format: {
          type: 'text',
        },
        verbosity: 'medium',
      },
      tool_choice: 'auto',
      tools: [],
      top_logprobs: 0,
      top_p: 0.98,
      truncation: 'disabled',
      usage: {
        input_tokens: 224,
        input_tokens_details: {
          cached_tokens: 32,
        },
        output_tokens: 5,
        output_tokens_details: {
          reasoning_tokens: 0,
        },
        total_tokens: 229,
      },
      user: null,
    },
  })
  await ChatDebug.handleClickRefresh()

  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)

  await expect(Locator('.ChatDebugViewDetailsTop [name="tokens"]')).toHaveCount(1)
  await Command.execute('ChatDebug.handleInput', 'detailTab', 'tokens', false)

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')

  await expect(detailsBottom).toContainText('Input Tokens')
  await expect(detailsBottom).toContainText('224')
  await expect(detailsBottom).toContainText('Output Tokens')
  await expect(detailsBottom).toContainText('5')
  await expect(detailsBottom).toContainText('Cached Tokens')
  await expect(detailsBottom).toContainText('32')
}
