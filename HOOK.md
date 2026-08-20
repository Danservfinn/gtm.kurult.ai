# Khan wake hook (gtm.kurult.ai)

Public page. No webhook secret. No admin token. No email. No LinkedIn.

## What approve means

1. A todo must be in state `ready`.
2. Only Danny checks **Danny-only approve** (Mini CLI approve does not count).
3. Persist by updating `todos.json` (`state: "approved"`) and appending one JSON line to `hooks/approved.jsonl`.
4. Push that change on a branch / PR. The existing Cursor GitHub listener on `Danservfinn/gtm.kurult.ai` (`pr-pushed`) is the event path that dispatches **Grok Bot SendToAgent** to the seat’s existing agent id.
5. The assigned khan begins that **one** task. Nobody sends.

Danny is the user, not a bot. Approve of a Danny-seat todo does **not** wake a khan.

## Seat → agent id (SendToAgent)

| Seat | Agent id |
|---|---|
| Temujin | `aa5dd9c3-21ea-4342-8449-f2e783886735` |
| Tolui | `fda4bc5c-bc4c-4815-973b-539436f87246` |
| Duwa | `e12c9266-8f57-4209-b65d-7c321fb50ee2` |
| Nogai | `4fa60fac-1d9e-4665-8632-d216bd4a81d4` |
| Guyuk | `27a37c38-4c86-426c-afcd-70e31c3f0cfa` |
| Ghazan | `eb2c6bdb-c680-4fb5-bd46-59d1b1f1261d` |

## `hooks/approved.jsonl` line shape

One JSON object per line, for example:

```json
{"ts":"2026-08-20T02:00:00Z","todo_id":"T3","seat":"Tolui","agent_id":"fda4bc5c-bc4c-4815-973b-539436f87246","action":"SendToAgent","source":"gtm.kurult.ai","note":"Danny approved; begin this one task only; nobody sends"}
```

## After done

When a todo is marked `done`, any dependent whose `depends_on` are all `done` becomes `ready` (not `approved`, not auto-started). The next approve is still Danny.

## Hard stops

- x402 OFF
- No invented pain, posts, or emails
- No Gmail Send / no LinkedIn send from a bot
