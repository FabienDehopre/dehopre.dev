# AGENTS.md

Before writing or reviewing code, read [`CODING_STANDARDS.md`](CODING_STANDARDS.md); its rules override the `angular-developer` skill and generic Angular defaults.

Run every task through Nx (`pnpm nx <target> <project>`, `nx run-many`, `nx affected`), never the underlying tool; `pnpm nx show project website` lists the targets. Answer Nx configuration questions from the `nx_docs` MCP tool, not memory.

## Agent skills

### Issue tracker

Issues and specs live in this repo's GitHub Issues, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
