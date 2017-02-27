Portable markdown is a ready to use setup for shooting markdown files to pdfs.

## Usage

Install portable markdown

```
npm install --save portable-markdown
```

Add a configuration to your package.json

```
"script": {
  "build": "portable-markdown"
}
"config": {
  "pmd": {
    "entry": "test.md",
    "target": "dist/out.pdf",
    "options": {
      "include": ["assets/styles.css"]
    }
  }
},
```

and run `npm run build`

or require the library inside of your project

```
const portableMarkdown = require('portable-markdown')

const options = {
  include: ["assets/styles.css"]
}

portableMarkdown({
  entry: "test.md",
  target: "dist/out.pdf"
}, options)

```

For further information take a look at the [example](./example)
