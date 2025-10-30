# Leva Documentation Site Structure

This document outlines the complete structure of the Leva documentation site.

## Overview

The documentation site is built with Astro Starlight and contains comprehensive guides, examples, and API documentation for Leva.

## Site Structure

### Getting Started (3 pages)

- **Introduction** (`index.mdx`) - Homepage with feature cards and quick example
- **Installation** - Package installation and setup
- **Quick Start** - Basic usage and core concepts

### Guides (4 pages)

- **Input Types** - All 12+ input types with examples
- **Configuration** - Panel configuration, folders, conditional rendering
- **Styling** - Custom themes and appearance customization
- **Plugins** - Overview of plugins and how to use them

### Examples (6 pages)

Based on the demo directory sandboxes:

- **Minimal Setup** - Simple controls demo
- **Advanced Panels** - Multiple stores and LevaPanel
- **Custom Theme** - Full theming example
- **Transient Updates** - Performance optimization with onChange
- **Scroll Integration** - Scroll-driven animations
- **UI Components** - Using Leva as a UI library

### Plugins (5 pages)

Documentation for official plugins:

- **Creating Plugins** - Plugin development guide
- **Bezier Plugin** - Cubic bezier curve editor
- **Spring Plugin** - Spring physics configuration
- **Plot Plugin** - Data visualization and monitoring
- **Dates Plugin** - Date and time picker

### Advanced (3 pages)

In-depth topics:

- **Controlled Inputs** - External state management with set/onChange
- **TypeScript** - Type safety and inference
- **Custom Plugin Development** - Complete plugin tutorial

## Total Pages: 21

## Key Features

### Navigation

- Organized sidebar with clear sections
- Social links (GitHub, Discord)
- Search functionality (built-in Pagefind)

### Content

- Code examples throughout
- Real-world use cases
- Best practices and tips
- Cross-references between pages

### Design

- Responsive layout
- Dark theme optimized for code
- Syntax highlighting
- Interactive components (cards, tabs)

## Development Commands

```bash
# From project root
pnpm docs:dev      # Start dev server
pnpm docs:build    # Build for production
pnpm docs:preview  # Preview production build
```

## Content Guidelines

1. All pages have frontmatter with title and description
2. Code examples show both basic and advanced usage
3. Cross-links guide users to related content
4. Examples are based on actual demo sandboxes
5. TypeScript examples included where relevant

## Inspiration Sources

- Demo directory sandboxes (primary)
- Existing `/docs` markdown files
- README.md
- Official plugin implementations
- Storybook stories

## Future Additions

Potential future content:

- Video tutorials
- Interactive playground
- Migration guides
- Community plugins showcase
- Performance optimization guide
- Accessibility guide
