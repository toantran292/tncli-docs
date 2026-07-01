# Workspace lifecycle

A workspace is one isolated copy of your project, anchored to a git
branch. Each lives in its own `workspace--<branch>/` folder containing
a git worktree per repo, with its own ports, env, and databases.

## Create

From the web UI: use the create-workspace control, type the branch name,
and pick the repos.

From the CLI:

```bash
tncli workspace create <combo> <branch>
```

Behind the scenes a 7-stage pipeline runs (validate → provision → infra
→ source → configure → setup → network). Stages 4–6 fan out one
goroutine per repo. The web dashboard streams progress live; the CLI
prints it event-by-event.

To extend an existing workspace, use the same control on the workspace
row to add or remove individual repos.

## List

```bash
tncli workspace list
```

Each row shows the branch, included repos, current running services
count, and the workspace port block.

## Delete

From the web UI: use the delete control on a workspace row, then confirm.

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

- The dashboard auto-collapses workspaces with zero running services so
  the tree stays scannable when you have many branches active. Expand a
  row to reopen it; the choice persists.
- For a one-off check (e.g. before a PR) you don't need a workspace at
  all — just create one ad-hoc and `tncli workspace delete` when done.
