# Astro MCP Server - Testing Guide

## Quick Start

1. **Build the server** (already done):
   ```bash
   npm run build
   ```

2. **Test with MCP Inspector**:
   ```bash
   npx @modelcontextprotocol/inspector node build/index.js
   ```

3. **Configure with Claude Desktop**:
   
   Edit your Claude config file:
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   
   Add this configuration:
   ```json
   {
     "mcpServers": {
       "astro": {
         "command": "node",
         "args": ["c:\\repos\\dl-astro-mcp-01\\build\\index.js"]
       }
     }
   }
   ```

4. **Restart Claude Desktop** and start using the Astro tools!

## Available Tools

### create-astro-page
Creates a new page in `src/pages/`

Example prompts:
- "Create a new about page for my Astro site"
- "Make a contact page with a form"
- "Create a blog/post.astro page"

### create-astro-component
Creates a new component in `src/components/`

Example prompts:
- "Create a Button component"
- "Make a Header component in components/layout"
- "Create a Footer component"

### list-astro-pages
Lists all pages in the project

Example prompts:
- "Show me all the pages in my project"
- "List all Astro pages"
- "What pages do I have?"

## Sample Directory Structure

The server expects (and creates) this structure:
```
your-astro-project/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   └── blog/
│   │       └── post.astro
│   └── components/
│       ├── Card.astro
│       └── layout/
│           └── Header.astro
```

## Debugging

View server logs in stderr. The server will log:
- "Astro MCP Server running on stdio" when started
- Any errors during file operations

To see detailed logs, check the MCP Inspector output.
