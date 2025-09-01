# Step 1: Setup Your Custom Node Project

## Prerequisites

- Node.js version 20.19 to 24.x (check with `node --version`)
- npm installed (comes with Node.js)
- n8n self-hosted instance (custom nodes don't work on n8n Cloud)

## Install Dependencies

```bash
npm install
```

## Customize package.json

Update these fields in `package.json` for YOUR node:

- `name`: Change from `n8n-nodes-template` to `n8n-nodes-yourname`
- `description`: Describe what your nodes do
- `author`: Your name and email
- `repository`: Your GitHub repo URL
- `homepage`: Your GitHub repo URL
- `version`: Start with `0.1.0`

## Important Naming Rules

- Package name MUST start with `n8n-nodes-`
- Package name must be lowercase, no spaces
- Use hyphens for separators (e.g., `n8n-nodes-my-api`)

## Next Step

Go to STEP-02-CREATE-NODE.md
