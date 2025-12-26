# Astro MCP Server

An MCP (Model Context Protocol) server that provides tools for creating and managing Astro pages and components. This server enables AI assistants to interact with Astro projects through standardized tools.

## Features

This MCP server provides three main tools:

### 1. create-astro-page
Create a new Astro page in the `src/pages` directory.

**Parameters:**
- `pageName` (string, required): Name of the page (without .astro extension)
- `content` (string, required): Content of the Astro page
- `directory` (string, optional): Subdirectory in pages folder

**Example:**
```javascript
{
  "pageName": "about",
  "content": "---\ntitle: 'About Us'\n---\n<h1>{title}</h1>",
  "directory": "" // optional
}
```

### 2. create-astro-component
Create a new Astro component in the `src/components` directory.

**Parameters:**
- `componentName` (string, required): Name of the component (without .astro extension)
- `content` (string, required): Content of the Astro component
- `directory` (string, optional): Subdirectory in components folder

**Example:**
```javascript
{
  "componentName": "Header",
  "content": "---\nconst { title } = Astro.props;\n---\n<header><h1>{title}</h1></header>",
  "directory": "layout" // optional
}
```

### 3. list-astro-pages
List all Astro pages in the project.

**Parameters:**
- `directory` (string, optional): Specific directory to list

**Example:**
```javascript
{
  "directory": "" // optional, lists all pages if omitted
}
```

## Installation

### Prerequisites
- Node.js 17 or higher
- npm or similar package manager

### Setup

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Build the server:
```bash
npm run build
```

## Usage

### With Claude Desktop

Add this server to your Claude Desktop configuration file:

**macOS/Linux:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "astro": {
      "command": "node",
      "args": [
        "C:\\repos\\dl-astro-mcp-01\\build\\index.js"
      ]
    }
  }
}
```

**Important:** Replace the path with the absolute path to your `build/index.js` file.

### With MCP Inspector

Test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node C:\repos\dl-astro-mcp-01\build\index.js
```

### Direct Usage

You can also run the server directly:

```bash
node build/index.js
```

## Project Structure

```
astro-mcp-server/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript (generated)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Development

### Building

Compile TypeScript to JavaScript:
```bash
npm run build
```

### Watch Mode

Automatically rebuild on file changes:
```bash
npm run dev
```

## How It Works

The server uses the Model Context Protocol SDK to expose three tools:

1. **create-astro-page**: Creates `.astro` files in `src/pages/` directory with optional subdirectories
2. **create-astro-component**: Creates `.astro` files in `src/components/` directory with optional subdirectories
3. **list-astro-pages**: Recursively lists all `.astro` files in the pages directory

All file operations include:
- Automatic directory creation
- Duplicate file checking
- Proper error handling
- Relative path display

## Example Workflows

### Creating a New Page
Ask your AI assistant:
> "Create a new Astro page called 'contact' with a simple contact form"

The assistant will use the `create-astro-page` tool to generate the page.

### Creating a Component
Ask your AI assistant:
> "Create a Button component in the components/ui directory"

The assistant will use the `create-astro-component` tool with the appropriate directory structure.

### Listing Pages
Ask your AI assistant:
> "Show me all the pages in my Astro project"

The assistant will use the `list-astro-pages` tool to display all pages.

## Troubleshooting

### Server Not Connecting
- Ensure the path in your configuration is absolute and correct
- Check that the server was built successfully (`npm run build`)
- Restart Claude Desktop after configuration changes

### File Creation Errors
- Verify that `src/pages` and `src/components` directories exist
- Check file permissions in your project directory
- Ensure you're running from an Astro project root

## MCP Configuration

The server is configured in `.vscode/mcp.json` for VS Code integration:

```json
{
  "servers": {
    "astro-mcp-server": {
      "type": "stdio",
      "command": "node",
      "args": ["build/index.js"]
    }
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Astro Documentation](https://docs.astro.build)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
