# Step 5: NPM Account Setup

## Create NPM Account

1. **Sign up at npmjs.com**

   Go to <https://www.npmjs.com/signup>

2. **Verify your email**

   Check your email and click the verification link.

3. **Login to npm CLI**

   ```bash
   npm login
   ```

   Enter:
   - Username: your-npm-username
   - Password: your-password
   - Email: `your-email@example.com`
   - OTP: (if you have 2FA enabled)

## Prepare for Publishing

1. **Check package name availability**

   ```bash
   npm view n8n-nodes-yourname
   ```

   If it shows "404 Not Found", the name is available.

2. **Update version**

   Start with version 0.1.0 in package.json.

3. **Add repository info**

   Make sure package.json has:
   - repository URL
   - author information
   - license (usually MIT)
   - description

## Important for n8n Nodes

- Name MUST start with `n8n-nodes-`
- MUST include keyword `n8n-community-node-package`
- Version should follow semantic versioning (0.1.0, 0.2.0, 1.0.0)

## Next Step

Go to STEP-06-PUBLISH.md
