# CLI commands

`tncli` is a single binary. With no args it launches the **web
companion** — an HTTP + WebSocket server that serves a browser UI and
mirrors your tmux panes with xterm.js. Everything else is a subcommand.

```bash
tncli                          # launch the web companion (default)
tncli web --host 0.0.0.0 --port 8765   # web companion with explicit bind
```

By default the server binds `0.0.0.0:8765`, so it's reachable from other
devices on your LAN. Use `--host 127.0.0.1` to keep it local-only.

## Project lifecycle

```bash
tncli setup                    # one-time: /etc/hosts + global gitignore
tncli migrate                  # migrate from older state layouts
tncli update                   # download + install the latest release
```

`setup` is the only command that asks for `sudo` (to edit
`/etc/hosts`). Everything else runs unprivileged.

## Workspaces

```bash
tncli workspace create <combo> <branch>
tncli workspace delete <branch>
tncli workspace list
```

See [Workspace lifecycle](../guide/workspace).

## Services

```bash
tncli start  <service|combo>
tncli stop  [service|combo]    # no arg → stop everything
tncli restart <service|combo>
tncli status                   # running services with PIDs
tncli list                     # services + workspaces summary
tncli logs <service>           # recent output snapshot
tncli attach [service]         # attach tmux session/window
```

See [Services](../guide/services).

## Databases

```bash
tncli db list
tncli db reset <branch>        # drop + recreate all DBs for a workspace
tncli db clean                 # remove orphan DBs (with confirmation)
tncli db clean --dry-run       # preview without acting
```

See [Databases](../guide/databases).

## Web companion

```bash
tncli                          # launch the web companion (default)
tncli web [--host H] [--port P]  # explicit bind (default 0.0.0.0:8765)
```

The web companion serves a browser dashboard: manage services, watch
live logs, and shell into any tmux pane via xterm.js. It attaches to the
service tmux session over WebSocket, so state survives closing the
browser tab.

## Run & inspect

```bash
tncli run <service> <cmd...>   # run a one-off command in a service's env
tncli disk                     # report disk usage of worktrees + volumes
tncli agent                    # AI code-agent integration
```

## Misc

```bash
tncli version
tncli completion <shell>       # shell completion: bash | zsh | fish
```
