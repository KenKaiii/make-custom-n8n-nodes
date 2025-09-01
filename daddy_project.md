# Project: n8n Custom Node Template

## Project Overview

**Type**: Template/Library - npm Package Development Template

**Description**: A comprehensive template for building custom n8n nodes that provides
example nodes, LLM-friendly documentation, and complete setup instructions for developers
to quickly create and publish their own n8n community nodes.

**Target Users**: Developers using LLM coding assistants (Claude, GPT, etc.) to create
custom n8n integrations without manual coding

**Success Criteria**: Users can clone template → LLM reads docs → Creates custom
nodes based on examples → Publishes to npm → Installs via n8n community nodes without
errors

## Technical Stack

**Languages**: TypeScript (required), JavaScript

**Frontend Framework**: None - Node-based backend service integration

**Backend Framework**: n8n Node Framework (custom node API)

**Database**: None - Nodes interact with external APIs/services

**Deployment Target**: npm package (installed via n8n community nodes)

**New/Unfamiliar Tech**: n8n declarative node style (JSON-based REST API
definitions) - newer approach that needs early exploration

## Core Features (Priority 1 - Must Have)

These are essential features without which the project fails

- [ ] **Example REST API Node**: Declarative-style node showing standard CRUD operations
  with a real API (e.g., JSONPlaceholder or GitHub API)
- [ ] **Example Authentication**: Working credential implementation with API key
  and OAuth2 examples that properly encrypt/decrypt
- [ ] **LLM-Optimized Documentation**: XML-structured docs in /docs/ folder
  explaining node creation, with complete code examples
- [ ] **Working package.json**: Proper n8n metadata, naming convention (n8n-nodes-*),
  required keywords, build scripts
- [ ] **Build System**: TypeScript compilation, linting (ESLint), formatting
  (Prettier), icon processing (Gulp)

## Important Features (Priority 2 - Should Have)

Important features that enhance the project significantly

- [ ] **GraphQL Example Node**: Programmatic-style node demonstrating complex
  integrations beyond REST
- [ ] **Webhook Trigger Node**: Example of event-based workflow triggers with
  proper webhook handling
- [ ] **NPM Publishing Guide**: Step-by-step instructions for publishing to npm
  and installing in n8n
- [ ] **Troubleshooting Guide**: Common errors, solutions, and debugging
  techniques specific to n8n nodes

## Nice-to-Have Features (Priority 3)

Polish features and enhancements for later

- [ ] **Testing Framework**: Unit tests for nodes with example test cases
- [ ] **GitHub Actions CI/CD**: Automated build, test, and npm publish workflow
- [ ] **Multiple Auth Examples**: JWT, Bearer token, custom headers, SSL certificates
- [ ] **Advanced Node Features**: Pagination, file handling, streaming data examples

## External Integrations & APIs

List any external services, APIs, or integrations needed

- **n8n Node API**: Core framework for building custom nodes
  - Documentation: <https://docs.n8n.io/integrations/creating-nodes/overview/>
  - Complexity: Medium (declarative style is simpler)
  - Auth Required: No - framework integration

- **JSONPlaceholder API**: Example REST API for demonstration
  - Documentation: <https://jsonplaceholder.typicode.com/>
  - Complexity: Simple
  - Auth Required: No - public API

- **GitHub API**: Real-world API example with OAuth
  - Documentation: <https://docs.github.com/en/rest>
  - Complexity: Medium
  - Auth Required: Yes - OAuth2 or Personal Access Token

## Constraints & Requirements

**Performance**: Nodes must be lightweight, avoid heavy dependencies, use built-in
n8n modules when possible

**Security**: All credentials must use n8n's encryption, never log sensitive data,
validate all inputs

**Platform**: Node.js 20.19-24.x required, self-hosted n8n only (NOT n8n Cloud),
TypeScript mandatory

**Integration**: Must follow n8n naming conventions, use n8nNodesApiVersion: 1,
compatible with weekly n8n releases

## Design & User Experience

**Design References**:

- n8n UI Standards: Nodes must match n8n's existing UI patterns
- Icon Requirements: SVG format, 60x60px, follow n8n icon guidelines
- Node Editor UI: Property panels, operation selectors, credential selectors

