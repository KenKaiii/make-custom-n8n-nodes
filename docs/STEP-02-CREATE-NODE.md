# Step 2: Create Your Node

## Understanding Node Structure

Each node needs:

- A TypeScript file in `/nodes/YourNode/YourNode.node.ts`
- An icon file (SVG, 60x60px) in the same folder
- Entry in `package.json` under `n8n.nodes`

## Create Your Node

1. **Choose an example to reference**
   - `ExampleRest` - For REST APIs (easiest) - see `/example-nodes/ExampleRest/`
   - `ExampleGraphQL` - For GraphQL APIs - see `/example-nodes/ExampleGraphQL/`
   - `ExampleWebhook` - For webhooks/triggers - see `/example-nodes/ExampleWebhook/`

2. **Create your node folder**

   ```bash
   mkdir -p nodes/YourNodeName
   cd nodes/YourNodeName
   # Create YourNodeName.node.ts based on example patterns
   # Create yourNodeName.svg icon file
   ```

3. **Modify the node code**

   Open `YourNodeName.node.ts` and change:
   - Class name to match file name
   - `name`: unique identifier (camelCase)
   - `displayName`: what users see
   - `description`: what your node does
   - `icon`: MUST add `'file:yourNodeName.svg'` property or node won't show icon
   - API endpoints and operations

4. **Update package.json**

   Replace the example entry with your node:

   ```json
   "nodes": [
     "dist/nodes/YourNodeName/YourNodeName.node.js"
   ]
   ```

## Node Types

- **Regular Node**: Performs actions (most common)
- **Trigger Node**: Starts workflows
- **Webhook Node**: Receives HTTP requests

## Next Step

Go to STEP-03-ADD-CREDENTIALS.md
