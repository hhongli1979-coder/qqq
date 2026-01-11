import 'dotenv/config';
import OpenAI from 'openai';

// Type definitions for dynamic response structure
interface ContentItem {
  type: string;
  text?: string;
}

interface ResponseItem {
  content?: ContentItem[];
}

interface ExtendedResponse {
  output?: ResponseItem[];
  usage?: any;
  finish_reason?: string;
}

async function main() {
  const key = process.env.AI_GATEWAY_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) {
    console.error('Missing API key. Set AI_GATEWAY_API_KEY or OPENAI_API_KEY in .env');
    process.exit(1);
  }

  const client = new OpenAI({ apiKey: key });

  // Use the Responses API (non-streaming) for compatibility across SDK versions.
  const res = await client.responses.create({
    model: 'gpt-4.1',
    input: 'Invent a new holiday and describe its traditions.',
  });

  // Collect text from response outputs
  let out = '';
  const extendedRes = res as unknown as ExtendedResponse;
  
  if (Array.isArray(res.output)) {
    for (const item of res.output) {
      // Cast to our type definition
      const typedItem = item as unknown as ResponseItem;
      if (typedItem.content) {
        for (const c of typedItem.content) {
          if (c.type === 'output_text' && typeof c.text === 'string') out += c.text;
        }
      }
    }
  } else if (extendedRes.output?.[0]?.content?.[0]?.text) {
    out = extendedRes.output[0].content[0].text;
  }

  console.log(out.trim());
  // Print some usage/metadata if available
  try {
    // new SDK may include token usage under `usage` or `meta`
    // we print whatever we find for debugging
    if (extendedRes.usage) console.log('Token usage:', extendedRes.usage);
    if (extendedRes.finish_reason) console.log('Finish reason:', extendedRes.finish_reason);
  } catch (e) {
    // ignore
  }
}

main().catch(console.error);
