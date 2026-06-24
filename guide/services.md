# Services

Each long-running process — a web server, a worker, a shell — is a
**service**. Services live in their own tmux windows so logs persist
and you can re-attach across TUI restarts.

## Declare

In `tncli.yml`:

```yaml
repos:
  api:
    services:
      web:
        cmd: bundle exec puma -p $PORT
        port: true
      worker:
        cmd: bundle exec sidekiq
      console:
        cmd: bundle exec pry
```

| Field | Notes |
| --- | --- |
| `cmd` | The shell line to run. `$PORT` is auto-substituted with the allocated port when `port: true`. |
| `port: true` | Request a port from the workspace's port block. The number is stable across restarts. |
| `env` | Extra env vars merged with repo-level env. Templates allowed. |
| `pre_start` | One-shot command run after `cd` but before `cmd` (e.g. `nvm use`). |
| `dir` | Subdirectory inside the worktree to `cd` into. |
| `mode` + `modes` | Two-state toggle (e.g. `dev` vs `build`). Switch with `m` in the TUI. |

## Start / stop

From the TUI: `s` starts the row under the cursor, `x` stops it. Both
work on services, repos (all services in that repo), or whole
workspaces. `X` stops everything in the project.

From the CLI:

```bash
tncli start <service|combo>
tncli stop  [service|combo]   # no arg → stop all
tncli restart <service|combo>
tncli status                  # list running services with PIDs
```

## Logs

The right pane in the TUI mirrors the selected service's tmux window
live. Scroll with `j/k`, jump to top/bottom with `g/G`, search with `/`.
Press `i` to forward keys into the service (interactive REPL); `y` for
copy mode.

From the CLI:

```bash
tncli logs <service>          # recent output (snapshot)
tncli attach <service>        # attach the service's tmux window
```

`attach` drops you into the actual session — detach with the usual
tmux prefix + `d`.

## Modes (dev vs build)

For services that have a fast dev command and a slower production-like
build, declare both:

```yaml
services:
  web:
    mode: build                # default
    modes:
      dev: npm run dev -p $PORT
      build: npm run build && npx serve -l $PORT
    port: true
```

Press `m` on the service in the TUI to flip between modes. The active
mode persists across restarts.

## Pre-start hooks

Use `pre_start` at the repo or service level for environment shims that
need to run inside the same shell as `cmd`:

```yaml
repos:
  api:
    pre_start: nvm use
    services:
      web:
        cmd: npm start
```

The hook runs after `cd` into the worktree, before `cmd`. Failures
abort startup.
