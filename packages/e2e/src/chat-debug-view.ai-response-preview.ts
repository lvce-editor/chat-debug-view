import type { Test } from '@lvce-editor/test-with-playwright'

export const name = 'chat-debug-view.ai-response-preview'

export const test: Test = async ({ ChatDebug, expect, Locator }) => {
  const sessionId = 'e2e-session-ai-response-preview'
  await ChatDebug.open(sessionId)
  await expect(Locator('.ChatDebugView')).toBeVisible()

  await ChatDebug.setEvents([
    {
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
        id: 'resp_0e2bccd5ef6f1ef10069faf72959c8819083716aa9d357e91b',
        object: 'response',
        created_at: 1778054953,
        status: 'completed',
        background: false,
        billing: {
          payer: 'openai',
        },
        completed_at: 1778054953,
        error: null,
        frequency_penalty: 0,
        incomplete_details: null,
        instructions: null,
        max_output_tokens: null,
        max_tool_calls: null,
        model: 'gpt-5.4-mini-2026-03-17',
        moderation: null,
        output: [
          {
            id: 'msg_0e2bccd5ef6f1ef10069faf729e320819084ac8bb487e8fc81',
            type: 'message',
            status: 'completed',
            content: [
              {
                type: 'output_text',
                annotations: [],
                logprobs: [],
                text: '4',
              },
            ],
            phase: 'final_answer',
            role: 'assistant',
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
            cached_tokens: 0,
          },
          output_tokens: 5,
          output_tokens_details: {
            reasoning_tokens: 0,
          },
          total_tokens: 229,
        },
        user: null,
        metadata: {},
      },
      eventId: 4,
    },
  ])

  await ChatDebug.useDevtoolsLayout()
  await ChatDebug.selectEventRow(0)
  await ChatDebug.openTabPreview()

  const detailsBottom = Locator('.ChatDebugViewDetailsBottom')
  const rawPreviewText = Locator('.ChatDebugViewEventRawText')
  const lineNumbers = Locator('.ChatDebugViewEventLineNumber')

  await expect(detailsBottom).toHaveText('4')
  await expect(rawPreviewText).toHaveText('4')
  await expect(rawPreviewText).not.toContainText('"model": "gpt-5.4-mini-2026-03-17"')
  await expect(rawPreviewText).not.toContainText('"content-type": "application/json"')
  await expect(rawPreviewText).not.toContainText('"output": [')
  await expect(lineNumbers).toHaveCount(0)
}
