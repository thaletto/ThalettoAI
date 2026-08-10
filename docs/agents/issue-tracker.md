# Issue tracker: Linear

Issues and specs for this repo live in **Linear**. Agents interact through the Linear API, and the web UI for anything only a human can do.

## Conventions

- **Issue IDs** are `KIT-123` style — always refer to issues by ID.
- **Create an issue**: via the Linear API (`issueCreate`) with title, markdown description, and a triage label. With no API credentials available, draft the issue and ask the maintainer to create it.
- **Read an issue**: fetch by ID, including description, comments, labels, and status.
- **Comment**: `commentCreate` on the issue.
- **Apply triage state**: set the labels from `docs/agents/triage-labels.md`; align status (e.g. `Todo` for `ready-for-agent`, `Canceled` for `wontfix`).
- **Close**: move to a completed/canceled state with a final comment.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When `yes`, PRs (which arrive via GitHub) are mirrored as Linear issues and run through the same triage states.

## When a skill says "publish to the issue tracker"

Create a Linear issue with title, description, and labels; report its ID.

## When a skill says "fetch the relevant ticket"

Fetch the Linear issue by ID, including description, comments, labels, and status.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single Linear issue labelled `wayfinder:map`; each **ticket** is a child issue linked in the map's description.

- **Blocking**: a `Blocked by: KIT-…` line at the top of the child description; unblocked when every listed blocker is closed.
- **Claim**: assign the issue to yourself or note the claim in a comment.
- **Resolve**: comment with the answer, then close.