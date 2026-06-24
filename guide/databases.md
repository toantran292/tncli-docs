# Databases

tncli auto-provisions one database per workspace per template, using
the shared service's admin credentials. You declare names with
templates; tncli does the create/drop/seed dance.

## Declare

Under a repo:

```yaml
repos:
  api:
    databases:
      - "{{branch_safe}}"          # primary DB
      - "{{branch_safe}}_test"     # separate test DB
    env:
      DATABASE_URL: "postgres://{{conn:postgres}}/{{db:0}}"
      TEST_DATABASE_URL: "postgres://{{conn:postgres}}/{{db:1}}"
```

`{{db:N}}` resolves to the Nth entry above (session-prefixed), so the
env vars produced for a workspace on branch `feat/login` look like:

```
DATABASE_URL=postgres://postgres:postgres@postgres:44800/myproject_feat_login
TEST_DATABASE_URL=postgres://postgres:postgres@postgres:44800/myproject_feat_login_test
```

## Shared service credentials

The credentials come from the `db_user` / `db_password` fields on the
shared service:

```yaml
shared_services:
  postgres:
    image: postgres:16
    ports: ["5432"]
    db_user: postgres
    db_password: postgres
```

`{{conn:postgres}}` expands to `db_user:db_password@host:port`.

## Manage

From the TUI: press `B` on a workspace row to open the database menu —
create, drop, or reset all databases for that workspace at once.

From the CLI:

```bash
tncli db list                  # show databases per workspace
tncli db reset <branch>        # drop + recreate all DBs for a workspace
tncli db clean                 # remove orphan DBs (no matching workspace)
```

`db clean` is conservative: it prompts before each delete and refuses to
touch databases that belong to a live workspace. Pass `--dry-run` to
see what would change without acting.

## Setup hooks

Use the repo-level `setup:` block for migrations / seeds that should
run right after the workspace is created:

```yaml
repos:
  api:
    setup:
      - bundle install
      - bundle exec rake db:migrate
      - bundle exec rake db:seed
```

These run after the worktree exists, the env file is written, and the
databases have been created — so `DATABASE_URL` is set correctly.
