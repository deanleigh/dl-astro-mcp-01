# Publishing to npm (Optional)

If you want to share this MCP server with the community, here's how to publish it to npm.

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm:
   ```bash
   npm login
   ```

## Pre-Publication Checklist

- [ ] Update `package.json` with your information:
  - [ ] Change `author` field
  - [ ] Add `repository` URL
  - [ ] Add `homepage` URL
  - [ ] Add `bugs` URL
- [ ] Ensure all tests pass
- [ ] Update version number if republishing
- [ ] Review `files` array in package.json
- [ ] Add a LICENSE file if not using MIT

## Update package.json

```json
{
  "name": "astro-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for creating and managing Astro pages and components",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/astro-mcp-server"
  },
  "homepage": "https://github.com/yourusername/astro-mcp-server#readme",
  "bugs": {
    "url": "https://github.com/yourusername/astro-mcp-server/issues"
  }
}
```

## Publishing Steps

### 1. Build the package
```bash
npm run build
```

### 2. Test the package locally (optional)
```bash
npm pack
```

This creates a `.tgz` file you can test with:
```bash
npm install ./astro-mcp-server-1.0.0.tgz
```

### 3. Publish to npm
```bash
npm publish
```

For scoped packages (recommended):
```bash
npm publish --access public
```

## After Publishing

### Installation
Users can install your package with:
```bash
npm install -g astro-mcp-server
```

### Usage
Users can then run:
```bash
astro-mcp-server
```

Or configure in Claude Desktop:
```json
{
  "mcpServers": {
    "astro": {
      "command": "npx",
      "args": ["-y", "astro-mcp-server"]
    }
  }
}
```

## Versioning

Follow semantic versioning:
- **1.0.0** - Initial release
- **1.0.1** - Patch (bug fixes)
- **1.1.0** - Minor (new features, backward compatible)
- **2.0.0** - Major (breaking changes)

Update version:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

Then publish:
```bash
npm publish
```

## Add to MCP Registry

Once published, submit your server to the official MCP registry:
1. Fork https://github.com/modelcontextprotocol/servers
2. Add your server to the community servers list
3. Create a pull request

## Best Practices

1. **Keep README.md updated** with:
   - Clear installation instructions
   - Usage examples
   - Configuration guide
   - Troubleshooting section

2. **Use GitHub releases** to track versions

3. **Add badges** to README.md:
   ```markdown
   ![npm version](https://badge.fury.io/js/astro-mcp-server.svg)
   ![npm downloads](https://img.shields.io/npm/dm/astro-mcp-server.svg)
   ```

4. **Set up CI/CD** with GitHub Actions:
   - Run tests on every commit
   - Automated publishing on release

5. **Add keywords** for discoverability:
   ```json
   "keywords": [
     "mcp",
     "model-context-protocol",
     "astro",
     "ai",
     "llm",
     "claude",
     "assistant"
   ]
   ```

## Example GitHub Actions Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm install
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Support

After publishing, be prepared to:
- Respond to issues on GitHub
- Review and merge pull requests
- Update documentation
- Fix bugs and release patches
- Add new features based on user feedback

## Alternative Distribution

Instead of npm, you can also:
1. Distribute via GitHub releases
2. Provide installation via `git clone`
3. Create a Docker image
4. Bundle with other tools

## License

Ensure you have a LICENSE file. This project uses MIT:

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Note**: Publishing is optional. You can use this server locally or within your organization without publishing to npm.
