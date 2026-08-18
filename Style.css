
/* =========================================================
   DEAD DROP — public AES cipher feed
   Replace APPS_SCRIPT_URL with your deployed Apps Script
   Web App URL (see README.md for setup steps).
   ========================================================= */
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmt7StUWRxYYYM_6Ebu1PGMQD1ljDYyqwsMOqLL5wD5NJVcvEpIOxTRS2FgF4J_v8e/exec";

const feedList = document.getElementById("feedList");
const feedStatus = document.getElementById("feedStatus");
const composeForm = document.getElementById("composeForm");
const composeStatus = document.getElementById("composeStatus");
const submitBtn = document.getElementById("submitBtn");
const refreshBtn = document.getElementById("refreshBtn");

const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalCipher = document.getElementById("modalCipher");
const decryptForm = document.getElementById("decryptForm");
const decryptStatus = document.getElementById("decryptStatus");
const decryptBtn = document.getElementById("decryptBtn");

let activeMessage = null; // the feed item currently open in the decrypt modal

/* ---------- helpers ---------- */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function formatTime(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

function setStatus(el, message, kind) {
  el.textContent = message || "";
  el.classList.remove("ok", "err");
  if (kind) el.classList.add(kind);
}

/* AES encrypt: returns ciphertext string safe to store/display publicly */
function aesEncrypt(plaintext, key) {
  return CryptoJS.AES.encrypt(plaintext, key).toString();
}

/* AES decrypt: returns the plaintext string, or null if the key was wrong */
function aesDecrypt(ciphertext, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    const text = bytes.toString(CryptoJS.enc.Utf8);
    if (!text) return null; // wrong key usually yields empty/garbled bytes
    return text;
  } catch (err) {
    return null; // malformed padding etc. -> wrong key
  }
}

async function callBackend(payload) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    // text/plain avoids a CORS preflight against Apps Script web apps
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Network error talking to the backend.");
  return res.json();
}

async function fetchFeed() {
  const url = `${APPS_SCRIPT_URL}?action=list`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not load the feed.");
  return res.json();
}

/* ---------- feed rendering ---------- */

function renderFeed(messages) {
  if (!messages || messages.length === 0) {
    feedList.innerHTML = `<p class="empty-state">No transmissions yet. Be the first to drop one above.</p>`;
    return;
  }

  feedList.innerHTML = messages.map((m) => {
    const cracked = !!m.decrypted;
    return `
      <article class="card ${cracked ? "is-cracked" : ""}" data-id="${escapeHtml(m.id)}">
        <div class="card-meta">
          <span class="card-author">${escapeHtml(m.author || "anonymous")}</span>
          <span class="card-status">${cracked ? "🔓 CRACKED" : "🔒 SEALED"}</span>
        </div>
        <div class="cipher-block">${escapeHtml(m.ciphertext)}</div>
        ${cracked ? `
          <div class="plaintext-block">
            <span class="plaintext-label">DECRYPTED MESSAGE</span>
            ${escapeHtml(m.plaintext)}
          </div>
        ` : ""}
        <div class="card-footer">
          <span class="card-time">${formatTime(m.timestamp)}</span>
          ${cracked
            ? `<span class="cracked-by">cracked by ${escapeHtml(m.decryptedBy)}</span>`
            : `<button class="btn btn-ghost try-btn" type="button">Try to decrypt →</button>`
          }
        </div>
      </article>
    `;
  }).join("");

  feedList.querySelectorAll(".try-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const id = card.getAttribute("data-id");
      const msg = messages.find((m) => m.id === id);
      openDecryptModal(msg);
    });
  });
}

async function loadFeed() {
  feedStatus.textContent = "loading…";
  try {
    const data = await fetchFeed();
    if (!data.ok) throw new Error(data.error || "Feed error.");
    renderFeed(data.messages);
    feedStatus.textContent = "listening…";
  } catch (err) {
    feedStatus.textContent = "offline";
    feedList.innerHTML = `<p class="empty-state">Couldn't reach the feed. ${escapeHtml(err.message)}</p>`;
  }
}

/* ---------- compose / submit ---------- */

composeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const author = document.getElementById("senderName").value.trim() || "anonymous";
  const message = document.getElementById("plainMessage").value.trim();
  const key = document.getElementById("secretKey").value;

  if (!message || !key) {
    setStatus(composeStatus, "Message and key are both required.", "err");
    return;
  }

  submitBtn.disabled = true;
  setStatus(composeStatus, "Encrypting locally…", null);

  try {
    const ciphertext = aesEncrypt(message, key);

    setStatus(composeStatus, "Broadcasting to the feed…", null);
    const result = await callBackend({
      action: "submit",
      author,
      ciphertext,
      key
    });

    if (!result.ok) throw new Error(result.error || "Could not save the message.");

    setStatus(composeStatus, "Dropped. Your key stays with you.", "ok");
    composeForm.reset();
    loadFeed();
  } catch (err) {
    setStatus(composeStatus, err.message, "err");
  } finally {
    submitBtn.disabled = false;
  }
});

/* ---------- decrypt modal ---------- */

function openDecryptModal(message) {
  activeMessage = message;
  modalCipher.textContent = message.ciphertext;
  decryptForm.reset();
  setStatus(decryptStatus, "", null);
  modalBackdrop.classList.add("open");
  document.getElementById("crackerName").focus();
}

function closeDecryptModal() {
  modalBackdrop.classList.remove("open");
  activeMessage = null;
}

modalClose.addEventListener("click", closeDecryptModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeDecryptModal();
});

decryptForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeMessage) return;

  const name = document.getElementById("crackerName").value.trim();
  const guess = document.getElementById("guessKey").value;

  if (!name || !guess) {
    setStatus(decryptStatus, "Enter your name and a key guess.", "err");
    return;
  }

  decryptBtn.disabled = true;
  setStatus(decryptStatus, "Trying key…", null);

  // Attempt the decryption locally first — no point calling the backend
  // if the key obviously doesn't unlock this ciphertext.
  const plaintext = aesDecrypt(activeMessage.ciphertext, guess);

  if (plaintext === null) {
    setStatus(decryptStatus, "Wrong key. Transmission remains sealed.", "err");
    decryptBtn.disabled = false;
    return;
  }

  try {
    const result = await callBackend({
      action: "verify",
      id: activeMessage.id,
      name,
      guess,
      plaintext
    });

    if (result.ok) {
      setStatus(decryptStatus, "Cracked it! Logging your name…", "ok");
      setTimeout(() => {
        closeDecryptModal();
        loadFeed();
      }, 700);
    } else if (result.reason === "already") {
      setStatus(decryptStatus, `Too slow — ${result.decryptedBy} already cracked this one.`, "err");
      setTimeout(() => { closeDecryptModal(); loadFeed(); }, 1200);
    } else {
      setStatus(decryptStatus, "Wrong key. Transmission remains sealed.", "err");
    }
  } catch (err) {
    setStatus(decryptStatus, err.message, "err");
  } finally {
    decryptBtn.disabled = false;
  }
});

/* ---------- init ---------- */

refreshBtn.addEventListener("click", loadFeed);
loadFeed();
