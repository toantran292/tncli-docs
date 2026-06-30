# TUI

Run `tncli cli` to open the TUI (bare `tncli` launches the web companion).
Press `?` for the in-app cheatsheet.

## Layout

The TUI starts as two tmux panes — a workspace tree on the left, a live
log on the right — wrapped by a thin tmux pane border. Workspaces with
no running services auto-collapse on first show; expand or collapse one
manually and the choice sticks across restarts.

Long branch names truncate at hyphen boundaries (`crm-590-set-lead…`)
instead of mid-word. A subtle dotted divider separates expanded
workspaces so services don't blur into the next branch.

## Customization

`tncli.yml` accepts an optional `ui:` block — purely cosmetic, leave it
out if you don't care.

```yaml
ui:
  sidebar:
    width: "25%"            # left tree width: "25%", "30", "30c"
  theme:
    border: rounded
    colors:
      primary: "6"          # cursor accents
      accent: "14"          # idle / info
      muted: "8"            # dim text
    glyphs:
      running: "●"
      thinking: "✻"
  layout:
    # Extra panes spawned around the main TUI. Each one runs a command
    # in its own tmux pane — typically a tncli widget.
    panes:
      - id: status-bar
        title: " status "
        command: tncli widget status-bar
        side: bottom         # top | bottom | left | right
        size: "1"            # rows / cols, also "30%"
        full_window: true    # span the full window edge
```

When `ui.sidebar.width` is set it overrides any saved split — restart
the TUI to pick it up.

## Navigation

| Key | Action |
| --- | --- |
| `j` / `k` (or arrows) | Move down / up |
| `Enter` / `Space` | Collapse / expand tree node |
| `Tab` / `l` | Focus log pane |
| `n` / `N` | Cycle running services |
| `q` | Quit |

## Services

| Key | Action |
| --- | --- |
| `s` | Start service / instance |
| `x` | Stop service / instance |
| `X` | Stop all (confirm) |
| `r` | Restart service |
| `m` | Toggle service mode (dev / build) |
| `o` | Open service in browser |

## Workspace

| Key | Action |
| --- | --- |
| `w` | Create workspace / add-remove repo |
| `d` | Delete workspace (confirm) |
| `E` | Set environment (staging / local) |
| `B` | Database menu (create / drop / reset) |

## Tools

| Key | Action |
| --- | --- |
| `c` | Shortcuts popup |
| `e` | Open in editor |
| `g` | Git: checkout / pull / diff |
| `t` | Shell in popup |
| `I` | Shared services (lazydocker) |
| `R` | Reload config |

## Modes

| Key | Action |
| --- | --- |
| `i` | Interactive mode (forward keys to tmux) |
| `y` | Copy mode (mouse-select log text) |
| `/` | Search logs |
