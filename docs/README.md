# n8n Custom Node Development Guide

## For LLM/AI Assistants

Read `LLM_INSTRUCTIONS.xml` first for structured instructions.

## For Humans

Follow the step-by-step guides in order:

1. **STEP-01-SETUP.md** - Initial project setup
2. **STEP-02-CREATE-NODE.md** - Create your first node
3. **STEP-03-ADD-CREDENTIALS.md** - Add authentication
4. **STEP-04-BUILD-TEST.md** - Build and test locally
5. **STEP-05-NPM-SETUP.md** - Set up NPM account
6. **STEP-06-PUBLISH.md** - Publish to NPM
7. **STEP-07-INSTALL-N8N.md** - Install in n8n
8. **STEP-08-TROUBLESHOOTING.md** - Fix common issues

## Additional Guides

- **DEPENDENCIES.md** - How to handle external packages/libraries
- **VALIDATION.md** - Using the validate-everything.js script
- **EXAMPLE-NODES.md** - Understanding the example nodes

## Quick Reference

### Required Files

- `/nodes/YourNode/YourNode.node.ts` - Node implementation
- `/nodes/YourNode/yourNode.svg` - Node icon (60x60px)
- `/credentials/YourApi.credentials.ts` - Authentication (optional)
- `package.json` - NPM configuration with n8n metadata

### Key Commands

```bash
# Build
npm run build

# Test locally
npm link
cd ~/.n8n/custom
npm link n8n-nodes-yourname

# Publish
npm publish

# Update version
npm version patch
npm publish
```

### Naming Rules

- Package name: `n8n-nodes-yourname`
- Class name: Match file name exactly
- Credential name: Match between node and credential file

### Requirements

- Node.js 20.19-24.x
- Self-hosted n8n (not cloud)
- NPM account for publishing

## Example Nodes in This Template

- **ExampleRest** - REST API with declarative style
- **ExampleGraphQL** - GraphQL queries  
- **ExampleWebhook** - Webhook trigger

Copy and modify these examples to create your own nodes.
