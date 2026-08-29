# Better Stack first-touch — Fable copy review

- Reviewer: Fable (cloud). Copy review only. Nobody sends. No Gmail drafts, no mail, no frontend, no parse-for-agents.
- Cards reviewed: 3 (changelog / MCP docs / Upheal), all to hello@betterstack.com.
- Live pages re-fetched 2026-08-29 UTC. Every quoted fact below was checked against the live page, not memory.
- Word counts = first body line through the CTA question. Subject and sign-off excluded. URLs, `#15`, and `$47` count as one word each.

## Verification log (live fetches)

- **Changelog #15** — page says "Ask AI SRE to generate a dashboard. Also works with Claude Code, Codex, and your favorite AI agent via MCP server." Card 1's first line is accurate. Live title now reads "Changelog #15: Prompt a dashboard in 60 seconds" (slug still says stop-creating-dashboards). My text extraction did not render the "Updated Aug 10, 2026" stamp — substance verified regardless; see subject note on Card 1.
- **MCP docs** — prints the command verbatim: `claude mcp add betterstack --transport http https://mcp.betterstack.com`. Incident tools printed by name: Create incident, Acknowledge incident, Escalate incident (also Resolve, Reopen). Telemetry section: the assistant can "analyze logs." The word "ticket" appears zero times on the page — their nouns are incidents, monitors, logs, errors, heartbeats, status pages. hello@betterstack.com is the page's own printed contact address.
- **Upheal case study** — "Using Claude Code with Better Stack MCP, the team analyzed logs and cross-checked them against their code." Pull quote verbatim: "We were wondering what happens if we give Claude access to logs." — Upheal Team. Page imagery dated 2026-01-09, matching the Jan 9, 2026 caveat.
- **parsethis.ai/attack** — "Five pre-built injections. One click each. Watch what it would have executed." The five: invoice, knowledge-base article, executive forward, calendar invite, support ticket ("dressed as ordinary business text"). "evidence url · lives 7 days · re-screen to reissue." Keyless one-click flow; "Have your own text? Paste it at the demo console."
- **parsethis.ai/audit** — $47 one-time, up to 25 prompts, 10-technique red-team battery. Page last updated Aug 25, 2026. No $49 anywhere.
- **parsethis.ai/llms.txt** — x402 "not configured on this deployment — GET /v1/pricing reports enabled: false." x402 is OFF and correctly absent from all three cards.

## Card 1 — changelog

**VERDICT: VERIFIED WITH CAVEATS**

- Word count: 78. Four statements + CTA question. Under 100.
- Voice: Danny. No greeting filler, no self-intro, no platform pitch, plain declaratives. Subject "Your August changelog" (3 words, internal-note tone) leans on the visible "Updated Aug 10, 2026" stamp; if that stamp isn't obvious on the live page, "Changelog #15" is the safer subject.
- First line: VERIFIED — the page says exactly that (ask AI SRE for a dashboard; also works with Claude Code via MCP).
- Bridge: create/acknowledge/escalate incidents are their printed MCP tool names — good, their words. But "logs and tickets it reads" and "a ticket the agent did not write" — "ticket" is not Better Stack vocabulary (zero occurrences in the MCP docs). It imports Parse's attack-pack noun into their world. Keep the why-screen clause (it answers Danny's "why would anyone screen anything"), fix the noun to log text.
- CTA: one interest question, no meeting, no calendar. "One of the five" has no antecedent in the email — the five only exists on /attack. Anchor it.
- Invented pain: none. $49: no ($47 correct). x402: absent. Sign-off: matches lock exactly.

**Rewrite (exact):**

> Subject: Your August changelog
>
> Changelog #15 still says to ask AI SRE for a dashboard, and that it also works with Claude Code via MCP.
>
> Your MCP docs let that same agent create, acknowledge, and escalate incidents from the logs it reads. Before those tools run on log text the agent did not write, one screen at https://www.parsethis.ai/attack returns a 7-day evidence URL of what it would have executed. /audit after that is $47.
>
> Want to try one of the five injections there?
>
> Thanks
> Danny
>
> Daniel Finn
> Parse | 919-413-3445

