# Sluice · fact sheet (example; the product, people and numbers are fictional)
# Only these facts may appear on the page. One per line; lines starting with "#" are comments.

- Name: Sluice — a self-hosted inbox for webhooks
- What it does: gives you a public URL for webhooks, stores every delivery, and forwards it to your local or internal service
- One static binary, about 11 MB, for Linux, macOS and Windows on amd64 and arm64
- Storage: a single SQLite file; no Redis, no Postgres, no queue to run
- Install: curl -fsSL https://sluice.example/install.sh | sh
- Start: sluice serve --forward http://localhost:3000
- Retries failed forwards with exponential backoff for up to 72 hours
- Replay any stored delivery: sluice replay <delivery-id>
- Verifies HMAC-SHA256 signatures and rejects deliveries older than 5 minutes
- Web UI on port 8081: search deliveries by path, header or body text
- Keeps deliveries for 30 days by default; change it with --retain
- 1,800 deliveries per second on a 2-vCPU VM, in the project's own benchmark
- No hosted service, no account, no telemetry
- Written in Go; MIT licence; 41 contributors
- Current version 0.9.2, released 14 October 2026
- Maintainer: Ines Okafor, who started it in 2023 after losing a weekend of payment webhooks
