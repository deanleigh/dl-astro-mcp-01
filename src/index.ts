#!/usr/bin/env node

/**
 * Astro MCP Server
 * 
 * An MCP server that provides tools for creating and managing Astro pages and components.
 * This server enables AI assistants to interact with Astro projects through standardized tools.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// Tool input schemas
const createPageSchema = z.object({
  pageName: z.string().describe("Name of the page (without .astro extension)"),
  content: z.string().describe("Content of the Astro page"),
  directory: z.string().optional().describe("Subdirectory in pages folder (optional)"),
});

const createComponentSchema = z.object({
  componentName: z.string().describe("Name of the component (without .astro extension)"),
  content: z.string().describe("Content of the Astro component"),
  directory: z.string().optional().describe("Subdirectory in components folder (optional)"),
});

const listPagesSchema = z.object({
  directory: z.string().optional().describe("Specific directory to list (optional)"),
});

// Get the project root from command line args or use current working directory
const PROJECT_ROOT = process.argv[2] || process.cwd();

// Server configuration
const ASTRO_PAGES_DIR = path.join(PROJECT_ROOT, "src/pages");
const ASTRO_COMPONENTS_DIR = path.join(PROJECT_ROOT, "src/components");

/**
 * Creates a new Astro page
 */
async function createPage(args: z.infer<typeof createPageSchema>): Promise<string> {
  const { pageName, content, directory } = args;
  
  // Ensure page name ends with .astro
  const fileName = pageName.endsWith(".astro") ? pageName : `${pageName}.astro`;
  
  // Build the full path
  const basePath = directory 
    ? path.join(ASTRO_PAGES_DIR, directory)
    : ASTRO_PAGES_DIR;
  
  const filePath = path.join(basePath, fileName);
  
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(basePath, { recursive: true });
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      return `Error: Page ${fileName} already exists at ${filePath}`;
    } catch {
      // File doesn't exist, continue
    }
    
    // Write the file
    await fs.writeFile(filePath, content, "utf-8");
    
    return `Successfully created page: ${filePath}`;
  } catch (error) {
    return `Error creating page: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Creates a new Astro component
 */
async function createComponent(args: z.infer<typeof createComponentSchema>): Promise<string> {
  const { componentName, content, directory } = args;
  
  // Ensure component name ends with .astro
  const fileName = componentName.endsWith(".astro") ? componentName : `${componentName}.astro`;
  
  // Build the full path
  const basePath = directory 
    ? path.join(ASTRO_COMPONENTS_DIR, directory)
    : ASTRO_COMPONENTS_DIR;
  
  const filePath = path.join(basePath, fileName);
  
  try {
    // Create directory if it doesn't exist
    await fs.mkdir(basePath, { recursive: true });
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      return `Error: Component ${fileName} already exists at ${filePath}`;
    } catch {
      // File doesn't exist, continue
    }
    
    // Write the file
    await fs.writeFile(filePath, content, "utf-8");
    
    return `Successfully created component: ${filePath}`;
  } catch (error) {
    return `Error creating component: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Lists all Astro pages in the project
 */
async function listPages(args: z.infer<typeof listPagesSchema>): Promise<string> {
  const { directory } = args;
  
  const basePath = directory 
    ? path.join(ASTRO_PAGES_DIR, directory)
    : ASTRO_PAGES_DIR;
  
  try {
    // Check if directory exists
    try {
      await fs.access(basePath);
    } catch {
      return `Directory not found: ${basePath}`;
    }
    
    // Read directory recursively
    const pages = await findAstroFiles(basePath, basePath);
    
    if (pages.length === 0) {
      return `No Astro pages found in ${basePath}`;
    }
    
    return `Found ${pages.length} Astro page(s):\n${pages.join("\n")}`;
  } catch (error) {
    return `Error listing pages: ${error instanceof Error ? error.message : String(error)}`;
  }
}

/**
 * Recursively find all .astro files in a directory
 */
async function findAstroFiles(dir: string, baseDir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await findAstroFiles(fullPath, baseDir);
        files.push(...subFiles);
      } else if (entry.isFile() && entry.name.endsWith(".astro")) {
        // Get relative path from base directory
        const relativePath = path.relative(baseDir, fullPath);
        files.push(relativePath);
      }
    }
  } catch (error) {
    // Ignore errors for individual directories
  }
  
  return files;
}

/**
 * Main server initialization
 */
async function main() {
  // Log project root to stderr
  console.error(`Astro MCP Server starting...`);
  console.error(`Project root: ${PROJECT_ROOT}`);
  console.error(`Pages directory: ${ASTRO_PAGES_DIR}`);
  console.error(`Components directory: ${ASTRO_COMPONENTS_DIR}`);
  
  // Create MCP server instance
  const server = new McpServer({
    name: "astro-mcp-server",
    version: "1.0.0",
  });

  // Register create-page tool
  server.tool(
    "create-astro-page",
    "Create a new Astro page in the src/pages directory",
    {
      pageName: z.string().describe("Name of the page (without .astro extension)"),
      content: z.string().describe("Content of the Astro page"),
      directory: z.string().optional().describe("Subdirectory in pages folder (optional)"),
    },
    async ({ pageName, content, directory }) => {
      const result = await createPage({ pageName, content, directory });
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }
  );

  // Register create-component tool
  server.tool(
    "create-astro-component",
    "Create a new Astro component in the src/components directory",
    {
      componentName: z.string().describe("Name of the component (without .astro extension)"),
      content: z.string().describe("Content of the Astro component"),
      directory: z.string().optional().describe("Subdirectory in components folder (optional)"),
    },
    async ({ componentName, content, directory }) => {
      const result = await createComponent({ componentName, content, directory });
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }
  );

  // Register list-pages tool
  server.tool(
    "list-astro-pages",
    "List all Astro pages in the project",
    {
      directory: z.string().optional().describe("Specific directory to list (optional)"),
    },
    async ({ directory }) => {
      const result = await listPages({ directory });
      return {
        content: [
          {
            type: "text",
            text: result,
          },
        ],
      };
    }
  );

  // Set up stdio transport
  const transport = new StdioServerTransport();
  
  // Connect server to transport
  await server.connect(transport);
  
  // Log to stderr (stdout is used for MCP communication)
  console.error("Astro MCP Server running on stdio");
}

// Run the server
main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
