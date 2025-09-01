# Step 6: Publish to NPM

## Final Checks Before Publishing

1. **Run linter**

   ```bash
   npm run lint
   ```

   Fix any errors that appear.

2. **Build one more time**

   ```bash
   npm run build
   ```

3. **Check files to be published**

   ```bash
   npm pack --dry-run
   ```

   Make sure only `dist/` folder is included, not source code.

## Publish Your Package

1. **First time publish**

   ```bash
   npm publish
   ```

2. **Update existing package**

   ```bash
   npm version patch  # increases version number
   npm publish
   ```

## Version Management

- `patch`: 0.1.0 → 0.1.1 (bug fixes)
- `minor`: 0.1.0 → 0.2.0 (new features)
- `major`: 0.1.0 → 1.0.0 (breaking changes)

## After Publishing

Your package is now available at:
`https://www.npmjs.com/package/n8n-nodes-yourname`

Wait 1-2 minutes for npm to process it.

## Next Step

Go to STEP-07-INSTALL-N8N.md
