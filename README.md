# gtm.kurult.ai

Public Parse GTM plan host for [Kurultai](https://kurult.ai). One static page: the lead-gen plan, assigned todos, Danny-only approve checkboxes, dependency unlock. Nobody sends.

Source of truth on disk: `plan.md` (plan body) and `todos.json` (todo machine). The page caches edits in `localStorage`; lasting saves go through this repo (edit those files on GitHub or commit a download). Wake path: see `HOOK.md`.

## Invariants

- No secrets, no `.env`, no API tokens in this repo.
- Approve is Danny-only. Mini CLI approve does not count. No admin key on the public page.
- x402 is OFF. No invented buyer pain, posts, or emails. Nobody sends email or LinkedIn.
- `llms.txt` lists this public host and durable public surfaces only.

## Deploy

Cloudflare Pages, direct upload of the repo root:

```sh
CLOUDFLARE_API_TOKEN=$(cat ~/.kublai/secrets/cloudflare-pages-api-token) \
  npx wrangler@latest pages deploy . --project-name gtm-kurult-ai
```

Break-glass (no CLI): Cloudflare dashboard → Workers & Pages → gtm-kurult-ai → Create deployment → drag this folder in.

Custom domain: attach `gtm.kurult.ai` in Pages → Custom domains. Do not touch `kurult.ai` MX / mail records.

Public Pages auto-deploy after merge to `main`. Merge and domain attach wait on Danny.

Rollback: redeploy any prior deployment from the Pages dashboard (one click).

## Edit without a backend

1. On the live page, edit plan text / todos (titles, seats, depends_on, add/remove). Browser cache only until committed.
2. Use **Download todos.json** / **Download plan.md**, or open the GitHub edit links on the page.
3. Commit to this repo (`todos.json`, `plan.md`, and optionally append a line to `hooks/approved.jsonl` on approve). Refresh then loads the committed files.

## Verify after deploy

```sh
curl -sI https://gtm.kurult.ai/            # 200 text/html, server: cloudflare
curl -sI https://gtm.kurult.ai/llms.txt    # 200 text/plain
curl -sI https://gtm.kurult.ai/todos.json  # 200 application/json
dig +short kurult.ai MX                    # unchanged — mail records are never touched
```
