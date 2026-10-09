# Initial Threat Model

Assets: repository credentials, workflow integrity, evidence provenance, evaluation history, future user data, and safety-warning integrity.

Trust boundaries: browser to future API; API to storage; ingestion workers to third-party sites; user URLs/text to app; workflows to repository and dependencies.

Threats: secret leakage, SSRF, malicious redirects/DNS, oversized fetched content, XSS, stale/fabricated evidence, unauthorized data access, dependency compromise, and previews mistaken for executable transactions.

Mitigations: least-privilege workflows, dependency review, schema validation, output encoding, rate limits, isolated ingestion workers, URL canonicalization, DNS/redirect controls, content-type/size limits, provenance records, and explicit demo messaging.

Production ingestion, accounts, or wallet capabilities require dedicated threat review and adversarial tests.