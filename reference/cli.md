# CLI commands

`tncli` is a single binary. With no args it opens the TUI; everything
else is a subcommand.

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

## TUI helpers

```bash
tncli                          # open the TUI
tncli widget <name>            # run a single widget standalone
                               #   names: status-bar, service-info, …
tncli ui list                  # list installable widgets
```

`tncli widget` is normally invoked from `ui.layout.panes[].command` so
each widget runs in its own tmux pane.

## Misc

```bash
tncli version
tncli help <command>
tncli completion <shell>       # shell completion: bash | zsh | fish
```
