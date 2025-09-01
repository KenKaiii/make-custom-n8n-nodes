# Dependencies and External Packages

## Important: How n8n Handles Dependencies

n8n nodes have special requirements for external packages and dependencies.

## What You Need to Know

### 1. Dependencies vs DevDependencies

```json
{
  "dependencies": {
    // Packages your node NEEDS at runtime
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12"
  },
  "devDependencies": {
    // Only for development/building
    "@types/cheerio": "^0.22.35",
    "typescript": "^5.8.2"
  }
}
```

**Rule**: Only put in `dependencies` what your node actually uses when running.

### 2. Built-in n8n Modules (Preferred)

n8n provides many modules built-in. Use these instead of adding dependencies:

**Already Available (DON'T install):**

- `axios` - HTTP requests (use via `this.helpers.httpRequest`)
- `crypto` - Cryptography
- `fs` - File system
- `path` - Path utilities
- `url` - URL parsing

**How to use built-in modules:**

```typescript
// DON'T DO THIS:
import axios from 'axios';  // ❌ Don't install axios

// DO THIS:
const response = await this.helpers.httpRequest(options);  // ✅ Use n8n helper
```

### 3. When You MUST Add Dependencies

Sometimes you need specific packages (like `cheerio` for HTML parsing):

#### Step 1: Install as dependency

```bash
npm install cheerio
npm install --save-dev @types/cheerio  # TypeScript types
```

#### Step 2: Import in your node

```typescript
import * as cheerio from 'cheerio';
```

#### Step 3: Update package.json

```json
{
  "dependencies": {
    "cheerio": "^1.0.0-rc.12"
  }
}
```

### 4. Package Size Matters

**Why it matters:**

- Users download your entire package
- Large packages slow down n8n startup
- Some environments have size limits

**Check your package size:**

```bash
npm pack --dry-run
# Look for "package size" in output
```

**Keep it small:**

- ❌ Avoid heavy libraries (puppeteer, tensorflow)
- ✅ Use lightweight alternatives (cheerio vs jsdom)
- ✅ Let users provide their own API keys instead of SDKs

### 5. Version Compatibility

**Problem**: Your node might break with different n8n versions.

**Solution**: Use peer dependencies for n8n packages:

```json
{
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
```

### 6. Common Dependency Issues

#### "Cannot find module"

**Cause**: Package not installed or wrong import

**Fix**:

```bash
npm install package-name
npm run build
```

#### "Module not found in production"

**Cause**: Package in devDependencies instead of dependencies
**Fix**: Move to dependencies in package.json

#### "Package too large"

**Cause**: Including unnecessary files
**Fix**: Use `.npmignore` or `files` in package.json:

```json
{
  "files": ["dist"]  // Only include built files
}
```

## Best Practices

### DO

- ✅ Use n8n's built-in helpers when possible
- ✅ Keep dependencies minimal
- ✅ Use exact versions for critical packages
- ✅ Test with `npm pack` before publishing
- ✅ Document required dependencies

### DON'T

- ❌ Include development tools in dependencies
- ❌ Use packages with security vulnerabilities
- ❌ Import large SDKs when simple HTTP works
- ❌ Forget to include TypeScript types
- ❌ Use deprecated packages

## Example: Adding a Package

**Scenario**: You need to parse XML in your node.

```bash
# 1. Install the package
npm install xml2js

# 2. Install types for TypeScript
npm install --save-dev @types/xml2js

# 3. Use in your node
import * as xml2js from 'xml2js';

# 4. Build and test
npm run build
./validate-everything.js

# 5. Check package size
npm pack --dry-run
```

## Validation

The `validate-everything.js` script checks:

- Dependencies are installed
- No critical vulnerabilities
- Build succeeds with dependencies
- Package size is reasonable

Run it before publishing to catch dependency issues!

## For LLM Users

When adding a dependency, tell your LLM:

1. What functionality you need
2. Ask if n8n has it built-in
3. If not, ask for the lightest package option
4. Have the LLM add it properly to package.json

Example: "I need to parse HTML in my node. What's the best way?"
LLM should suggest cheerio (lightweight) over puppeteer (heavy).
