# Step 4: Build and Test Locally

## Build Your Nodes

1. **Compile TypeScript**

   ```bash
   npm run build
   ```

   This creates the `dist/` folder with compiled JavaScript.

2. **Fix any errors**

   If build fails, check:

   - TypeScript syntax errors
   - Missing imports
   - File paths in package.json

## Test Locally

1. **Link your package**

   ```bash
   npm link
   ```

2. **Link in n8n**

   ```bash
   cd ~/.n8n/custom
   npm link n8n-nodes-yourname
   ```

   Replace `n8n-nodes-yourname` with your package name.

3. **Start n8n**

   ```bash
   n8n start
   ```

4. **Find your node**

   - Open n8n in browser (usually `http://localhost:5678`)
   - Create new workflow
   - Search for your node name
   - Test it works

## Common Issues

- **Node not appearing**: Check package.json paths
- **Node crashes**: Check console for errors
- **Can't authenticate**: Verify credential setup

## Next Step

Go to STEP-05-NPM-SETUP.md
