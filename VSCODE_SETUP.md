# Using Astro MCP Server in VS Code

This guide shows you how to use the Astro MCP Server in VS Code with any Astro project you choose.

## Setup for Any Astro Project

### Option 1: Copy MCP Server to Your Project (Recommended)

1. **Copy the built server** to your Astro project:
   ```bash
   # From your Astro project directory
   mkdir -p .mcp
   cp c:/repos/dl-astro-mcp-01/build/index.js .mcp/astro-server.js
   ```

2. **Create `.vscode/mcp.json`** in your Astro project:
   ```json
   {
     "servers": {
       "astro": {
         "type": "stdio",
         "command": "node",
         "args": [
           "${workspaceFolder}/.mcp/astro-server.js",
           "${workspaceFolder}"
         ]
       }
     }
   }
   ```

3. **Open your Astro project in VS Code** and the MCP server will automatically connect!

### Option 2: Use from Central Location

1. **Create `.vscode/mcp.json`** in your Astro project:
   ```json
   {
     "servers": {
       "astro": {
         "type": "stdio",
         "command": "node",
         "args": [
           "c:\\repos\\dl-astro-mcp-01\\build\\index.js",
           "${workspaceFolder}"
         ]
       }
     }
   }
   ```

2. **Open your Astro project in VS Code**

### Option 3: Global Installation (After Publishing to npm)

Once published to npm, you can install globally:

```bash
npm install -g astro-mcp-server
```

Then in any Astro project's `.vscode/mcp.json`:
```json
{
  "servers": {
    "astro": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "astro-mcp-server",
        "${workspaceFolder}"
      ]
    }
  }
}
```

## How It Works

The server now accepts a **project path** as the first argument:
```bash
node build/index.js /path/to/your/astro/project
```

If no path is provided, it uses the current working directory.

VS Code's `${workspaceFolder}` variable automatically points to your open project, so the server will always work on the correct Astro project.

## Verify It's Working

1. Open your Astro project in VS Code
2. Open Copilot Chat
3. Type `#` and you should see the Astro MCP tools listed
4. Try asking: "List all pages in my project"

You should see output showing:
- Project root: /path/to/your/astro/project
- Pages directory: /path/to/your/astro/project/src/pages
- Components directory: /path/to/your/astro/project/src/components

## Usage in VS Code Copilot Chat

Once configured, you can use these tools in VS Code:

### Using the # Symbol
Type `#` in Copilot Chat to see available MCP tools:
- `#create-astro-page`
- `#create-astro-component`
- `#list-astro-pages`

### Natural Language
Just ask Copilot:
- "Create a new about page for this Astro project"
- "Make a Button component in the components folder"
- "List all the pages I have"

## Multiple Astro Projects

You can have different Astro projects open in different VS Code windows, and each will have its own MCP server instance pointing to the correct project.

Just make sure each project has its `.vscode/mcp.json` file configured.

## Debugging

If the server isn't working:

1. **Check the Output panel** in VS Code:
   - View → Output
   - Select "MCP" from the dropdown
   - You should see the server startup logs

2. **Verify the paths** in your `mcp.json`

3. **Test manually**:
   ```bash
   cd your-astro-project
   node c:\repos\dl-astro-mcp-01\build\index.js .
   ```
   You should see:
   ```
   Astro MCP Server starting...
   Project root: /path/to/your-astro-project
   Pages directory: /path/to/your-astro-project/src/pages
   ```

4. **Ensure directories exist**:
   ```bash
   mkdir -p src/pages src/components
   ```

## Quick Template for New Projects

Save this as a template `.vscode/mcp.json` for new Astro projects:

```json
{
  "servers": {
    "astro": {
      "type": "stdio",
      "command": "node",
      "args": [
        "c:\\repos\\dl-astro-mcp-01\\build\\index.js",
        "${workspaceFolder}"
      ]
    }
  }
}
```

Just copy this file to any new Astro project and the MCP server will work immediately!

## Tips

- The `${workspaceFolder}` variable ensures the server always works on your currently open project
- You can have multiple VS Code windows open with different Astro projects, each with their own MCP server
- The server logs show exactly which directories it's using, helping with debugging
- All file paths are absolute, so there's no confusion about where files are created

## Example Workflow

1. Open your Astro project in VS Code
2. The MCP server automatically connects
3. Ask Copilot: "Create a homepage with a hero section"
4. Copilot uses the `create-astro-page` tool
5. File is created in `src/pages/index.astro` in your project
6. You immediately see it in VS Code's file explorer

That's it! Now you can use the Astro MCP server with any Astro project in VS Code.
