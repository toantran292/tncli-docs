# Template variables

The values in `env:`, `databases:`, `services.<name>.cmd`, and a handful
of other fields are templates. tncli resolves them when materializing
each workspace, substituting values from the network state, shared
services, and the workspace's branch.

## Catalog

| Template | Resolves to | Example |
| --- | --- | --- |
| `{{host:NAME}}` | Shared service hostname (via `/etc/hosts`) | `postgres` |
| `{{port:NAME}}` | Dynamic port for a shared service or repo proxy | `44800` |
| `{{url:NAME}}` | `http://{host}:{port}` for a shared service or remote env URL | `http://postgres:44800` |
| `{{url:REPO/SVC}}` | `http://localhost:<svc_port>` for a specific repo service | `http://localhost:40012` |
| `{{ws:NAME}}` | WebSocket URL (`ws://...` or `wss://...`) | `ws://localhost:40012` |
| `{{conn:NAME}}` | `user:pass@host:port` from shared service creds | `postgres:postgres@postgres:44800` |
| `{{db:N}}` | Nth database name (session-prefixed, branch-resolved) | `myproject_feat_login` |
| `{{slot:NAME}}` | Allocated slot index for capacity-limited services | `3` |
| `{{bind_ip}}` | Always `127.0.0.1` | `127.0.0.1` |
| `{{branch}}` | Raw workspace branch name | `feat/login` |
| `{{branch_safe}}` | Branch with `/`→`_`, `-`→`_` (safe for DB names) | `feat_login` |

## Where they work

- `repos.<repo>.env`
- `repos.<repo>.databases`
- `repos.<repo>.services.<svc>.env`
- `repos.<repo>.env_output[].env`
- `shared_services.<svc>.environment` (via `{{host}}` / `{{port}}` for cross-service URLs)
- `environments.<name>.*` (remote URL bundles)

Anywhere else, templates are left untouched.

## Resolving examples

Given a workspace on branch `feat/login` and `session: myproject`:

```yaml
env:
  DATABASE_URL: "postgres://{{conn:postgres}}/{{db:0}}"
  REDIS_URL: "redis://{{host:redis}}:{{port:redis}}/{{slot:redis}}"
  API_HOST: "{{url:api}}"
```

becomes

```
DATABASE_URL=postgres://postgres:postgres@postgres:44800/myproject_feat_login
REDIS_URL=redis://redis:44801/3
API_HOST=http://localhost:40012
```

## Local vs remote URLs

For each service in `environments.<name>`, `{{url:NAME}}` resolves to
the **remote** URL when that environment is active in the TUI (toggle
with `E`). Switching back to `local` returns the resolved
`http://localhost:<port>` form.

This is the recommended way to point a workspace at a deployed backend
while keeping local services available — same env keys, no swap files.
