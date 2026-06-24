# Writing skills

> Work in progress.

A skill is a single markdown file under `.tncli/skills/`. The minimum
shape:

```markdown
---
name: fix-failing-test
description: Find the closest failing test and propose a one-shot fix.
trigger: tui          # how the TUI exposes it (tui | cli | both)
---

# Instructions

Steps the agent should follow when this skill is invoked.

# Tools

Optional list of tools the agent is allowed to use. Omit to inherit
the project default.
```

Authoring guidelines as they stabilize will land here — for now, keep
skills small (single-purpose), idempotent (safe to re-run), and
explicit about which files they're allowed to touch.
