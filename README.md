# n8n Custom Node Template

```text
         ___          __  _   _  ___  ____  _____ ____  
  _ __  ( _ )  _ __  |  \| | / _ \|  _ \| ____/ ___| 
 | '_ \ / _ \ | '_ \ | |\  || | | | | | |  _| \___ \ 
 | | | | (_) || | | || | \ || |_| | |_| | |___ ___) |
 |_| |_|\___/ |_| |_||_|  \| \___/|____/|_____|____/ 
                                                      
```

The stupidly simple template for building custom n8n nodes

Want to connect n8n to that random API you found? This template makes it dead simple.
Your LLM does the heavy lifting while you just give directions and run commands.

## What This Thing Does

This is a **template repository** - think of it as a cookie cutter for n8n nodes.
Click "Use this template" on GitHub and your LLM gets:

- 3 working example nodes (WebScraper, SimpleAPI, DataTransform)
- A magical validation script that catches every possible mistake
- Documentation optimized for AI consumption
- Step-by-step guides your LLM can actually follow

Perfect for humans who direct their AI assistants to build things.

## The LLM-First Workflow

Your job is simple: use the template, tell your LLM what to do, run commands it suggests.

1. **Use this template** (don't clone - click "Use this template" on GitHub)

2. **Clone YOUR new repo**

   ```bash
   git clone https://github.com/yourusername/your-new-repo.git
   cd your-new-repo
   npm install
   ```

3. **Tell your LLM to work**

   ```text
   "Read the /docs/ folder and create a custom n8n node for [your API/service].
   Use the validation script to check everything works."
   ```

4. **Your LLM does the heavy lifting** - It will:
   - Read the documentation
   - Examine the example nodes
   - Write your custom node code
   - Run the validation script
   - Fix any issues it finds

5. **You just run the final commands** when your LLM says:

   ```bash
   npm run build
   npm run validate
   npm publish
   ```

## The Magic Validation Script

Your LLM will use this constantly, but you should know what it does:

```bash
./validate-everything.js
```

This script checks:

- Package.json is configured correctly
- All node files are properly structured
- TypeScript compiles without errors
- ESLint isn't screaming at you
- Your package is ready for npm
- You haven't made any of the 47 common mistakes

If this passes, your node works. If it fails, your LLM fixes the issues.

## What Your LLM Gets to Work With

### Three Ready-to-Go Example Nodes

- **WebScraper** - Scrape any website with CSS selectors
- **SimpleAPI** - Connect to REST APIs with authentication
- **DataTransform** - Transform data between formats

Each one shows different patterns your LLM will use for real nodes.

### Documentation Optimized for AI

- `/docs/README.md` - Human-friendly overview
- `/docs/LLM_INSTRUCTIONS.xml` - Structured instructions for AI consumption
- `/docs/STEP-*` files - Step-by-step guides your LLM can follow
- `/docs/VALIDATION.md` - What that validation script actually checks

## The AI-Powered Process

1. **You say**: "Create a node for [service/API]"
2. **LLM reads** the docs and examples
3. **LLM writes** your custom node
4. **LLM validates** with the script
5. **LLM fixes** any issues
6. **You run**: `npm publish` when it's ready

## Requirements

- Node.js 20.15 or newer
- npm (comes with Node)
- A self-hosted n8n instance (custom nodes don't work on n8n Cloud)
- An LLM assistant (Claude, ChatGPT, etc.)

## Important Notes

- **Self-hosted n8n only** - n8n Cloud doesn't support custom nodes (yet)
- **Package naming** - Must start with `n8n-nodes-` (like `n8n-nodes-awesome-api`)
- **Keywords required** - Must include `n8n-community-node-package` in package.json

## The Magic Prompt for Your LLM

Here's exactly what to tell your AI assistant:

```text
"Read the /docs/LLM_INSTRUCTIONS.xml file in this repository and help me create
a custom n8n node for [your API/service]. Follow the examples and use the
validation script to check everything works correctly."
```

The documentation is structured specifically for AI consumption, so your LLM will
understand exactly what to do.

## When Things Go Wrong (Your LLM Will Handle These)

- **"My node doesn't show up in n8n"** - LLM runs `./validate-everything.js`
- **"TypeScript errors"** - LLM checks the example nodes and fixes patterns
- **"npm publish failed"** - LLM runs validation script and fixes issues
- **"Builds but breaks in n8n"** - LLM checks troubleshooting in `/docs/`

## Contributing

This is a template - fork it and make it your own! If you find bugs or have
suggestions, open an issue.

## License

MIT - Do whatever you want with this.

## Need Help?

- **n8n questions**: [n8n Community Forum](https://community.n8n.io/)
- **Template issues**: Open an issue here
- **"It's not working"**: Tell your LLM to run `./validate-everything.js` first

---

*Remember: Your LLM handles the technical stuff. You give directions and run final
commands. If the validation script passes, you're golden.*
