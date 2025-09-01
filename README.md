# n8n Custom Node Template

```text
 ███▄    █  █    ██  ███▄    █     ███▄    █  ▒█████  ▓█████▄ ▓█████   ██████ 
 ██ ▀█   █  ██  ▓██▒ ██ ▀█   █     ██ ▀█   █ ▒██▒  ██▒▒██▀ ██▌▓█   ▀ ▒██    ▒ 
▓██  ▀█ ██▒▓██  ▒██░▓██  ▀█ ██▒   ▓██  ▀█ ██▒▒██░  ██▒░██   █▌▒███   ░ ▓██▄   
▓██▒  ▐▌██▒▓▓█  ░██░▓██▒  ▐▌██▒   ▓██▒  ▐▌██▒▒██   ██░░▓█▄   ▌▒▓█  ▄   ▒   ██▒
▒██░   ▓██░▒▒█████▓ ▒██░   ▓██░   ▒██░   ▓██░░ ████▓▒░░▒████▓ ░▒████▒▒██████▒▒
░ ▒░   ▒ ▒ ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒    ░ ▒░   ▒ ▒ ░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░▒ ▒▓▒ ▒ ░
░ ░░   ░ ▒░░░▒░ ░ ░ ░ ░░   ░ ▒░   ░ ░░   ░ ▒░  ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░░ ░▒  ░ ░
   ░   ░ ░  ░░░ ░ ░    ░   ░ ░       ░   ░ ░ ░ ░ ░ ▒   ░ ░  ░    ░   ░  ░  ░  
         ░    ░              ░             ░     ░ ░     ░       ░  ░      ░  
                                                       ░                      
```

The stupidly simple template for building custom n8n nodes

Want to connect n8n to that random API you found? This template makes it dead simple.
Even if you've never touched TypeScript before, you'll have a working node in
20 minutes.

## By Ken Kai

## What This Thing Does

This is a **template repository** - think of it as a cookie cutter for n8n nodes.
Click "Use this template" on GitHub and you get:

- 3 working example nodes (WebScraper, SimpleAPI, DataTransform)
- A magical validation script that catches every possible mistake
- Documentation that actually makes sense
- Step-by-step guides that won't leave you hanging

Perfect for humans who want to automate things, and AI assistants who need
clear instructions.

## Quick Start (The "I Just Want It To Work" Version)

1. **Click "Use this template" on GitHub** (don't clone, use the template!)

2. **Clone YOUR new repo and install stuff**

   ```bash
   git clone https://github.com/yourusername/your-new-repo.git
   cd your-new-repo
   npm install
   ```

3. **Run the validation script** (seriously, this saves you hours)

   ```bash
   ./validate-everything.js
   ```

   This checks EVERYTHING - package.json, TypeScript, linting, common mistakes.
   If it passes, you're golden.

4. **Build and test locally**

   ```bash
   npm run build
   npm link
   
   # In your n8n installation:
   cd ~/.n8n/custom
   npm link n8n-nodes-template
   n8n start
   ```

5. **Tell your AI assistant to help** (if you're using one)

   ```text
   "Read the /docs/ folder and help me create a custom n8n node for [your API]"
   ```

## The Magic Validation Script

**Before you do ANYTHING else, run this:**

```bash
./validate-everything.js
```

This script is your best friend. It checks:

- Package.json is configured correctly
- All your node files are properly structured
- TypeScript compiles without errors
- ESLint isn't screaming at you
- Your package is ready for npm
- You haven't made any of the 47 common mistakes we've all made

If this passes, your node will probably work. If it fails, it tells you exactly
what to fix.

## What You Get Out of the Box

### Three Ready-to-Go Example Nodes

- **WebScraper** - Scrape any website with CSS selectors
- **SimpleAPI** - Connect to REST APIs with authentication
- **DataTransform** - Transform data between formats

Each one shows different patterns you'll need for real nodes.

### Documentation That Doesn't Suck

- `/docs/README.md` - Human-friendly overview
- `/docs/LLM_INSTRUCTIONS.xml` - If you're using AI to help
- `/docs/STEP-*` files - Literally step-by-step from zero to hero
- `/docs/VALIDATION.md` - What that magic script actually does

## The Foolproof Process

1. **Start with an example** - Copy one of the three nodes as your base
2. **Modify the API calls** - Change the URLs, parameters, whatever
3. **Run validation** - `./validate-everything.js` after every change
4. **Test locally** - Make sure it actually works in n8n
5. **Publish to npm** - `npm publish` and you're done

## Requirements (The Boring Stuff)

- Node.js 20.15 or newer
- npm (comes with Node)
- A self-hosted n8n instance (custom nodes don't work on n8n Cloud)
- Basic willingness to read error messages

## Important Notes

- **Self-hosted n8n only** - n8n Cloud doesn't support custom nodes (yet)
- **Package naming** - Must start with `n8n-nodes-` (like `n8n-nodes-awesome-api`)
- **Keywords required** - Must include `n8n-community-node-package` in package.json

## Using This With AI Assistants

Got Claude, ChatGPT, or another AI helper? Here's the magic prompt:

```text
"Read the /docs/LLM_INSTRUCTIONS.xml file in this repository and help me create 
a custom n8n node for [your API]. Follow the examples and use the validation 
script to check our work."
```

The documentation is structured specifically for AI consumption, so it should
understand exactly what to do.

## Common "Oh Crap" Moments (And How to Fix Them)

- **"My node doesn't show up in n8n"** - Run `./validate-everything.js`,
  probably a package.json issue
- **"TypeScript is yelling at me"** - Check the example nodes, copy their
  patterns
- **"npm publish failed"** - Run the validation script, it checks npm readiness
- **"Everything builds but breaks in n8n"** - Check the troubleshooting guide in
  `/docs/`

## Contributing

This is a template - fork it and make it your own! If you find bugs or have
suggestions, open an issue.

## License

MIT - Do whatever you want with this.

## Need Help?

- **n8n questions**: [n8n Community Forum](https://community.n8n.io/)
- **Template issues**: Open an issue here
- **"It's not working"**: Run `./validate-everything.js` first, then ask

---

*Remember: If the validation script passes, you're probably fine. If it fails, fix
what it complains about. This simple rule prevents 90% of headaches.*
