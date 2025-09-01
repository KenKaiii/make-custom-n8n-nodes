# Step 7: Install in n8n

## Install via n8n UI (Easiest)

1. **Open n8n settings**
   - Click your profile icon (bottom left)
   - Select "Settings"

2. **Go to Community Nodes**
   - Click "Community Nodes" in sidebar

3. **Install your node**
   - Click "Install"
   - Enter YOUR package name from npm (e.g., `n8n-nodes-yourname`)
   - This must match exactly what you published to npm
   - Click "Install"
   - Restart n8n when prompted

## Install via Command Line

1. **Navigate to n8n folder**

   ```bash
   cd ~/.n8n
   ```

2. **Install package**

   ```bash
   npm install n8n-nodes-yourname
   ```

3. **Restart n8n**

   ```bash
   n8n start
   ```

## Verify Installation

1. Create new workflow
2. Add node (+) button
3. Search for your node name
4. Your node should appear

## Troubleshooting

- **Node not appearing**: Restart n8n completely
- **Installation fails**: Check package name spelling
- **Version issues**: Make sure n8n is updated

## Next Step

Go to STEP-08-TROUBLESHOOTING.md
