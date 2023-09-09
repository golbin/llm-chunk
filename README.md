# LLM Chunk

Super simple and easy-to-use text splitter for Node.js

Perfect for quickly building LLM prototypes or small-scale applications in Node.js.

With a compressed (ZIP) file size of just 1KB.

## Installation

```sh
npm install llm-chunk
```

## Usage

Easily integrate it into your project with just a few lines of code:

```typescript
import { chunk } from 'llm-chunk'

const text = `
Hello World.
This is
 a test sentence! Have a good day? Haha. Haha
`;

// Default options
const chunks = chunk(text, {
    minLength: 0,          // number of minimum characters into chunk
    maxLength: 1000,       // number of maximum characters into chunk
    splitter: "paragraph", // paragraph | sentence
    overlap: 0,            // number of overlap chracters
    delimiters: ""         // regex for base split method
});

// The result shows 'paragraph' splitter as default
chunk(text)
// Results
[
  'Hello World.\nThis is\n a test sentence! Have a good day? Haha. Haha'
]

chunk(text, { minLength: 7, maxLength: 9 })
// Results
[
  'Hello World.\nThis',
  ' is\n a test',
  ' sentence! Have a good day? Haha. Haha'
]
```

Use 'sentence' splitter:

```typescript
chunk(text, { splitter: "sentence" })
// Results
[
  'Hello World.',
  'This is\n',
  'a test sentence!',
  'Have a good day?',
  'Haha.',
  'Haha'
]

chunk(text, { minLength: 10, splitter: "sentence" })
// Results
[
  'Hello World.',
  'This is\n a test sentence!',
  'Have a good day?',
  'Haha. Haha'
]

chunks = chunk(text, { overlap: 3, splitter: "sentence" });
// Results
[
  'Hello World.',
  ' World. This is\n',
  ' is\n a test sentence!',
  ' sentence! Have a good day?',
  ' day? Haha.',
  ' Haha. Haha',
  ' Haha'
]
```

For more examples and chunk results, please check the "samples" folder.

## Performance

It's super fast. But there's still room for performance improvement.

Patches and PRs are welcome.

```
----------
Chunk 163948 characters into 436 chunks
----------
Total: 12.169ms (100 times)
Average: 0.122ms
```

## License

MIT