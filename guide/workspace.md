# Workspace lifecycle

A workspace is one isolated copy of your project, anchored to a git
branch. Each lives in its own `workspace--<branch>/` folder containing
a git worktree per repo, with its own ports, env, and databases.

## Create

From the TUI: press `w` on a workspace combo row, type the branch name,
pick the repos.

From the CLI:

```bash
tncli workspace create <combo> <branch>
```

Behind the scenes a 7-stage pipeline runs (validate → provision → infra
→ source → configure → setup → network). Stages 4–6 fan out one
goroutine per repo. The TUI streams progress live; the CLI prints it
event-by-event.

If you need to extend an existing workspace, press `w` on the workspace
instance row to add or remove individual repos.

## List

```bash
tncli workspace list
```

Each row shows the branch, included repos, current running services
count, and the workspace port block.

## Delete

From the TUI: press `d` on a workspace row, confirm.

From the CLI:

```bash
tncli workspace delete <branch>
```

A 5-stage pipeline tears it down: pre-delete hooks → stop services →
drop databases → remove worktrees → release port block.

## Recovery

Workspace metadata lives entirely on disk (`.tncli/network.json` per
project, plus the `workspace--<branch>/` folders themselves) — so
`tncli` can be killed and restarted without losing state. If you
clobber the folder by hand, `tncli workspace list` will refuse to
re-introduce stale port blocks.

## Tips

- The TUI auto-collapses workspaces with zero running services so the
  tree stays scannable when you have many branches active. Expand with
  `Enter`; the choice persists.
- For a one-off check (e.g. before a PR) you don't need a workspace at
  all — just create one ad-hoc and `tncli workspace delete` when done.
