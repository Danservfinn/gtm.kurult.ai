(() => {
  "use strict";

  const STATUS_LABEL = {
    waiting_approve: "waiting approve",
    hold: "hold",
    test_draft: "test draft",
    approved_held: "approved · held",
    suppressed_competitor: "suppressed · competitor",
    gmail_draft_pending_send: "draft pending send",
    rejected: "rejected",
  };

  const GATE_LABEL = {
    approve: "approve — Danny",
    temujin_send: "Temujin send",
    hold: "hold",
    none: "—",
  };

  // Which row statuses each printed tally must equal. Success counters
  // (replies, /attack, /audit) are unknown by definition and never checked.
  const TALLY_FROM_ROWS = {
    sent: ["sent"],
    waiting_approve: ["waiting_approve"],
    hold: ["hold"],
    gmail_draft_pending_send: ["gmail_draft_pending_send"],
    suppressed: ["suppressed_competitor"],
    rejected: ["rejected"],
  };

  const els = {
    meta: document.getElementById("board-meta"),
    tiles: document.getElementById("tiles"),
    groups: document.getElementById("board-groups"),
  };

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function statusTotals(groups) {
    const totals = {};
    for (const g of groups) {
      for (const row of g.rows) {
        const n = Number.isFinite(row.count) ? row.count : 1;
        totals[row.status] = (totals[row.status] || 0) + n;
      }
    }
    return totals;
  }

  function renderMeta(snapshot) {
    els.meta.textContent = [
      `Snapshot ${snapshot.label}`,
      `sent ${snapshot.sent_total}`,
      `LinkedIn ${snapshot.linkedin}`,
      `x402 ${String(snapshot.x402).toUpperCase()}`,
    ].join(" · ");
  }

  function tileHtml(count, totals) {
    const unknown = count.value === "unknown";
    const statuses = TALLY_FROM_ROWS[count.key];
    let mismatch = false;
    if (!unknown && statuses) {
      const fromRows = statuses.reduce((sum, s) => sum + (totals[s] || 0), 0);
      mismatch = fromRows !== count.value;
    }
    return `
      <div class="tile" role="listitem" data-key="${esc(count.key)}" data-kind="${unknown ? "unknown" : "number"}">
        <span class="tile-n">${unknown ? "unknown" : esc(count.value)}</span>
        <span class="tile-l">${esc(count.label)}</span>
        <span class="tile-note">${esc(count.note || "")}</span>
        ${mismatch ? `<span class="tile-flag">≠ rows — fix outreach.json</span>` : ""}
      </div>`;
  }

  function queueCell(row) {
    const pos = row.pos ? `<span class="q-pos">${esc(String(row.pos).padStart(2, "0"))}</span>` : "";
    const detail = row.detail ? `<span class="q-detail">${esc(row.detail)}</span>` : "";
    const notes = row.notes && row.notes.length ? `<span class="q-notes">${row.notes.map(esc).join(" · ")}</span>` : "";
    return `${pos}<span class="q-name">${esc(row.queue)}</span>${detail}${notes}`;
  }

  function toCell(row) {
    if (row.to_printed && row.to) {
      const sub = row.to_note ? `<span class="cell-sub">${esc(row.to_note)}</span>` : "";
      return `<span class="to-code">${esc(row.to)}</span>${sub}`;
    }
    return `<span class="to-muted">${esc(row.to_note || "—")}</span>`;
  }

  function rowHtml(row) {
    const statusLabel = STATUS_LABEL[row.status] || row.status;
    const countSuffix = row.count > 1 ? ` · ${row.count}` : "";
    const date = row.last_action_date ? esc(row.last_action_date) : "date not recorded";
    const success =
      row.success === "unknown"
        ? `<span class="chip chip-unknown">unknown</span><span class="cell-sub">no send yet</span>`
        : `<span class="chip chip-na">n/a</span><span class="cell-sub">${row.status === "rejected" ? "closed" : "will not send"}</span>`;
    return `
      <tr>
        <td data-th="Queue">${queueCell(row)}</td>
        <td data-th="Status"><span class="chip" data-status="${esc(row.status)}">${esc(statusLabel)}${countSuffix}</span></td>
        <td data-th="To (printed only)">${toCell(row)}</td>
        <td data-th="Channel"><span class="chan">${esc(row.channel || "—")}</span></td>
        <td data-th="Last action">${esc(row.last_action)}<span class="cell-sub">${date}</span></td>
        <td data-th="Next gate"><span class="gate" data-gate="${esc(row.next_gate)}">${esc(GATE_LABEL[row.next_gate] || row.next_gate)}</span>${row.gate_note ? `<span class="cell-sub">${esc(row.gate_note)}</span>` : ""}</td>
        <td data-th="Success">${success}</td>
      </tr>`;
  }

  function groupHtml(group) {
    return `
      <section class="qgroup" aria-label="${esc(group.title)}">
        <header class="qgroup-head">
          <h3>${esc(group.title)}</h3>
          <span class="qgroup-src">source: ${esc(group.source)}</span>
        </header>
        <div class="qwrap">
          <table class="qtable">
            <thead>
              <tr>
                <th scope="col">Queue</th>
                <th scope="col">Status</th>
                <th scope="col">To (printed only)</th>
                <th scope="col">Channel</th>
                <th scope="col">Last action</th>
                <th scope="col">Next gate</th>
                <th scope="col">Success</th>
              </tr>
            </thead>
            <tbody>${group.rows.map(rowHtml).join("")}</tbody>
          </table>
        </div>
      </section>`;
  }

  function render(data) {
    renderMeta(data.snapshot);
    const totals = statusTotals(data.groups);
    els.tiles.innerHTML = data.counts.map((c) => tileHtml(c, totals)).join("");
    els.groups.innerHTML = data.groups.map(groupHtml).join("");
  }

  fetch("/outreach.json", { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(render)
    .catch((err) => {
      els.groups.innerHTML = `<p class="hint">Failed to load outreach.json: ${esc(err.message)} — <a href="/outreach.json">read the raw snapshot</a>.</p>`;
    });
})();
