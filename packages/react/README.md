# @v3ai/ui-react

React components for V3 AI applications.

## Features

- 🎨 **40+ Icons**: Beautiful SVG icons
- 🎬 **Animation System**: Motion components and hooks
- 🧩 **UI Components**: Button, Dialog, and more
- 🔧 **React Hooks**: useLocalStorage, useDebounce, useMediaQuery
- 📦 **Tree-shaking**: Only import what you need

## Installation

```bash
npm install @v3ai/ui-react
```

## Usage

### Icons

```tsx
import { Sparkles, Database } from '@v3ai/ui-react/icons';

function App() {
  return (
    <div>
      <Sparkles size={24} color="#3b82f6" />
      <Database size={32} />
    </div>
  );
}
```

### Animation

```tsx
import { Motion } from '@v3ai/ui-react/animation';

function App() {
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 300 }}
    >
      <h1>Hello World</h1>
    </Motion>
  );
}
```

### Components

```tsx
import { Button } from '@v3ai/ui-react/components';
import '@v3ai/ui-react/styles';

function App() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  );
}
```

### Hooks

```tsx
import { useLocalStorage, useDebounce } from '@v3ai/ui-react/hooks';

function App() {
  const [name, setName] = useLocalStorage('name', '');
  const debouncedName = useDebounce(name, 500);

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

## License

MIT
