# `tncli.yml` reference

The project config. `tncli` walks up from the current directory looking
for this file — keep it at the monorepo root.

## Top level

```yaml
session: myproject              # tmux session prefix (tncli_<session>)
default_branch: main            # global default git branch
preset: dev-tools               # optional preset name applied to every repo
local_pm: pnpm                  # node package manager hint for the TUI shortcuts

environments:                   # named env URL bundles (TUI: press E)
  staging:
    api: "https://api.staging.example.com"

presets: { ... }                # see "Presets" below
shared_services: { ... }        # see "Shared services" below
repos: { ... }                  # see "Repos" below
combos: { ... }                 # named bundles of repos
ui: { ... }                     # see "UI customization" below
```

## Repos

```yaml
repos:
  api:
    alias: api                 # short name shown in the TUI
    default_branch: master     # override global default for this repo
    preset: shared-infra       # apply a preset
    pre_start: nvm use         # one-shot hook before any service runs

    # worktree-time config
    copy: [.env, .env.secrets] # files copied from repo to worktree
    env_output:                # files to write resolved env into
      - .env.local
    env:                       # env templates (resolved per workspace)
      DATABASE_URL: "postgres://{{conn:postgres}}/{{db:0}}"
      API_HOST: "{{url:api}}"
    databases:                 # auto-created per workspace
      - "{{branch_safe}}"
      - "{{branch_safe}}_test"
    setup:                     # run after worktree exists
      - bundle install
      - bundle exec rake db:migrate

    # runtime
    shortcuts:                 # accessible via `c` key in TUI
      - cmd: bundle install
        desc: Install deps
    services:
      web:
        cmd: bundle exec puma -p $PORT
        port: true
      worker:
        cmd: bundle exec sidekiq
```

| Field | Description |
| --- | --- |
| `alias` | Short label used in the TUI and combos. |
| `default_branch` | Override the global default branch for this repo. |
| `pre_start` | One-shot command run before any service in this repo (e.g. `nvm use`). |
| `copy` | Files copied from the source repo into each worktree. |
| `env_output` | File(s) inside the worktree to write resolved env into. |
| `env` | Env templates. See [Templates](./templates). |
| `databases` | Database name templates; auto-created per workspace. |
| `setup` | Commands run after worktree creation. |
| `pre_delete` | Commands run before worktree deletion. |
| `shortcuts` | Quick commands accessible via `c` in the TUI. |
| `services` | Named services. See [Services](../guide/services). |

## Shared services

```yaml
shared_services:
  postgres:
    image: postgres:16
    ports: ["5432"]
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes: ["shared_postgres:/var/lib/postgresql/data"]
    healthcheck:
      test: pg_isready -U postgres -h 127.0.0.1
      interval: 5s
      timeout: 3s
      retries: 3
    db_user: postgres
    db_password: postgres
    capacity: 16               # max slots per instance
```

Host ports are dynamically allocated from the workspace pool; you never
hard-code them.

| Field | Description |
| --- | --- |
| `image` | Docker image. |
| `ports` | Container ports; host ports are picked from the dynamic pool. |
| `environment` | Container env vars. |
| `volumes` | Volume mounts. |
| `command` | Override container command. |
| `healthcheck` | tncli waits for the healthcheck before marking the service ready. |
| `db_user` / `db_password` | Credentials for auto database creation. |
| `capacity` | Max slots per instance (auto-scales when exceeded). |

## Presets

Reusable repo fragments:

```yaml
presets:
  shared-infra:
    env:
      REDIS_URL: "redis://{{host:redis}}:{{port:redis}}/{{slot:redis}}"
```

A repo with `preset: shared-infra` inherits those fields. Multiple
presets can be applied via a list: `preset: [shared-infra, prisma]`.

## UI customization

Optional cosmetic block. See [TUI customization](../guide/tui) for the
full block; here's the schema:

```yaml
ui:
  sidebar:
    width: "25%"               # left tree width: "25%", "30", "30c"
  theme:
    border: rounded            # rounded | sharp
    colors:
      primary: "6"
      accent: "14"
      muted: "8"
    glyphs:
      running: "●"
      thinking: "✻"
  layout:
    panes:
      - id: status-bar
        title: " status "      # tmux pane border title (space = no title)
        command: tncli widget status-bar
        side: bottom           # top | bottom | left | right
        size: "1"
        full_window: true
```
