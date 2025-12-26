# 🚀 Quick Start Guide - Astro MCP Server

Get started with the Astro MCP Server in 3 minutes!

## ⚡ What You Have

A fully functional TypeScript MCP server that lets AI assistants:
- ✅ Create Astro pages
- ✅ Create Astro components  
- ✅ List existing pages

## 📋 Prerequisites

- Node.js 17+ installed
- An MCP-compatible client (Claude Desktop, VS Code, etc.)

## 🎯 Setup (Choose One)

### Option 1: Use with Claude Desktop (Recommended)

1. **Find your Claude config file:**
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Add this configuration:**
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
   ⚠️ **Important**: Use the actual absolute path on your system!

3. **Restart Claude Desktop**

4. **Test it!** Ask Claude:
   > "Create a new about page for my Astro site"

### Option 2: Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

This opens a web interface where you can test all tools interactively.

### Option 3: Use with VS Code

The server is pre-configured in `.vscode/mcp.json`. Just open this folder in VS Code with the MCP extension installed.

## 💡 Try These Commands

Once connected, ask your AI assistant:

### Create Pages
- "Create a new about page"
- "Make a contact page with a form"  
- "Create a blog post page in the blog directory"

### Create Components
- "Create a Button component"
- "Make a Header component in components/layout"
- "Create a Card component with image, title, and description"

### List Pages
- "Show me all pages in my project"
- "List all blog pages"

## 📁 Project Structure

The server expects this structure (it creates directories automatically):

```
your-astro-project/
├── src/
│   ├── pages/          # Pages go here
│   │   └── index.astro
│   └── components/     # Components go here
│       └── Card.astro
```

## 🎓 Next Steps

1. **Read the full docs**: Check [README.md](README.md)
2. **See examples**: Open [EXAMPLES.md](EXAMPLES.md)
3. **Learn testing**: Read [TESTING.md](TESTING.md)
4. **Understand the code**: Review [src/index.ts](src/index.ts)

## 🐛 Troubleshooting

### Server not connecting?
- Verify the path in your config is correct and absolute
- Make sure you ran `npm run build`
- Restart your MCP client after config changes

### Files not being created?
- Check you have write permissions
- Verify `src/pages` and `src/components` directories exist
- Look at error messages for specific issues

### Need help?
Check [TESTING.md](TESTING.md) for detailed debugging steps.

## 🎉 That's It!

You're ready to use the Astro MCP Server! The AI can now help you build your Astro site faster.

---

**Quick Reference**

| File | Purpose |
|------|---------|
| README.md | Full documentation |
| EXAMPLES.md | Usage examples |
| TESTING.md | Testing & debugging |
| PROJECT_SUMMARY.md | Technical overview |
| PUBLISHING.md | How to publish to npm |

**Tools Available**

| Tool | Description |
|------|-------------|
| create-astro-page | Creates new pages in src/pages/ |
| create-astro-component | Creates components in src/components/ |
| list-astro-pages | Lists all Astro pages |
