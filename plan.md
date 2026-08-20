# Parse lead generation plan

As of 20 Aug 2026, 00:15 ET. Owner of this write-up: Guyuk (outreach drafts). CoS: Temujin. Market: Tolui. Public watch: Duwa. Printed emails: Nogai. Product truth: Ghazan. Approve-and-send: Danny. Nobody sends from a bot.

**Offer we can say.** Screen one untrusted prompt or file an agent would read. Leave a dated receipt (risk_score, verdict, flags, disposition, trace id). Demo: https://www.parsethis.ai/demo. Free key is 10 req/min. x402 is OFF. Do not say guarantee, benchmarks, ML classifier, or extra product names. Idle keys expire at 90 days.

## 1. Who does what

| Seat | Does | Does not |
|---|---|---|
| Temujin | CoS. Hands segments. Trains craft. | Approve-to-send. Send. |
| Tolui | Names segments and first-party quotes. | Draft outreach. Hold emails. |
| Duwa | Public watch. Craft brief (length, first line, CTA). | Parse outbound cards. Score. Send. |
| Nogai | Find printed emails on public pages. | Guess first.last@. Buy lists. |
| Guyuk | Research, exclude, three dated signals, draft in Danny voice, show 2-3 cards. | Send. Invent pain or posts. Open personal Gmail. |
| Ghazan | Live product numbers from parsethis.ai. | Invent receipts. |
| Danny | approve \| change \| reject \| suppress \| batch in Guyuk chat. | Mini CLI approve does not count. |

## 2. Foundation (required before any new draft)

- Segment named by Tolui / Temujin.
- Buyer language is vendor-page, quoted, dated. Not inferred pain.
- Offer is screen + receipt. Alternative: they keep doing the work they already sell or already run.
- If any of those three is missing, stay researching. No card.

## 3. Segments in play

### A. Hardening consultancies

They sell Claude Code / OpenClaw / MCP hardening as consulting. Ghazan cannot source monthly dollars from llms.txt or /v1/pricing; next hardening drafts drop the dollar or name the live /pricing page.

| Firm | Printed To | State |
|---|---|---|
| AY Automate | walid@ayautomate.com | Gmail DRAFT exists. Approve-to-send still Danny. |
| Fraktional | kai@fraktional.ai | Gmail DRAFT exists. Approve-to-send still Danny. |
| SFAI Labs | hello@sfailabs.com | Gmail DRAFT exists. Approve-to-send still Danny. |
| Silverthread Labs | silverthreadlabs@gmail.com (printed company Gmail) | Gmail DRAFT exists. Flag stays. |
| TIMEWELL (SI practices) | timewell@timewell.jp | Gmail DRAFT exists. Collective rewrite in TIMEWELL room. Demo closer. Drop Pro $49 unless live /pricing is named. |
| Opsio | info@opsio.se | LinkedIn approved then held. Email deprioritized. |
| GP Solutions | | Mapped, not handed. |

### B. Operator teams

They run Claude Code / MCP / an agent as their own work. They do not sell hardening.

| Firm | To | State |
|---|---|---|
| Judy AI Lab | none printed | Rejected 2026-08-19 22:20 ET. |
| Codnity | none printed | Rejected 2026-08-19 22:20 ET. |
| aiArch | hello@aiarch.dev | Rejected 2026-08-19 22:20 ET. To unused. |
| GoodBarber | | Held for batch. |
| Kiwop | | Held for batch. |

### C. Do not draft

- Sierra — they already built an in-house screen.
- Ripple, Upbound — JDs only.
- MongoDB — watch only until a first-party we-run page exists.
- Invented names or guessed emails.

## 4. Value pyramids

Tolui filed 2026-08-20. Danny asked these on this plan. No invented pain. Guyuk: do not draft a new pack from this. x402 OFF. First paying-customer path (Temujin): T1/T2 plus /demo and a key. Not T3. Not x402.

**How to read a pyramid.** Apex = what they already sell or already run (their page). Mid = their own-page job, quoted. Base = Parse on parsethis.ai. First step = Free /demo + key. Unknown whether they buy, build, or ignore.

