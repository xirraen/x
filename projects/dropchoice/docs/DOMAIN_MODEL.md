# Domain Model

- **Opportunity:** stable identity, ecosystem, category, status, evaluation, confidence, evidence, estimated cost, effort, deadline, tasks.
- **Evidence:** canonical URL, publisher, type, timestamps when known, content hash when available, supported claim, verification/freshness states.
- **Evaluation:** timestamp, evidence references, rationale, confidence, evaluator/version, blocking risks. Corrections append new records rather than erase history.
- **Task:** research action, status, optional due date, related opportunity. Prototype state may be lost on refresh.
- **Event:** dated activity/deadline with provenance and freshness; demo events must be labeled.
- **Action preview:** read-only hypothetical route comparison, not a quote engine, transaction builder, wallet connector, or execution interface.

Evidence quality and confidence are distinct. Missing/stale evidence is explicit. Critical safety flags cannot be averaged away. Evaluations need sources or an explicit unavailable-evidence state.