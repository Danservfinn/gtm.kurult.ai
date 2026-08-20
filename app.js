(() => {
  "use strict";

  const SEATS = ["Temujin", "Tolui", "Duwa", "Nogai", "Guyuk", "Ghazan", "Danny"];
  const STATES = ["blocked", "ready", "approved", "doing", "done"];
  const AGENT_IDS = {
    Temujin: "aa5dd9c3-21ea-4342-8449-f2e783886735",
    Tolui: "fda4bc5c-bc4c-4815-973b-539436f87246",
    Duwa: "e12c9266-8f57-4209-b65d-7c321fb50ee2",
    Nogai: "4fa60fac-1d9e-4665-8632-d216bd4a81d4",
    Guyuk: "27a37c38-4c86-426c-afcd-70e31c3f0cfa",
    Ghazan: "eb2c6bdb-c680-4fb5-bd46-59d1b1f1261d",
  };
  const CACHE_KEY = "gtm.kurult.ai.v1";
  const REPO_EDIT = {
    todos: "https://github.com/Danservfinn/gtm.kurult.ai/edit/main/todos.json",
    plan: "https://github.com/Danservfinn/gtm.kurult.ai/edit/main/plan.md",
    jsonl: "https://github.com/Danservfinn/gtm.kurult.ai/edit/main/hooks/approved.jsonl",
  };

  const els = {
    list: document.getElementById("todo-list"),
    plan: document.getElementById("plan-editor"),
    approvePanel: document.getElementById("approve-panel"),
    approveEvent: document.getElementById("approve-event"),
    btnAdd: document.getElementById("btn-add"),
    btnDownloadTodos: document.getElementById("btn-download-todos"),
    btnDownloadPlan: document.getElementById("btn-download-plan"),
    btnReset: document.getElementById("btn-reset-cache"),
    btnCopyEvent: document.getElementById("btn-copy-event"),
    btnDownloadJsonl: document.getElementById("btn-download-jsonl"),
  };

  let state = {
    updated: null,
    todos: [],
    plan: "",
    lastApproveLine: "",
    pendingEvents: [],
  };

  function byId(id) {
    return state.todos.find((t) => t.id === id);
  }

  function parseDepends(raw) {
    if (Array.isArray(raw)) {
      return raw.map(String).map((s) => s.trim()).filter(Boolean);
    }
    return String(raw || "")
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function normalizeTodo(t) {
    const seat = SEATS.includes(t.seat) ? t.seat : "Danny";
    let st = STATES.includes(t.state) ? t.state : "blocked";
    return {
      id: String(t.id || "").trim() || nextId(),
      title: String(t.title || "").trim(),
      seat,
      depends_on: parseDepends(t.depends_on),
      state: st,
    };
  }

  function nextId() {
    let n = state.todos.length + 1;
    let id = `T${n}`;
    while (byId(id)) {
      n += 1;
      id = `T${n}`;
    }
    return id;
  }

  function recomputeReadiness() {
    const done = new Set(state.todos.filter((t) => t.state === "done").map((t) => t.id));
    for (const t of state.todos) {
      if (t.state === "blocked") {
        const deps = t.depends_on;
        if (deps.length && deps.every((d) => done.has(d))) {
          t.state = "ready";
        }
      } else if (t.state === "ready") {
        const deps = t.depends_on;
        if (deps.length && !deps.every((d) => done.has(d))) {
          t.state = "blocked";
        }
      }
    }
  }

  function cacheWrite() {
    const payload = {
      updated: new Date().toISOString(),
      todos: state.todos,
      plan: state.plan,
      pendingEvents: state.pendingEvents,
      lastApproveLine: state.lastApproveLine,
    };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* ignore quota */
    }
  }

  function cacheRead() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function todosFileObject() {
    return {
      updated: new Date().toISOString().slice(0, 10),
      todos: state.todos.map((t) => ({
        id: t.id,
        title: t.title,
        seat: t.seat,
        depends_on: t.depends_on,
        state: t.state,
      })),
    };
  }

  function download(filename, text, type) {
    const blob = new Blob([text], { type: type || "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function approveEventLine(todo) {
    const agent = AGENT_IDS[todo.seat] || null;
    const obj = {
      ts: new Date().toISOString(),
      todo_id: todo.id,
      seat: todo.seat,
      agent_id: agent,
      action: todo.seat === "Danny" ? "no_wake_danny_is_user" : "SendToAgent",
      source: "gtm.kurult.ai",
      note:
        todo.seat === "Danny"
          ? "Danny-seat approve does not wake a khan"
          : "Danny approved; begin this one task only; nobody sends",
    };
    return JSON.stringify(obj);
  }

  function showApprovePanel(todo) {
    const line = approveEventLine(todo);
    state.lastApproveLine = line;
    if (!state.pendingEvents.includes(line)) state.pendingEvents.push(line);
    els.approveEvent.textContent = line;
    els.approvePanel.hidden = false;
    cacheWrite();
  }

  function render() {
    recomputeReadiness();
    els.list.innerHTML = "";
    for (const todo of state.todos) {
      els.list.appendChild(todoCard(todo));
    }
    if (els.plan.value !== state.plan) els.plan.value = state.plan;
    cacheWrite();
  }

  function todoCard(todo) {
    const article = document.createElement("article");
    article.className = "todo";
    article.dataset.id = todo.id;
    article.setAttribute("role", "listitem");

    const canApprove = todo.state === "ready";
    const isApprovedish = ["approved", "doing", "done"].includes(todo.state);

    article.innerHTML = `
      <div class="todo-top">
        <span class="todo-id">${escapeHtml(todo.id)}</span>
        <span class="badge" data-state="${escapeHtml(todo.state)}">${escapeHtml(todo.state)}</span>
        <span class="hint">seat ${escapeHtml(todo.seat)}</span>
      </div>
      <div class="fields">
        <div class="field">
          <label>Title</label>
          <input data-field="title" type="text" value="${escapeAttr(todo.title)}">
        </div>
        <div class="field">
          <label>Seat</label>
          <select data-field="seat">${SEATS.map(
            (s) => `<option value="${s}"${s === todo.seat ? " selected" : ""}>${s}</option>`
          ).join("")}</select>
        </div>
        <div class="field">
          <label>depends_on (comma ids)</label>
          <input data-field="depends_on" type="text" value="${escapeAttr(todo.depends_on.join(", "))}">
        </div>
      </div>
      <div class="todo-actions">
        <label class="approve-label" data-disabled="${canApprove ? "false" : "true"}">
          <input type="checkbox" data-action="approve" ${isApprovedish ? "checked" : ""} ${canApprove || isApprovedish ? "" : "disabled"}>
          Danny-only approve
        </label>
        <div class="field" style="min-width:9rem">
          <label>State</label>
          <select data-field="state">${STATES.map(
            (s) => `<option value="${s}"${s === todo.state ? " selected" : ""}>${s}</option>`
          ).join("")}</select>
        </div>
        <button type="button" class="btn btn-quiet" data-action="remove">Remove</button>
      </div>
      ${
        canApprove
          ? `<p class="hint">Ready for Danny. Check approve, then commit todos.json + hooks/approved.jsonl (see panel).</p>`
          : todo.state === "blocked"
            ? `<p class="hint">Blocked until depends_on are done: ${escapeHtml(todo.depends_on.join(", ") || "—")}</p>`
            : todo.seat === "Danny" && isApprovedish
              ? `<p class="hint">Danny seat — no khan wake.</p>`
              : ""
      }
    `;

    article.querySelectorAll("[data-field]").forEach((input) => {
      const apply = () => {
        const field = input.getAttribute("data-field");
        if (field === "title") todo.title = input.value;
        if (field === "seat") todo.seat = input.value;
        if (field === "depends_on") todo.depends_on = parseDepends(input.value);
        if (field === "state") {
          const prev = todo.state;
          todo.state = input.value;
          if (todo.state === "done" && prev !== "done") {
            recomputeReadiness();
          }
          if (todo.state === "approved" && prev === "ready") {
            showApprovePanel(todo);
          }
        }
        render();
      };
      input.addEventListener("change", apply);
      if (input.tagName === "INPUT") input.addEventListener("blur", apply);
    });

    const approve = article.querySelector('[data-action="approve"]');
    approve.addEventListener("change", () => {
      if (!approve.checked) {
        if (todo.state === "approved") {
          todo.state = "ready";
          render();
        }
        return;
      }
      if (todo.state !== "ready") {
        approve.checked = false;
        return;
      }
      todo.state = "approved";
      showApprovePanel(todo);
      render();
    });

    article.querySelector('[data-action="remove"]').addEventListener("click", () => {
      state.todos = state.todos.filter((t) => t.id !== todo.id);
      render();
    });

    return article;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  async function boot() {
    const [todosRes, planRes] = await Promise.all([
      fetch("/todos.json", { cache: "no-store" }),
      fetch("/plan.md", { cache: "no-store" }),
    ]);
    const fileTodos = await todosRes.json();
    const filePlan = await planRes.text();
    const cached = cacheRead();

    if (cached && Array.isArray(cached.todos) && cached.todos.length) {
      state.todos = cached.todos.map(normalizeTodo);
      state.plan = typeof cached.plan === "string" && cached.plan.length ? cached.plan : filePlan;
      state.pendingEvents = Array.isArray(cached.pendingEvents) ? cached.pendingEvents : [];
      state.lastApproveLine = cached.lastApproveLine || "";
    } else {
      state.todos = (fileTodos.todos || []).map(normalizeTodo);
      state.plan = filePlan;
    }
    state.updated = fileTodos.updated || null;

    if (state.lastApproveLine) {
      els.approveEvent.textContent = state.lastApproveLine;
      els.approvePanel.hidden = false;
    }

    render();
  }

  els.plan.addEventListener("input", () => {
    state.plan = els.plan.value;
    cacheWrite();
  });

  els.btnAdd.addEventListener("click", () => {
    state.todos.push(
      normalizeTodo({
        id: nextId(),
        title: "New todo",
        seat: "Danny",
        depends_on: [],
        state: "ready",
      })
    );
    render();
  });

  els.btnDownloadTodos.addEventListener("click", () => {
    download("todos.json", JSON.stringify(todosFileObject(), null, 2) + "\n", "application/json");
  });

  els.btnDownloadPlan.addEventListener("click", () => {
    download("plan.md", state.plan.endsWith("\n") ? state.plan : state.plan + "\n", "text/markdown");
  });

  els.btnReset.addEventListener("click", () => {
    localStorage.removeItem(CACHE_KEY);
    location.reload();
  });

  els.btnCopyEvent.addEventListener("click", async () => {
    const text = els.approveEvent.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      els.btnCopyEvent.textContent = "Copied";
      setTimeout(() => {
        els.btnCopyEvent.textContent = "Copy event line";
      }, 1200);
    } catch (_) {
      /* ignore */
    }
  });

  els.btnDownloadJsonl.addEventListener("click", () => {
    const body = (state.pendingEvents.length ? state.pendingEvents : [state.lastApproveLine])
      .filter(Boolean)
      .join("\n");
    download("approved-append.jsonl", body + (body ? "\n" : ""), "application/x-ndjson");
  });

  // Keep GitHub edit URLs discoverable if DOM links change.
  void REPO_EDIT;

  boot().catch((err) => {
    els.list.innerHTML = `<p class="hint">Failed to load todos/plan: ${escapeHtml(err.message)}</p>`;
  });
})();
