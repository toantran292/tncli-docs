# CLI commands

`tncli` is a single binary. With no args it launches the **web companion**;
the terminal UI and everything else are subcommands.

```bash
tncli                          # launch the web companion (default)
tncli cli                      # open the terminal UI (TUI)
tncli web --host 0.0.0.0 --port 8765   # web with explicit bind
```

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

## UI

```bash
tncli                          # launch the web companion (default surface)
tncli cli                      # open the terminal UI (TUI); alias: tncli ui
tncli web [--host H] [--port P]  # web companion with explicit bind
tncli widget <name>            # run a single widget standalone
                               #   names: status-bar, service-info, …
```

`tncli widget` is normally invoked from `ui.layout.panes[].command` so
each widget runs in its own tmux pane.

## Misc

```bash
tncli version
tncli help <command>
tncli completion <shell>       # shell completion: bash | zsh | fish
```
