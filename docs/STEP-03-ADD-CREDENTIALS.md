# Step 3: Add Authentication (Optional)

## When You Need Credentials

Skip this if your API doesn't need authentication.

## Create Credential File

1. **Create credential file**

   Create `/credentials/YourApi.credentials.ts`:

   ```typescript
   import {
     ICredentialType,
     INodeProperties,
   } from 'n8n-workflow';

   export class YourApi implements ICredentialType {
     name = 'yourApi';
     displayName = 'Your API';
     properties: INodeProperties[] = [
       {
         displayName: 'API Key',
         name: 'apiKey',
         type: 'string',
         typeOptions: {
           password: true,
         },
         default: '',
         required: true,
       },
     ];
   }
   ```

2. **Add to package.json**

   ```json
   "credentials": [
     "dist/credentials/YourApi.credentials.js"
   ]
   ```

3. **Use in your node**

   In your node file, add:

   ```typescript
   credentials: [
     {
       name: 'yourApi',
       required: true,
     },
   ],
   ```

## Common Credential Types

- **API Key**: Simple token/key
- **OAuth2**: For Google, GitHub, etc.
- **Basic Auth**: Username/password
- **Custom**: Any combination

## Next Step

Go to STEP-04-BUILD-TEST.md