**Key User Flows**:

- Developer clones template → Reviews /docs/ folder → Modifies example node → Tests
  locally → Publishes to npm
- LLM reads documentation → Understands node structure → Creates new node based on
  examples → Handles errors using troubleshooting guide

**Accessibility**: Documentation must be parseable by LLMs (XML structure), code
examples must be complete and runnable

## Architecture Preferences

**Database Schema**: N/A - Nodes are stateless integrations

**File Organization**: Standard n8n structure - /nodes, /credentials, /docs, with
clear separation of concerns

**Authentication**: Multiple credential types - OAuth2, API Key, Custom Auth with
proper n8n credential handling

**Testing Strategy**: Local testing with n8n instance, linting checks, manual
validation before npm publish

**Documentation Needed**: LLM-friendly XML-structured docs, step-by-step tutorials,
API reference, troubleshooting guide

## 📁 Project Structure Recommendation

**Recommended Structure for This Project**:

```text
make-custom-n8n-nodes/
├── credentials/                    # Authentication definitions
│   ├── ExampleApi.credentials.ts   # API key auth example
│   └── GitHubOAuth2.credentials.ts # OAuth2 auth example
├── nodes/                          # Node implementations
│   ├── ExampleRest/               # Declarative REST API node
│   │   ├── ExampleRest.node.ts
│   │   ├── ExampleRest.node.json  # Declarative operations
│   │   └── exampleRest.svg        # Node icon
│   ├── ExampleGraphQL/            # Programmatic GraphQL node
│   │   ├── ExampleGraphQL.node.ts
│   │   └── exampleGraphQL.svg
│   └── ExampleWebhook/            # Webhook trigger node
│       ├── ExampleWebhook.node.ts
│       └── exampleWebhook.svg
├── docs/                          # LLM-friendly documentation
│   ├── README.md                  # Human-friendly overview
│   ├── LLM_INSTRUCTIONS.xml      # Structured LLM guide
│   ├── tutorials/
│   │   ├── 01-setup.md
│   │   ├── 02-create-rest-node.md
│   │   ├── 03-add-authentication.md
│   │   └── 04-publish-npm.md
│   ├── reference/
│   │   ├── node-structure.md
│   │   ├── credential-types.md
│   │   └── api-patterns.md
│   └── troubleshooting.md
├── dist/                          # Build output (gitignored)
├── .github/
│   └── workflows/
│       └── publish.yml           # CI/CD for npm publishing
├── package.json                   # npm package config with n8n metadata
├── tsconfig.json                  # TypeScript configuration
├── .eslintrc.js                  # ESLint rules
├── .prettierrc                   # Code formatting
├── gulpfile.js                   # Build tasks (icon processing)
├── LICENSE                       # MIT license
└── .gitignore                    # Ignore dist/, node_modules/
```

**Structure Reasoning**: This structure follows n8n's official conventions while
adding comprehensive documentation for LLM consumption. The separation of credentials
and nodes mirrors n8n's internal architecture, while the /docs folder provides both
human and LLM-friendly instructions.

**Key Organizational Principles for This Project**:

- Follow n8n's official node structure exactly - deviations cause installation failures
- Keep examples simple but complete - each node should be fully functional
- Documentation dual-purpose: human-readable markdown + LLM-parseable XML
- Minimize dependencies - use n8n's built-in modules whenever possible

**Migration Notes** (if improving existing project): Starting fresh with n8n-nodes-starter
template, then adding our documentation layer and additional examples

---

## How to Use This File

1. **Fill out every section** - the more detail you provide, the better tasks
   will be sequenced
2. **Be specific** - "User can log in" is vague, "User can log in with email/password,
   get JWT token, handle forgot password" is actionable
3. **Prioritize ruthlessly** - Priority 1 features should be the absolute
   minimum viable product
4. **Flag unknowns** - If you're unsure about an API or technology, mark it as "Unknown"
   complexity
5. **Reference files clearly** - Put design files in `./screenshots/` or `./design/`
   and reference them exactly
6. **Think dependencies** - Features that depend on others should be clearly described

After completing this file, run `/new-project` to generate optimized task sequences!
