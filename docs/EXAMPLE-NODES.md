# Example Nodes Documentation

This template includes three practical example nodes that demonstrate different
n8n node patterns.

## 1. WebScraper Node

**Purpose**: Extract data from websites using CSS selectors or automatic
content extraction.

### Features

- **Simple Mode**: Automatically extracts main content (articles,
  documentation)
- **Advanced Mode**: Define specific fields using CSS selectors
- No authentication required
- Supports custom user agents and timeouts

### What You Learn (WebScraper)

- Basic node structure without authentication
- Dynamic property inputs (field arrays)
- HTTP requests and HTML parsing
- Using external libraries (cheerio)
- Error handling patterns

### Usage Example

**Advanced Mode Configuration:**

```text
URL: https://example.com/product
Fields:
  - Field Name: title
    CSS Selector: h1.product-title
    Extract: Text Content
  - Field Name: price
    CSS Selector: .price-tag
    Extract: Text Content
  - Field Name: image
    CSS Selector: img.main-image
    Extract: src
```

## 2. SimpleAPI Node

**Purpose**: Make authenticated API requests with various authentication
methods.

### Features (SimpleAPI)

- API Key authentication (header or query parameter)
- All HTTP methods (GET, POST, PUT, DELETE, etc.)
- Custom headers and query parameters
- JSON body support for POST/PUT
- Response format options (JSON, text, binary)

### What You Learn (SimpleAPI)

- Creating and using credentials
- Credential encryption and decryption
- HTTP request patterns
- Authentication handling
- Request/response processing

### Credential Setup

The `SimpleApi.credentials.ts` file shows how to:

- Define credential fields
- Use password fields for sensitive data
- Configure where to send authentication (header vs query)
- Add helper text and placeholders

## 3. DataTransform Node

**Purpose**: Transform data between different formats without external
APIs.

### Operations

1. **JSON to CSV**: Convert JSON arrays to CSV format
2. **CSV to JSON**: Parse CSV text into JSON objects
3. **Field Mapper**: Rename and restructure fields
4. **Filter Data**: Filter items based on conditions
5. **Flatten Object**: Convert nested objects to flat structure
6. **Unflatten Object**: Convert flat structure to nested objects

### What You Learn (DataTransform)

- Pure data processing (no external APIs)
- Working with different data formats
- Array and object manipulation
- Complex UI with conditional display
- Multiple operation patterns in one node

### Usage Examples

**Field Mapper:**

```text
Source Field: user.email
Target Field: contactEmail
Default Value: no-email@example.com
```

**Filter Data:**

```text
Field: status
Operator: Equals
Value: active
```

## Node Development Patterns

### Common Patterns Used

1. **Error Handling**

   ```typescript
   if (this.continueOnFail()) {
     // Return error in output
   } else {
     throw error;
   }
   ```

2. **Dynamic Properties**

   ```typescript
   displayOptions: {
     show: {
       operation: ['advanced']
     }
   }
   ```

3. **Credential Usage**

   ```typescript
   const credentials = await this.getCredentials('simpleApi');
   ```

4. **Iterating Input Items**

   ```typescript
   for (let i = 0; i < items.length; i++) {
     // Process each item
   }
   ```

## Customizing These Nodes

### To Create Your Own Node

1. **Copy a similar example**
   - WebScraper for data extraction
   - SimpleAPI for authenticated APIs
   - DataTransform for data processing

2. **Rename everything**
   - Folder name
   - File names
   - Class name (must match file name)
   - Node name property

3. **Modify the functionality**
   - Change properties
   - Update execute logic
   - Add your API calls

4. **Update package.json**
   - Add to nodes array
   - Add any new dependencies

### Icon Creation

Each node needs a 60x60px SVG icon. The examples show:

- WebScraper: Globe with extraction arrows
- SimpleAPI: Cloud with key symbol
- DataTransform: Transform cycle with boxes

## Testing Your Nodes

1. Build the project: `npm run build`
2. Link locally: `npm link`
3. Link in n8n:
   `cd ~/.n8n/custom && npm link n8n-nodes-template`
4. Start n8n: `n8n start`
5. Find your nodes in the node panel

## Common Issues

- **Import errors**: Make sure cheerio is installed for WebScraper
- **Credential errors**: Check credential name matches in both files
- **Node not appearing**: Verify package.json paths use `.js` not `.ts`
- **Build errors**: Run `npm run lint` to find issues

## Next Steps

1. Study the patterns in these examples
2. Decide which example is closest to your needs
3. Copy and modify it for your use case
4. Test thoroughly before publishing
