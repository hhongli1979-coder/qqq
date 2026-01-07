# @v3ai/ui-core

Framework-agnostic core utilities for V3 AI applications.

## Features

- 🤖 **AI Clients**: Gemini and OpenAI integrations
- 💾 **Storage**: localStorage, sessionStorage, IndexedDB
- 🌐 **HTTP**: Type-safe fetch wrapper
- 🎨 **Constants**: Colors and sizes

## Installation

```bash
npm install @v3ai/ui-core
```

## Usage

### AI Clients

```typescript
import { GeminiClient } from '@v3ai/ui-core/ai';

const client = new GeminiClient(process.env.GEMINI_API_KEY);
const response = await client.generate('Hello, world!');
```

### Storage

```typescript
import { localStorage } from '@v3ai/ui-core/storage';

localStorage.set('user', { name: 'John' });
const user = localStorage.get('user');
```

### HTTP

```typescript
import { HTTPClient } from '@v3ai/ui-core/http';

const client = new HTTPClient('https://api.example.com');
const data = await client.get('/users');
```

## License

MIT
