import { GenerateOptions, AIMessage } from './types';

export class OpenAIClient {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateStream(
    messages: AIMessage[],
    options: GenerateOptions = {}
  ): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch(
      `${this.baseURL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2048,
          top_p: options.topP ?? 0.9,
          stop: options.stopSequences,
          stream: true
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    return response.body!;
  }

  async generate(
    messages: AIMessage[],
    options: GenerateOptions = {}
  ): Promise<string> {
    const response = await fetch(
      `${this.baseURL}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 2048,
          top_p: options.topP ?? 0.9,
          stop: options.stopSequences
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async embedText(text: string): Promise<number[]> {
    const response = await fetch(
      `${this.baseURL}/embeddings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'text-embedding-ada-002',
          input: text
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
  }
}
