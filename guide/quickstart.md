# Quick Start

## 1. Create `tncli.yml`

In your monorepo root:

```yaml
session: myproject
default_branch: main

shared_services:
  postgres:
    image: postgres:16
    ports: ["5432"]
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    db_user: postgres
    db_password: postgres

repos:
  api:
    default_branch: master
    preset: shared-infra
    databases:
      main: "{{branch_safe}}"
    env:
      DATABASE_URL: "postgres://{{conn:postgres}}/{{db:main}}"
    setup: [bundle install, bundle exec rake db:migrate]
    services:
      web:
        cmd: bundle exec puma -p $PORT
        port: true
        exposes: API_URL        # other repos reference it as {{var:API_URL}}
```

## 2. First-time setup

```bash
tncli setup
```

Installs prerequisites and shared service containers.

## 3. Create a workspace

```bash
tncli workspace create feature-x
```

Creates `workspace--feature-x/api/` as a git worktree on branch `feature-x`, runs `setup`, creates databases.

## 4. Open the dashboard

```bash
tncli            # launches the web companion at http://127.0.0.1:8765
tncli cli        # or the terminal UI (TUI)
```

In the TUI: navigate with `j/k`, start a service with `s`, stop with `x`,
`?` for the keymap. The web companion mirrors the same services and logs
in the browser.

See [TUI shortcuts](./tui) for the full keymap.
