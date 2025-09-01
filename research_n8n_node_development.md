# n8n Custom Node Development Research Summary

_Generated: 2025-09-01 | Sources: 15+ | Confidence: High_

## 🎯 Executive Summary

<key-findings>
- **Primary recommendation**: Use n8n's official starter template with declarative-style nodes for REST APIs
- **Critical considerations**: Node.js 20-24 compatibility, TypeScript required, npm naming conventions mandatory
- **Key trade-offs**: Custom nodes require self-hosting (not supported in n8n Cloud), ongoing maintenance for version compatibility
</key-findings>

## 📋 Detailed Analysis

<overview>
n8n custom nodes are TypeScript-based extensions that integrate external services into n8n workflows. The ecosystem supports two primary development styles: declarative (JSON-based, simpler) for REST APIs and programmatic (code-based) for complex integrations requiring data transformation or non-REST APIs. All custom nodes must follow strict naming conventions, include proper authentication handling, and be distributed via npm packages with specific metadata requirements.
</overview>

## 🔧 Implementation Guide

<implementation>
### Getting Started

**Prerequisites:**
- Node.js version 20.19-24.x (minimum 18.17.0 for development)
- npm package manager
- Git version control
- Global n8n installation: `npm install n8n -g`
- TypeScript familiarity

**Project Setup:**
1. Clone the official starter: `git clone https://github.com/n8n-io/n8n-nodes-starter`
2. Install dependencies: `npm install`
3. Modify nodes in `/nodes` and credentials in `/credentials` directories
4. Use linting: `npm run lint` or `npm run lintfix`
5. Test locally before publishing

### Core File Structure

```
project-root/
├── .vscode/                 # VS Code configuration
├── credentials/             # Authentication definitions
├── nodes/                   # Node implementations
├── dist/                    # Build output (generated)
├── .eslintrc.js            # ESLint configuration
├── .prettierrc.js          # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── gulpfile.js             # Build tools
└── package.json            # npm package definition
```

### Essential package.json Configuration

```json
{
  "name": "n8n-nodes-[your-name]",
  "version": "0.1.0",
  "description": "n8n community node for [service]",
  "keywords": ["n8n-community-node-package"],
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "build": "tsc && gulp build:icons",
    "dev": "tsc --watch",
    "lint": "eslint nodes credentials package.json",
    "lintfix": "eslint nodes credentials package.json --fix"
  },
  "files": ["dist"],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": ["dist/credentials/YourCredentials.js"],
    "nodes": ["dist/nodes/YourNode/YourNode.node.js"]
  }
}
```

### Advanced Integration

**Authentication Patterns:**
- OAuth1/OAuth2 for modern APIs
- API key authentication (header, query, body)
- Custom credentials with JSON configuration
- SSL certificate support

**Node Development Styles:**
- **Declarative**: Use for REST APIs (recommended)
- **Programmatic**: Required for GraphQL, data transformation, external dependencies

</implementation>

## ⚠️ Critical Considerations

<considerations>
- **Security implications**: All credentials encrypted with n8n's encryption key, avoid logging sensitive data
- **Performance characteristics**: Built-in modules preferred over external dependencies to reduce bundle size
- **Version compatibility**: n8n releases weekly minor versions, nodes require ongoing maintenance
- **Cloud limitations**: Custom nodes only work in self-hosted environments, not n8n Cloud
- **Common pitfalls**: Incorrect file paths in package.json (.js not .ts), missing n8n metadata, improper naming conventions
</considerations>

## 🔍 Alternatives Comparison

<alternatives>
| Approach | Pros | Cons | Use Case |
|----------|------|------|----------|
| Declarative Style | JSON-based, simpler, future-proof, less bugs | Limited to REST APIs | Most integrations, standard API services |
| Programmatic Style | Full control, data transformation, any protocol | More complex, verbose, higher bug risk | GraphQL, custom protocols, complex logic |
| HTTP Request Node | No development needed, immediate use | Limited customization, no UI polish | Quick prototyping, simple API calls |
| Code Node | Inline JavaScript, rapid testing | No reusability, harder maintenance | One-off transformations, testing |
</alternatives>

## 📚 Node Types and Examples

