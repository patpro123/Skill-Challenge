# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

Claude-AgentOS is a meta-framework for AI-assisted development — a collection of Claude Code slash commands that help teams define engineering standards, plan features, and keep that context accessible to both humans and AI agents. There is no build system, test suite, or runtime application.

## Core Commands

All commands live in `.claude/commands/agent-os/` and are invoked as slash commands:

| Command | Purpose |
|---|---|
| `/plan-product` | Interactively gather mission, roadmap, and tech stack; writes to `agent-os/product/` |
| `/discover-standards` | Extract patterns from the codebase into documented standards in `agent-os/standards/` |
| `/index-standards` | Scan all standards files and rebuild `agent-os/standards/index.yml` |
| `/inject-standards` | Pull relevant standards into the current conversation, skill, or spec |
| `/shape-spec` | Run in plan mode — produces a full spec folder under `agent-os/specs/{YYYY-MM-DD-HHMM-slug}/` |

## Intended Workflow

```
/plan-product           → agent-os/product/{mission,roadmap,tech-stack}.md
/discover-standards     → agent-os/standards/{category}/{standard}.md
/index-standards        → agent-os/standards/index.yml
/shape-spec             → agent-os/specs/{timestamp-feature}/{plan,shape,standards,references}.md
/inject-standards       → (used inline during conversations, skill authoring, or planning)
```

## Architecture

### Output Locations

- `agent-os/product/` — Product vision docs (mission, roadmap, tech stack)
- `agent-os/standards/` — One markdown file per standard; `index.yml` for discovery
- `agent-os/specs/` — Spec folders timestamped `YYYY-MM-DD-HHMM-feature-slug`

### Standards Design Principles

- One concept per standard file — never combine unrelated patterns
- Minimal prose — standards are optimized for AI context windows
- `index.yml` enables `/inject-standards` to match relevant standards without reading every file

### `/inject-standards` Modes

- **Auto-suggest** (`/inject-standards`): analyzes current context and proposes relevant standards
- **Explicit** (`/inject-standards api/response-format`): injects the named standard directly
- Output format adapts to context: inline for conversations, file references for skills, embedded content for specs

### `/shape-spec` Behavior

Always runs inside plan mode. Always creates "Task 1: Save Spec Documentation" first before any implementation tasks. Reads `agent-os/product/` for context and `agent-os/standards/index.yml` to surface relevant standards.
