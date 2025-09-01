# n8n Custom Node Template

A template for building custom n8n nodes. Designed for LLM-assisted 
development - just tell your AI to read the docs and create your nodes.

## What This Is

This is a **template repository** with example nodes and documentation. 
Use it to create your own custom n8n nodes without starting from scratch.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Tell your LLM/AI assistant**

   "Read the `/docs/` folder and help me create a custom n8n node for 
   [your API]"

3. **Follow the steps**

   The documentation walks through everything from creating nodes to 
   publishing on NPM

4. **Build and test locally**

   ```bash
   npm run build
   npm link
   # In your n8n installation:
   cd ~/.n8n/custom
   npm link n8n-nodes-template
   n8n start
   ```

5. **Publish to npm**

   ```bash
   npm publish
   ```

## What's Included

### Example Nodes
- **ExampleRest**: Declarative-style REST API integration
- **ExampleGraphQL**: Programmatic GraphQL queries
- **ExampleWebhook**: Webhook trigger implementation

### Authentication Examples
- API Key authentication
- OAuth2 implementation

### Documentation
- LLM-friendly structured documentation
- Step-by-step tutorials
- Troubleshooting guide
- NPM publishing guide

## Requirements

- Node.js 20.19-24.x
- npm or yarn
- n8n (self-hosted instance)
- TypeScript knowledge (or an LLM assistant)

## Important Notes

- Custom nodes only work with **self-hosted n8n**, not n8n Cloud
- Package name must follow pattern: `n8n-nodes-yourname`
- Must include keyword: `n8n-community-node-package`

## Documentation Structure

```
docs/
├── README.md                 # Human-friendly overview
├── LLM_INSTRUCTIONS.xml     # Structured guide for AI assistants
├── tutorials/               # Step-by-step guides
│   ├── 01-setup.md
│   ├── 02-create-rest-node.md
│   ├── 03-add-authentication.md
│   └── 04-publish-npm.md
├── reference/               # Technical references
│   ├── node-structure.md
│   ├── credential-types.md
│   └── api-patterns.md
└── troubleshooting.md       # Common issues and solutions
```

## For LLM Users

If you're using an AI assistant to create nodes:
1. Have your assistant read `/docs/LLM_INSTRUCTIONS.xml` first
2. Review the example nodes for patterns
3. Follow the tutorials for specific tasks
4. Use the troubleshooting guide when issues arise

## License

MIT - See LICENSE file

## Contributing

This is a template repository. Fork it and make it your own!

## Support

For n8n-specific questions: [n8n Community](https://community.n8n.io/)
For template issues: Open an issue in this repository