79 words. Changes: dropped "tickets"; "a ticket the agent did not write" → "log text the agent did not write"; CTA anchors the five to /attack ("five pre-built injections" is that page's own headline noun). If "injections" reads too hot for a first touch, "one of the five samples there" also works — but the page's word is injections.

## Card 2 — MCP docs

**VERDICT: VERIFIED WITH CAVEATS — do not post as written**

- Word count: 67. Four statements + CTA question.
- Voice: broken by grammar — "reads your logs and then create or escalate an incident" should be creates/escalates. A typo in a four-sentence email reads sloppy, not casual.
- First line: the command is VERIFIED character-for-character on the docs page — the strongest, most checkable first line of the three. Docs revise silently; re-open the page the day this posts.
- Bridge: the capability claim (install → Claude Code reads logs, creates/escalates incidents) is VERIFIED per their docs. "On an invoice or a support ticket" is grounded on Parse's /attack samples but off-frame for Better Stack — their agent context is logs and incidents; nothing on their pages processes invoices. This is the abrupt-transition problem Danny already flagged, still present. Use log text it did not write.
- CTA: same unanchored "five."
- Invented pain: none strictly (invoice/support ticket are Parse sample types, not claimed Better Stack pain) — but in this position it reads as invented context. Remove.
- $49: no. x402: no. Sign-off: matches lock.

**Rewrite (exact):**

> Subject: Claude Code MCP install
>
> Your MCP docs still print `claude mcp add betterstack --transport http https://mcp.betterstack.com`.
>
> That install is how Claude Code reads your logs and then creates or escalates an incident. Before it does that on log text it did not write, one screen at https://www.parsethis.ai/attack returns a 7-day evidence URL of what the agent would have executed. /audit after that is $47.
>
> Want to screen one of the five injections there?
>
> Thanks
> Danny
>
> Daniel Finn
> Parse | 919-413-3445

69 words. Changes: creates/escalates grammar fix; invoice/support-ticket bridge → log text it did not write; CTA anchored to /attack.

## Card 3 — Upheal

**VERDICT: VERIFIED**

- Word count: 72. Four statements + CTA question.
- Voice: Danny, plain. One flaw: the /attack sentence is a telegraphic fragment ("a knowledge-base article or a support ticket, then a 7-day evidence URL…") — compressed past the verb.
- First line: VERIFIED — the case study says "Using Claude Code with Better Stack MCP, the team analyzed logs and cross-checked them against their code."
- Bridge: the best of the three. Their customer's verbatim printed sentence ("We were wondering what happens if we give Claude access to logs"), reported accurately, and /attack offered as "one concrete answer" — the least abrupt transition in the set. This is the card that actually resolves Danny's earlier objection.
- CTA: "one of the five" has zero antecedent here — the body names two samples and never says five. Anchor it.
- Invented pain: none — the curiosity is their printed quote. $49: no. x402: no. Sign-off: matches lock.
- Caveats: the quote is about logs; the two named samples are documents. The /attack page's own phrase "dressed as ordinary business text" bridges that (and the demo console takes pasted text). Freshness: Jan 9, 2026 page is the oldest anchor of the three; "still says" carries it as a live-page fact.

**Rewrite (exact, light):**

> Subject: Upheal MCP writeup
>
> Your Upheal case study still says they used Claude Code with Better Stack MCP to analyze logs against their code. They wrote they were wondering what happens if they give Claude access to logs.
>
> https://www.parsethis.ai/attack is one concrete answer to that: five pre-built injections dressed as ordinary business text, each returning a 7-day evidence URL of what the agent would have executed. /audit after that is $47.
>
> Want to try one of the five?
>
> Thanks
> Danny
>
> Daniel Finn
> Parse | 919-413-3445

74 words. Changes: fragment → full sentence; "five pre-built injections dressed as ordinary business text" is the /attack page's own line and gives the CTA's "five" its antecedent.

## Overall

**Hold for approve first: Card 2.** Its fix is substantive, not mechanical — the bridge object changes from Danny's invoice/support-ticket framing to log text, and its first line is a CLI string that docs pages revise without notice. Approve the replacement text, and re-open the docs page the day it posts. Cards 1 and 3 need only the mechanical fixes above.

**Only one card can be the first touch** — all three target the same inbox (hello@betterstack.com, their own printed contact on the MCP docs page). Recommend Card 3 (rewritten) as the send: fully verified, bridge in their customer's verbatim printed words, least abrupt transition. Card 1 becomes follow-up angle two, Card 2 angle three — cut follow-ups to 25–75 words (Sales.co) and don't repeat the mechanics sentence verbatim across touches; new angle each time (Gangly: touches 2–3 drew 41% of replies).

**Must-apply notes before posting any card:**

1. Their nouns only in the bridge — logs and incidents. No tickets, no invoices. "Ticket" appears nowhere in their MCP docs.
2. Anchor "the five" in the body before the CTA uses it (each rewrite does this).
3. Card 2 grammar: creates/escalates.
4. Card 3 fragment: give the /attack sentence a verb.
5. Sign-off block exactly as locked: Thanks / Danny / Daniel Finn / Parse | 919-413-3445. Never Kurultai. (All three already comply.)
6. Subject on Card 1: confirm the visible "Updated Aug 10, 2026" stamp on the live page before keeping "Your August changelog"; otherwise use "Changelog #15."
7. Day-of-send: re-open all three Better Stack pages. Two of three anchors already changed shape once (changelog title differs from its slug).

## Craft deviations, accepted and noted

- **Freshness:** no last-two-weeks signal exists. Changelog updated Aug 10, 2026 (~19 days old at review); Upheal Jan 9, 2026; MCP docs undated. "Still says / still print" converts each to a live-page fact per the lock — weaker than a fresh signal, acceptable.
- **Proof slot:** no named, recent, comparable customer result exists on live Parse pages, so per craft it is omitted, not invented. The mechanics line (7-day evidence URL) fills the slot at 27–28 words — over MapsLeads' sub-20 ideal — kept because it carries the why-screen logic, and held to one sentence to respect Gong's pitching penalty (~57% reply drop).
- **Gong "don't talk about AI in the body":** unavoidable in Parse's category; the buyer here is AI-tooling-native.
- **Sentence count:** all cards run 4 statements + CTA question. If strict Gong 3–4 total is wanted, merge "/audit after that is $47" into the mechanics sentence with a semicolon.
- **Lock compliance across the set:** $47 everywhere, $49 nowhere; x402 absent everywhere (and confirmed OFF on the live deployment); no meeting ask, no calendar, one question per card; keyless /attack first, $47 /audit second.

## Repo note

This repo (gtm.kurult.ai) serves its root as static assets per wrangler.toml, so this file may become publicly fetchable at /outreach/… once deployed. It contains draft copy and review notes only — no secrets — but move outreach notes out of the repo if they shouldn't ship with the site. Deploy config untouched; out of scope here.

Nobody sends.
