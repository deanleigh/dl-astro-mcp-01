# Example Usage of Astro MCP Server

This document provides practical examples of using the Astro MCP Server with an AI assistant.

## Example 1: Creating a Simple Page

**User prompt:**
> "Create a new about page for my Astro website with a simple introduction"

**Expected AI action:**
The AI will use the `create-astro-page` tool with:
```json
{
  "pageName": "about",
  "content": "---\ntitle: 'About Us'\n---\n<html>\n  <head>\n    <title>{title}</title>\n  </head>\n  <body>\n    <h1>About Us</h1>\n    <p>Welcome to our website. We are passionate about creating amazing web experiences.</p>\n  </body>\n</html>"
}
```

**Result:**
File created at: `src/pages/about.astro`

## Example 2: Creating a Component

**User prompt:**
> "Create a reusable Button component with props for text and onClick"

**Expected AI action:**
The AI will use the `create-astro-component` tool with:
```json
{
  "componentName": "Button",
  "content": "---\nconst { text, onClick, variant = 'primary' } = Astro.props;\n---\n<button class={`btn btn-${variant}`} onclick={onClick}>\n  {text}\n</button>\n\n<style>\n  .btn {\n    padding: 0.5rem 1rem;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n  }\n  .btn-primary {\n    background: #0066cc;\n    color: white;\n  }\n  .btn-secondary {\n    background: #6c757d;\n    color: white;\n  }\n</style>"
}
```

**Result:**
File created at: `src/components/Button.astro`

## Example 3: Creating a Nested Component

**User prompt:**
> "Create a Header component inside a layout subdirectory"

**Expected AI action:**
The AI will use the `create-astro-component` tool with:
```json
{
  "componentName": "Header",
  "directory": "layout",
  "content": "---\nconst { siteName = 'My Astro Site' } = Astro.props;\n---\n<header>\n  <nav>\n    <h1>{siteName}</h1>\n    <ul>\n      <li><a href=\"/\">Home</a></li>\n      <li><a href=\"/about\">About</a></li>\n      <li><a href=\"/contact\">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n\n<style>\n  header {\n    background: #333;\n    color: white;\n    padding: 1rem;\n  }\n  nav {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  ul {\n    display: flex;\n    gap: 1rem;\n    list-style: none;\n  }\n  a {\n    color: white;\n    text-decoration: none;\n  }\n</style>"
}
```

**Result:**
File created at: `src/components/layout/Header.astro`

## Example 4: Creating a Blog Post Page

**User prompt:**
> "Create a blog post page in a blog subdirectory"

**Expected AI action:**
The AI will use the `create-astro-page` tool with:
```json
{
  "pageName": "post",
  "directory": "blog",
  "content": "---\nimport Layout from '../../layouts/Layout.astro';\n\nconst { title, date, author } = Astro.props;\n---\n<Layout title={title}>\n  <article>\n    <h1>{title}</h1>\n    <div class=\"meta\">\n      <span>By {author}</span>\n      <span>{date}</span>\n    </div>\n    <div class=\"content\">\n      <slot />\n    </div>\n  </article>\n</Layout>\n\n<style>\n  article {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 2rem;\n  }\n  .meta {\n    display: flex;\n    gap: 1rem;\n    color: #666;\n    margin-bottom: 2rem;\n  }\n</style>"
}
```

**Result:**
File created at: `src/pages/blog/post.astro`

## Example 5: Listing All Pages

**User prompt:**
> "Show me all the pages in my Astro project"

**Expected AI action:**
The AI will use the `list-astro-pages` tool with:
```json
{
  "directory": ""
}
```

**Expected response:**
```
Found 3 Astro page(s):
index.astro
about.astro
blog/post.astro
```

## Example 6: Listing Pages in a Specific Directory

**User prompt:**
> "List all blog pages"

**Expected AI action:**
The AI will use the `list-astro-pages` tool with:
```json
{
  "directory": "blog"
}
```

**Expected response:**
```
Found 1 Astro page(s):
post.astro
```

## Example 7: Complex Component with Multiple Features

**User prompt:**
> "Create a Card component with an image, title, description, and a link"

**Expected AI action:**
The AI will use the `create-astro-component` tool with:
```json
{
  "componentName": "Card",
  "content": "---\nconst { \n  image, \n  imageAlt = 'Card image', \n  title, \n  description, \n  link, \n  linkText = 'Read more' \n} = Astro.props;\n---\n<div class=\"card\">\n  {image && (\n    <img src={image} alt={imageAlt} class=\"card-image\" />\n  )}\n  <div class=\"card-content\">\n    <h3>{title}</h3>\n    <p>{description}</p>\n    {link && (\n      <a href={link} class=\"card-link\">{linkText}</a>\n    )}\n  </div>\n</div>\n\n<style>\n  .card {\n    border: 1px solid #e0e0e0;\n    border-radius: 8px;\n    overflow: hidden;\n    transition: transform 0.2s, box-shadow 0.2s;\n  }\n  .card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  .card-image {\n    width: 100%;\n    height: 200px;\n    object-fit: cover;\n  }\n  .card-content {\n    padding: 1.5rem;\n  }\n  .card-content h3 {\n    margin: 0 0 0.5rem 0;\n    font-size: 1.5rem;\n  }\n  .card-content p {\n    margin: 0 0 1rem 0;\n    color: #666;\n  }\n  .card-link {\n    display: inline-block;\n    color: #0066cc;\n    text-decoration: none;\n    font-weight: 500;\n  }\n  .card-link:hover {\n    text-decoration: underline;\n  }\n</style>"
}
```

**Result:**
File created at: `src/components/Card.astro`

## Tips for Using the Server

1. **Be specific about content**: The AI can generate full Astro components with proper syntax if you describe what you want clearly.

2. **Use subdirectories**: Organize your components and pages by specifying the `directory` parameter.

3. **Leverage Astro features**: Ask the AI to create components with:
   - Props
   - Scoped styles
   - TypeScript
   - Slots
   - Client-side JavaScript

4. **Check existing pages**: Use `list-astro-pages` before creating new pages to avoid duplicates.

5. **Iterate**: If a component isn't quite right, ask the AI to create a new version with modifications.

## Common Workflows

### Setting up a new blog
1. Create blog layout components (Header, Footer, Layout)
2. Create the blog index page
3. Create individual post pages
4. Create reusable blog components (PostCard, TagList, etc.)

### Building a landing page
1. Create the main index page
2. Create components (Hero, Features, CTA, Testimonials)
3. Assemble components in the index page

### Creating a documentation site
1. Create layout components (Sidebar, TOC, Layout)
2. Create documentation pages in subdirectories
3. Create utility components (CodeBlock, Alert, etc.)
