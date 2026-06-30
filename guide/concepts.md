# Concepts

A short tour of the moving parts before you dive deeper.

## Workspace

A **workspace** is one isolated copy of your project, anchored to a git
branch. tncli creates it as a sibling folder named `workspace--<branch>/`
containing one git worktree per repo. Each workspace has its own:

- Branch checkout for every repo it includes
- Database names (auto-resolved from `{{branch_safe}}` templates)
- Port block (a 100-port chunk out of the shared pool)
- Env files written from the per-repo `env:` block

You can run several workspaces side by side; their ports, databases, and
worktrees never collide.

## Repo

A **repo** is one source directory listed under `repos:` in `tncli.yml`.
Each repo declares its own setup commands, env templates, shared
services, and named services. A workspace contains one git worktree per
repo it activates.

## Service

A **service** is a long-running process — a web server, a worker, a
shell. Each service lives in its own tmux window inside the workspace's
service session, so logs are persistent and recoverable.

```yaml
services:
  web:
    cmd: bundle exec puma -p $PORT
    port: true              # request a port from the workspace block
  worker:
    cmd: bundle exec sidekiq
```

## Shared services

Containers shared across all workspaces — Postgres, Redis, MinIO, etc. —
declared under `shared_services:`. tncli starts them with docker-compose
and exposes them on dynamic ports referenced via `{{port:NAME}}` and
`{{conn:NAME}}` templates.

```yaml
shared_services:
  postgres:
    image: postgres:16
    ports: ["5432"]
    db_user: postgres
    db_password: postgres
```

## Combo

A **combo** is a named set of repos you want to spin up together —
useful when your project has more than a handful of services and only a
subset matters for a given task.

```yaml
combos:
  full: [api, client, admin]
  api-only: [api]
```

## Session

tncli runs everything inside two tmux sessions:

- `tncli_<project>`: the **service session** holding one window per
  running service. Survives detaching from the TUI or closing the browser.
- When you run `tncli cli`, the current tmux session hosts the **TUI
  window**, split into the tree pane, the log pane, and any widget panes
  you configured under `ui.layout`. The web companion (bare `tncli`)
  attaches to the same service session over WebSocket instead.

## Pipeline

Workspace creation and deletion run as a multi-stage **pipeline**, with
parallelizable per-repo stages. The TUI surfaces progress live; the CLI
streams the same events. See [Workspace lifecycle](./workspace).
