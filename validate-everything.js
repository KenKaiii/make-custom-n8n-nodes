#!/usr/bin/env node

/**
 * validate-everything.js
 * 
 * Comprehensive validation script for n8n custom nodes
 * Checks EVERYTHING before you publish to npm
 * Run this after creating/modifying nodes to ensure everything is correct
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const errors = [];
const warnings = [];
const successes = [];

function error(msg) {
  errors.push(msg);
  console.log(`${colors.red}❌ ERROR: ${msg}${colors.reset}`);
}

function warn(msg) {
  warnings.push(msg);
  console.log(`${colors.yellow}⚠️  WARNING: ${msg}${colors.reset}`);
}

function success(msg) {
  successes.push(msg);
  console.log(`${colors.green}✅ ${msg}${colors.reset}`);
}

function info(msg) {
  console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`);
}

function header(msg) {
  console.log(`\n${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bold}${msg}${colors.reset}`);
  console.log(`${colors.bold}${colors.blue}${'='.repeat(60)}${colors.reset}\n`);
}

// Check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// Run command and return output
function runCommand(cmd, silent = false) {
  try {
    const output = execSync(cmd, { encoding: 'utf-8', stdio: silent ? 'pipe' : 'inherit' });
    return { success: true, output };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Load and parse JSON file
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    return null;
  }
}

// Get all node files
function getNodeFiles() {
  const nodesDir = path.join(__dirname, 'nodes');
  const nodes = [];
  
  if (!fileExists(nodesDir)) {
    return nodes;
  }

  const folders = fs.readdirSync(nodesDir).filter(f => 
    fs.statSync(path.join(nodesDir, f)).isDirectory()
  );

  folders.forEach(folder => {
    const nodePath = path.join(nodesDir, folder);
    const files = fs.readdirSync(nodePath);
    const tsFile = files.find(f => f.endsWith('.node.ts'));
    const svgFile = files.find(f => f.endsWith('.svg'));
    
    if (tsFile) {
      nodes.push({
        folder,
        tsFile: path.join(nodePath, tsFile),
        svgFile: svgFile ? path.join(nodePath, svgFile) : null,
        name: tsFile.replace('.node.ts', '')
      });
    }
  });

  return nodes;
}

// Get all credential files
function getCredentialFiles() {
  const credsDir = path.join(__dirname, 'credentials');
  if (!fileExists(credsDir)) {
    return [];
  }
  
  return fs.readdirSync(credsDir)
    .filter(f => f.endsWith('.credentials.ts'))
    .map(f => ({
      file: path.join(credsDir, f),
      name: f.replace('.credentials.ts', '')
    }));
}

// Main validation
async function validateEverything() {
  console.log(`${colors.bold}\n🔍 n8n Custom Node Validator${colors.reset}`);
  console.log(`${colors.bold}   Checking absolutely everything...${colors.reset}\n`);

  // 1. Check package.json
  header('1. PACKAGE.JSON VALIDATION');
  const packageJson = loadJSON('package.json');
  
  if (!packageJson) {
    error('package.json not found or invalid JSON');
  } else {
    // Check name
    if (!packageJson.name) {
      error('Missing "name" in package.json');
    } else if (!packageJson.name.startsWith('n8n-nodes-')) {
      error(`Package name must start with "n8n-nodes-" (current: ${packageJson.name})`);
    } else {
      success(`Package name is valid: ${packageJson.name}`);
    }

    // Check version
    if (!packageJson.version) {
      error('Missing "version" in package.json');
    } else if (!/^\d+\.\d+\.\d+$/.test(packageJson.version)) {
      warn(`Version should follow semantic versioning (current: ${packageJson.version})`);
    } else {
      success(`Version is valid: ${packageJson.version}`);
    }

    // Check keywords
    if (!packageJson.keywords || !packageJson.keywords.includes('n8n-community-node-package')) {
      error('Missing required keyword "n8n-community-node-package"');
    } else {
      success('Required keyword present');
    }

    // Check n8n metadata
    if (!packageJson.n8n) {
      error('Missing "n8n" configuration in package.json');
    } else {
      if (!packageJson.n8n.n8nNodesApiVersion) {
        error('Missing n8n.n8nNodesApiVersion');
      }
      if (!packageJson.n8n.nodes || packageJson.n8n.nodes.length === 0) {
        error('No nodes defined in package.json');
      }
    }

    // Check author
    if (!packageJson.author) {
      warn('Missing author information');
    }

    // Check repository
    if (!packageJson.repository) {
      warn('Missing repository information');
    }

    // Check license
    if (!packageJson.license) {
      warn('Missing license information');
    }
  }

  // 2. Check Node Files
  header('2. NODE FILES VALIDATION');
  const nodes = getNodeFiles();
  
  if (nodes.length === 0) {
    error('No nodes found in /nodes directory');
  } else {
    info(`Found ${nodes.length} node(s)`);
    
    nodes.forEach(node => {
      console.log(`\n  Checking ${colors.bold}${node.name}${colors.reset}:`);
      
      // Check TypeScript file
      if (!fileExists(node.tsFile)) {
        error(`  Missing TypeScript file: ${node.tsFile}`);
      } else {
        success(`  TypeScript file exists`);
        
        // Check for common issues in the file
        const content = fs.readFileSync(node.tsFile, 'utf-8');
        
        if (!content.includes('export class')) {
          error(`  No exported class found in ${node.name}`);
        }
        
        if (!content.includes('INodeType')) {
          error(`  Node doesn't implement INodeType`);
        }
        
        if (!content.includes('description: INodeTypeDescription')) {
          error(`  Missing node description`);
        }
      }
      
      // Check icon
      if (!node.svgFile) {
        error(`  Missing icon file for ${node.name}`);
      } else if (!fileExists(node.svgFile)) {
        error(`  Icon file not found: ${node.svgFile}`);
      } else {
        success(`  Icon file exists`);
        
        // Check icon is valid SVG
        const svgContent = fs.readFileSync(node.svgFile, 'utf-8');
        if (!svgContent.includes('<svg')) {
          error(`  Invalid SVG file`);
        }
      }
      
      // Check if node is in package.json
      if (packageJson && packageJson.n8n && packageJson.n8n.nodes) {
        const nodeEntry = `dist/nodes/${node.folder}/${node.name}.node.js`;
        if (!packageJson.n8n.nodes.includes(nodeEntry)) {
          error(`  Node not registered in package.json: ${nodeEntry}`);
        } else {
          success(`  Node registered in package.json`);
        }
      }
    });
  }

  // 3. Check Credentials
  header('3. CREDENTIALS VALIDATION');
  const credentials = getCredentialFiles();
  
  if (credentials.length === 0) {
    info('No credential files found (this is OK if your nodes don\'t need auth)');
  } else {
    info(`Found ${credentials.length} credential file(s)`);
    
    credentials.forEach(cred => {
      console.log(`\n  Checking ${colors.bold}${cred.name}${colors.reset}:`);
      
      const content = fs.readFileSync(cred.file, 'utf-8');
      
      if (!content.includes('ICredentialType')) {
        error(`  Credential doesn't implement ICredentialType`);
      } else {
        success(`  Credential structure valid`);
      }
      
      // Check if registered in package.json
      if (packageJson && packageJson.n8n && packageJson.n8n.credentials) {
        const credEntry = `dist/credentials/${cred.name}.credentials.js`;
        if (!packageJson.n8n.credentials.includes(credEntry)) {
          error(`  Credential not registered in package.json: ${credEntry}`);
        } else {
          success(`  Credential registered in package.json`);
        }
      }
    });
  }

  // 4. Build Check
  header('4. BUILD VALIDATION');
  info('Running build...');
  const buildResult = runCommand('npm run build', true);
  
  if (!buildResult.success) {
    error('Build failed! Run "npm run build" to see errors');
  } else {
    success('Build successful');
    
    // Check dist folder
    if (!fileExists('dist')) {
      error('dist folder not created');
    } else {
      success('dist folder exists');
      
      // Check if all expected files are in dist
      nodes.forEach(node => {
        const distFile = path.join('dist', 'nodes', node.folder, `${node.name}.node.js`);
        if (!fileExists(distFile)) {
          error(`Built file missing: ${distFile}`);
        }
      });
    }
  }

  // 5. Linting Check
  header('5. LINTING VALIDATION');
  info('Running linter...');
  const lintResult = runCommand('npm run lint', true);
  
  if (!lintResult.success) {
    error('Linting failed! Run "npm run lint" to see errors');
    warn('Try "npm run lintfix" to auto-fix some issues');
  } else {
    success('All linting checks passed');
  }

  // 6. Dependencies Check
  header('6. DEPENDENCIES VALIDATION');
  
  // Check if node_modules exists
  if (!fileExists('node_modules')) {
    error('node_modules not found - run "npm install"');
  } else {
    success('Dependencies installed');
  }

  // Check for vulnerabilities
  info('Checking for vulnerabilities...');
  const auditResult = runCommand('npm audit --json', true);
  if (auditResult.output) {
    try {
      const audit = JSON.parse(auditResult.output);
      if (audit.metadata && audit.metadata.vulnerabilities) {
        const vulns = audit.metadata.vulnerabilities;
        if (vulns.critical > 0) {
          error(`${vulns.critical} critical vulnerabilities found - run "npm audit fix"`);
        } else if (vulns.high > 0) {
          warn(`${vulns.high} high severity vulnerabilities found`);
        } else if (vulns.moderate > 0 || vulns.low > 0) {
          info(`Some vulnerabilities found but not critical`);
        } else {
          success('No vulnerabilities found');
        }
      }
    } catch {
      warn('Could not parse vulnerability report');
    }
  }

  // 7. NPM Publishing Readiness
  header('7. NPM PUBLISHING READINESS');
  
  // Check if logged into npm
  const npmWhoami = runCommand('npm whoami', true);
  if (!npmWhoami.success) {
    warn('Not logged into npm - run "npm login" before publishing');
  } else {
    success(`Logged into npm as: ${npmWhoami.output.trim()}`);
  }

  // Check package name availability
  if (packageJson && packageJson.name) {
    const checkName = runCommand(`npm view ${packageJson.name} version`, true);
    if (checkName.success) {
      const publishedVersion = checkName.output.trim();
      warn(`Package already exists on npm (version: ${publishedVersion})`);
      info('Make sure to increment version before publishing');
    } else {
      success('Package name is available on npm');
    }
  }

  // Check .npmignore or files in package.json
  if (!fileExists('.npmignore') && (!packageJson.files || packageJson.files.length === 0)) {
    warn('No .npmignore or "files" in package.json - might publish unnecessary files');
  }

  // 8. Documentation Check
  header('8. DOCUMENTATION CHECK');
  
  if (!fileExists('README.md')) {
    error('README.md is missing');
  } else {
    success('README.md exists');
  }

  if (!fileExists('LICENSE')) {
    warn('LICENSE file is missing');
  } else {
    success('LICENSE file exists');
  }

  // Check docs folder
  if (fileExists('docs')) {
    const docFiles = fs.readdirSync('docs');
    if (docFiles.length > 0) {
      success(`Documentation folder contains ${docFiles.length} files`);
    }
  }

  // 9. Common Mistakes Check
  header('9. COMMON MISTAKES CHECK');
  
  // Check for console.log in production code
  nodes.forEach(node => {
    if (fileExists(node.tsFile)) {
      const content = fs.readFileSync(node.tsFile, 'utf-8');
      if (content.includes('console.log')) {
        warn(`console.log found in ${node.name} - remove before publishing`);
      }
    }
  });

  // Check for hardcoded credentials
  const allFiles = [...nodes.map(n => n.tsFile), ...credentials.map(c => c.file)];
  allFiles.forEach(file => {
    if (fileExists(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const suspiciousPatterns = [
        /api[_-]?key\s*=\s*["'][^"']+["']/i,
        /password\s*=\s*["'][^"']+["']/i,
        /secret\s*=\s*["'][^"']+["']/i,
        /token\s*=\s*["'][^"']+["']/i
      ];
      
      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          error(`Possible hardcoded credentials in ${path.basename(file)}`);
        }
      });
    }
  });

  // Final Summary
  header('VALIDATION SUMMARY');
  
  console.log(`\n${colors.bold}Results:${colors.reset}`);
  console.log(`  ${colors.green}✅ Passed: ${successes.length}${colors.reset}`);
  console.log(`  ${colors.yellow}⚠️  Warnings: ${warnings.length}${colors.reset}`);
  console.log(`  ${colors.red}❌ Errors: ${errors.length}${colors.reset}`);

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`\n${colors.green}${colors.bold}🎉 PERFECT! Your node is ready to publish!${colors.reset}`);
    console.log(`\n${colors.bold}Next steps:${colors.reset}`);
    console.log('  1. Run: npm publish');
    console.log('  2. Install in n8n: Settings → Community Nodes → Install');
    console.log(`  3. Share your node: ${packageJson ? packageJson.name : 'your-package'}`);
  } else if (errors.length === 0) {
    console.log(`\n${colors.yellow}${colors.bold}⚠️  ALMOST THERE! Fix the warnings if you want perfection.${colors.reset}`);
    console.log(`\n${colors.bold}You can publish, but consider fixing:${colors.reset}`);
    warnings.slice(0, 3).forEach(w => console.log(`  - ${w}`));
    if (warnings.length > 3) {
      console.log(`  ... and ${warnings.length - 3} more warnings`);
    }
  } else {
    console.log(`\n${colors.red}${colors.bold}❌ NOT READY! You have ${errors.length} error(s) to fix.${colors.reset}`);
    console.log(`\n${colors.bold}Must fix these errors:${colors.reset}`);
    errors.slice(0, 5).forEach(e => console.log(`  - ${e}`));
    if (errors.length > 5) {
      console.log(`  ... and ${errors.length - 5} more errors`);
    }
    console.log(`\n${colors.bold}Run this script again after fixing to recheck.${colors.reset}`);
  }

  console.log(`\n${colors.blue}${'='.repeat(60)}${colors.reset}\n`);

  // Exit with error code if there are errors
  process.exit(errors.length > 0 ? 1 : 0);
}

// Run validation
validateEverything().catch(err => {
  console.error(`\n${colors.red}Validation script crashed:${colors.reset}`, err);
  process.exit(1);
});