# NEW PERSONAL BRAIN — Inherited Governance

Inherited governance: **GPG-1.0.0**
Effective for this project: **2026-09-06**
Source of global policy: `ahmedaghaofficial-rgb/NEW-PERSONAL-BRAIN/docs/governance/GLOBAL_PROJECT_GUARDRAILS.md`
Project relationship: **ChatGPT Command Universe / prompts.chat nucleus**

## Rule

This repository keeps its own `AGENTS.md`, architecture, tests, deployment, product decisions, and project-specific rules.

It also inherits the minimum Global Project Guardrails tracked by NEW PERSONAL BRAIN.

Operational model:

`Brain Global Guardrails + prompts.chat local rules + prompts.chat accepted decisions`

Local rules may be stricter. They must not silently weaken the inherited global safety baseline. A scoped exception requires explicit current-user approval.

## Inherited minimum baseline

1. Destructive or hard-to-reverse actions require explicit user approval.
2. Material auth, credential, secret, permission, or security changes require explicit user approval.
3. Normal work uses an isolated branch, relevant verification, pull request, then merge.
4. Never bypass or weaken safety checks just to make work pass.
5. Prefer the smallest sufficient change; avoid unrelated rewrites/refactors/upgrades.
6. New integrations/dependencies should be isolated, modular, removable, and reversible where practical.
7. Preserve Git/decision history rather than overwriting canonical history.
8. Preserve provenance and license/usage constraints for imported external content.
9. Keep proposals/experiments separate from accepted decisions.
10. Do not claim completion without relevant evidence/tests.
11. Add dependencies only when their value exceeds their integration/maintenance complexity.
12. Production-impacting changes need a rollback/recovery path.
13. Treat recurring cost, token use, quotas, and rate limits as architecture constraints.
14. Never commit secrets or credentials.
15. Public availability does not imply unrestricted commercial reuse; preserve source/license metadata.

## Conflict handling

Priority for work in this repository:

1. explicit current-user instruction;
2. non-exempted inherited Global Project Guardrails and project-specific accepted decisions;
3. `AGENTS.md` and other local project rules;
4. tool/agent defaults.

If a local rule appears to conflict with a global safety guardrail, do not silently choose the weaker rule. Surface the conflict and require explicit user direction when the difference is material.

## Update notifications

Governance updates from NEW PERSONAL BRAIN are expected to arrive as GitHub issues prefixed:

`[NEW PERSONAL BRAIN][Governance]`

A notification is an audit/update signal, not permission to perform destructive or security-sensitive migrations.
