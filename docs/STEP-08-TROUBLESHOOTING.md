# Step 8: Troubleshooting Common Issues

## Build Errors

### TypeScript Errors

**Problem**: `Cannot find module 'n8n-workflow'`

**Solution**:
```bash
npm install --save-peer n8n-workflow
```

### File Path Errors

**Problem**: `Module not found: Error: Can't resolve './YourNode.node.js'`

**Solution**: Check package.json paths use `.js` not `.ts`:
```json
"nodes": ["dist/nodes/YourNode/YourNode.node.js"]
```

## Node Not Appearing

**Problem**: Node doesn't show up in n8n after install

**Solutions**:

1. Restart n8n completely
2. Check naming convention (`n8n-nodes-*`)
3. Verify keyword `n8n-community-node-package` exists
4. Check n8n logs for errors

## Installation Failures

**Problem**: `npm ERR! 404 Not Found`

**Solution**: Package not published yet or wrong name

**Problem**: `EACCES: permission denied`

**Solution**: Use sudo or fix npm permissions:
```bash
sudo npm install -g n8n-nodes-yourname
```

## Runtime Errors

**Problem**: Node crashes when executed

**Solution**: Check n8n console for detailed error:
```bash
n8n start --tunnel
```

## Authentication Issues

**Problem**: "Credentials are not set" error

**Solution**: 
1. Add credentials in n8n UI
2. Verify credential name matches in node code
3. Check credential type matches

## Version Conflicts

**Problem**: Node works locally but not after npm install

**Solution**:
1. Ensure `dist/` folder is included in npm package
2. Run `npm run build` before publishing
3. Check `.npmignore` doesn't exclude needed files

## Getting Help

- n8n Community Forum: https://community.n8n.io/
- n8n Discord: https://discord.gg/n8n
- GitHub Issues: Your repository's issues page