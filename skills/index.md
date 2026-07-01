# Skills

> Work in progress — the skills system is still being designed. This
> page will grow as conventions firm up.

Skills are reusable prompt + tool bundles that tncli can run against
the project (think: "fix the failing test", "unstuck this branch from
main"). They're plain markdown files with a small front-matter block,
stored under the project's `.tncli/skills/` directory.

The goal: encode repeatable development workflows so they can be
triggered from the web UI or the CLI without re-typing the prompt every
time.

## Pages

- [Writing skills](./writing) — authoring conventions and front-matter
  fields.