### Regular Action Nodes
- **Purpose**: Perform specific operations (create, read, update, delete)
- **Example**: SendGrid node for email management
- **Structure**: Operations defined in node class with execute() method

### Trigger Nodes
- **Purpose**: Start workflows based on events
- **Example**: Webhook triggers, scheduled triggers
- **Structure**: Polling or webhook-based activation

### Webhook Nodes
- **Purpose**: Receive HTTP requests to trigger workflows
- **Example**: Custom API endpoints, service callbacks
- **Features**: IP whitelisting, custom responses, raw data handling

## 🛠️ Development Tools and Configuration

### TypeScript Configuration (tsconfig.json)
```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "lib": ["ES2019"],
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Build Tools
- **TypeScript compiler**: `tsc` for compilation
- **Gulp**: Icon processing and build automation  
- **ESLint**: Code quality and standards enforcement
- **Prettier**: Code formatting consistency

### Testing Strategy
1. Local development with `npm run dev` (watch mode)
2. Lint checking with `npm run lint`
3. Manual testing in local n8n instance
4. Version compatibility testing

## 🚀 NPM Publishing Requirements

### Naming Conventions (MANDATORY)
- Package name: `n8n-nodes-[name]` or `@scope/n8n-nodes-[name]`
- Keywords must include: `n8n-community-node-package`

### Publishing Checklist
1. Ensure package.json accuracy (name, repository URL, author)
2. Run linting: `npm run lint`
3. Test locally in n8n instance
4. Create npm account at npmjs.com
5. Publish: `npm publish`
6. Submit to n8n for community verification (optional)

### Version Management
- Follow semantic versioning (semver)
- Test compatibility with latest n8n version
- Document breaking changes in changelog

## 🐛 Common Issues and Solutions

### Installation Problems
- **Issue**: `N8N_CUSTOM_EXTENSIONS_PATH` incorrect variable name
- **Solution**: Use correct environment variable or default path `/home/[user]/.n8n/custom/`

### Docker Deployment
- **Issue**: Module loading in containerized environments  
- **Solution**: Set `NODE_FUNCTION_ALLOW_BUILTIN` and `NODE_FUNCTION_ALLOW_EXTERNAL` env vars

### Compatibility Issues
- **Issue**: ERR_REQUIRE_ESM with newer packages
- **Solution**: Check package compatibility, use CommonJS alternatives

### Development Issues
- **Issue**: File path extensions in package.json
- **Solution**: Use `.js` extensions for dist files, not `.ts`

## 📋 Template Project Requirements

### Essential Files for Template
1. **Complete package.json** with all n8n metadata
2. **TypeScript configuration** optimized for n8n
3. **Example nodes** for each style (declarative, programmatic, trigger)
4. **Credential examples** for common auth patterns
5. **Build configuration** (gulpfile, eslint, prettier)
6. **Documentation** with LLM-friendly structure

### LLM Documentation Structure
- Use XML tags for easy parsing: `<overview>`, `<implementation>`, `<examples>`
- Include complete code samples with explanations
- Provide step-by-step tutorials for each node type
- Document common patterns and anti-patterns

### Example Nodes to Include
1. **REST API Integration** (declarative style)
2. **GraphQL API Integration** (programmatic style)  
3. **Webhook Trigger** (event-based activation)
4. **Scheduled Trigger** (time-based activation)
5. **OAuth Authentication** (credential handling)

## 🔗 Resources

<references>
- [Official n8n Node Documentation](https://docs.n8n.io/integrations/creating-nodes/overview/) - Primary reference
- [n8n Nodes Starter Template](https://github.com/n8n-io/n8n-nodes-starter) - Official template repository
- [Declarative Node Tutorial](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/) - REST API integration guide
- [Programmatic Node Tutorial](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/) - Complex integration guide
- [Credentials Documentation](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/) - Authentication setup
- [Community Node Submission](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/) - Publishing guidelines
- [Code Standards](https://docs.n8n.io/integrations/creating-nodes/build/reference/code-standards/) - Development best practices
</references>

## 🏷️ Research Metadata

<meta>
research-date: 2025-09-01
confidence-level: high  
sources-validated: 15+
version-current: 1.108.2 (as of research date)
node-compatibility: n8n 20.19-24.x
template-requirements: Complete starter with examples, docs, and build config
</meta>