**Offer we can say** (https://www.parsethis.ai/llms.txt ; https://www.parsethis.ai/pricing last updated 2026-08-19; GET https://www.parsethis.ai/v1/pricing `enabled: false` as of 2026-08-20 00:11 ET):

- Screen one untrusted prompt or file before an agent gives it authority.
- Receipt: category, score, action, `trace_id`.
- Demo: https://www.parsethis.ai/demo
- Free: 10 req/min, 5 sandbox/hr. Org governance on Free.
- Draft first paid: Solo $12/mo (operators) or Pro $49/mo (SIEM + evidence packs listed from Pro). Name the live /pricing page when a dollar is used.
- Do not claim guaranteed protection. Do not quote x402 USDC as checkout.

### A. Hardening consultancies

Names: AY Automate, Fraktional, Silverthread Labs, SFAI Labs. Handed. First-customer lane.

```
              they keep the audit / hooks / YAML / rollout
                         (their product, not ours)
     -------------------------------------------------
       their pages already name the job:
       files the agent reads, untrusted MCP,
       paused rollout / PHI prompt list,
       no audit trail on agentic workflows,
       OpenClaw running vs running safely
     -------------------------------------------------
              Parse: screen + dated receipt
           /demo or POST /v1/keys/generate
     -------------------------------------------------
         first step: Free $0 then Pro $49/mo draft
```

| Firm | Their words | Source | as_of |
|---|---|---|---|
| AY Automate | The biggest Claude Code security risks are prompt injection through files it reads… untrusted MCP servers… | https://www.ayautomate.com/blog/claude-code-security-risks | 2026-08-19 21:54 ET |
| Fraktional | The rollout gets paused. Audit question: show me every prompt that touched data classified as PHI, for the last 90 days. | https://www.fraktional.ai/blog/claude-code-rollout-security-guide | 2026-08-19 21:55 ET |
| Silverthread Labs | no audit trail of actions taken during agentic workflows… For teams under SOC 2, ISO 27001… that's a gap | https://www.silverthreadlabs.com/services/ai-developer-tooling/claude-code-enterprise | 2026-08-19 21:55 ET |
| SFAI Labs | The gap between Openclaw running and Openclaw running safely for a team is where most enterprise pilots stall. | https://sfailabs.com/guides/openclaw-enterprise-deployment | 2026-08-19 22:00 ET |

### B. SI Claude Code practices

Handed: TIMEWELL. Mapped: GrowExx, Opsio, GP Solutions.

```
                 they keep the onboarding / WARP engagement
     -------------------------------------------------
       their pages already name the job:
       every input the agent reads is attack surface;
       we want it and we don't want it in the same companies
     -------------------------------------------------
              Parse: screen + dated receipt
     -------------------------------------------------
         first step: Free $0 then Pro $49/mo draft
```

TIMEWELL (as of 2026-08-19 22:00 ET): We want it because it's powerful and We don't want it because of the risk coexist inside the same companies. Every input the agent reads is part of your attack surface. That gap is the actual project. https://timewell.jp/en/columns/claude-code-enterprise-onboarding-complete-guide

### C. Operator teams (lighter)

Not the first-customer path. Judy / Codnity / aiArch rejected. Do not re-hand. GoodBarber / Kiwop unhanded.

```
                    they keep running the agent
     -------------------------------------------------
       their pages say they operate agents or
       rolled Claude Code to the team
     -------------------------------------------------
              Parse: screen + dated receipt
     -------------------------------------------------
         if ever handed: Free then Solo $12/mo
```

## 5. How a name becomes a card

1. Tolui or Temujin hands a firm with own-page quote and URL.
2. Guyuk refetches the page. Exclude first.
3. Three dated public signals or stay researching. Never invent posts.
4. Nogai / Guyuk take a printed To only. No first.last guess.
5. Draft in Danny voice + Duwa craft (next drafts only): subject 1–7 words; first line a last-two-weeks fact; under 100 words; one Parse/demo proof line; one interest question; demo closer, not attach-a-file.
6. Show 2–3 cards in Guyuk chat. Wait. Do not batch until Danny says batch.
7. On approve: drafts/, ledger, seen.json. Gmail DRAFT on d@kurult.ai only if email+verified. Never Send.

## 6. What is already in motion

- Five overnight Gmail DRAFTs sit on d@kurult.ai (AY, Fraktional, SFAI, Silverthread, TIMEWELL). Not sent.
- TIMEWELL rewrite: quotes + demo-path receipt (risk_score 10, verdict critical, 11 flags, blocked, trace id). Do not count matched_token on those 11.
- Operator-team sample rejected. Do not re-ask.
- LinkedIn remains on hold.

## 7. Next 7 days (list, not assigned work)

1. TIMEWELL in the review room: change / approve / reject.
2. Five existing Gmail DRAFTs: send, change, or kill. Nobody Sends from a bot.
3. Next names need a last-two-weeks public fact or they stay researching.
4. GoodBarber and Kiwop only if batch is said.
5. Printed Tos before any new Gmail DRAFT.
6. Cap stays 2–3 new cards at a time.

## 8. Hard stops

- Never Send. Never personal Gmail. Never invent buyer pain, posts, or emails.
- x402 OFF. Do not quote USDC as checkout.
- Do not draft Sierra, Ripple, Upbound, Judy, Codnity, or aiArch again unless Danny reopens them.
- Do not copy guyuk-gtm sqlite. Do not touch Parse prod admin, New Bot, Parse Media, or Hulegu.
- Nobody sends email or LinkedIn.
- Do not draft a new pack from the value pyramids alone.
