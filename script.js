
/* ===== tokens ===== */
:root{
  --bg: #0b0e13;
  --panel: #12161d;
  --panel-2: #161b23;
  --border: #232935;
  --text: #e7ecf3;
  --muted: #8a92a3;
  --accent-signal: #ff6b4a;   /* uncracked / pending */
  --accent-cracked: #4ade80;  /* successfully decrypted */
  --accent-key: #ffc857;      /* amber, tuning-dial highlight */
  --mono: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;
  --sans: 'Inter', system-ui, -apple-system, sans-serif;
  --radius: 10px;
}

*{ box-sizing:border-box; }
html,body{ margin:0; padding:0; }

body{
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  line-height:1.5;
  position:relative;
  min-height:100vh;
}

/* faint scanline / static texture across the whole page, purely atmospheric */
.static-overlay{
  position:fixed; inset:0; pointer-events:none; z-index:1;
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.015) 0px,
      rgba(255,255,255,0.015) 1px,
      transparent 1px,
      transparent 3px
    );
  mix-blend-mode: overlay;
  opacity:0.5;
}

.wrap{ max-width:760px; margin:0 auto; padding:0 20px; }

/* ===== header ===== */
.site-header{
  border-bottom:1px solid var(--border);
  background: linear-gradient(180deg, rgba(255,107,74,0.05), transparent 60%);
  position:relative; z-index:2;
}
.header-inner{
  display:flex; align-items:center; justify-content:space-between;
  padding:22px 20px;
  gap:16px;
}
.brand{ display:flex; align-items:center; gap:14px; }
.brand-mark{
  font-size:26px; color:var(--accent-signal);
  filter: drop-shadow(0 0 8px rgba(255,107,74,0.5));
}
.brand-text h1{
  margin:0; font-family:var(--mono); font-size:20px; letter-spacing:0.12em;
  font-weight:800;
}
.brand-sub{
  margin:2px 0 0; color:var(--muted); font-size:13px; font-family:var(--mono);
}
.dial{
  display:flex; align-items:center; gap:8px;
  font-family:var(--mono); font-size:12px; color:var(--muted);
  border:1px solid var(--border); padding:6px 12px; border-radius:999px;
  white-space:nowrap;
}
.dial-dot{
  width:8px; height:8px; border-radius:50%; background:var(--accent-cracked);
  box-shadow:0 0 8px var(--accent-cracked);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse{ 0%,100%{opacity:1;} 50%{opacity:0.35;} }

/* ===== layout ===== */
main.wrap{ padding-top:34px; padding-bottom:60px; position:relative; z-index:2; }

.panel{
  background: var(--panel);
  border:1px solid var(--border);
  border-radius: var(--radius);
  padding:26px;
  margin-bottom:26px;
}
.panel-head{ margin-bottom:18px; }
.panel-head--row{
  display:flex; align-items:flex-end; justify-content:space-between; gap:12px;
}
.panel-eyebrow{
  font-family:var(--mono); font-size:11px; letter-spacing:0.16em;
  color:var(--accent-key); font-weight:700;
}
.panel h2{ margin:6px 0 8px; font-size:20px; }
.panel-hint{ margin:0; color:var(--muted); font-size:14px; max-width:56ch; }

/* ===== forms ===== */
.form{ display:flex; flex-direction:column; gap:14px; margin-top:6px; }
.field{ display:flex; flex-direction:column; gap:6px; }
.field label{ font-size:13px; font-weight:600; color:var(--text); }
.field label .opt{ font-weight:400; color:var(--muted); }

input[type="text"], textarea{
  background: var(--panel-2);
  border:1px solid var(--border);
  border-radius:8px;
  color:var(--text);
  padding:11px 12px;
  font-family:var(--sans);
  font-size:14px;
  resize:vertical;
}
input[type="text"]:focus, textarea:focus{
  outline:2px solid var(--accent-signal);
  outline-offset:1px;
  border-color:var(--accent-signal);
}
#secretKey, #guessKey{ font-family:var(--mono); letter-spacing:0.03em; }

.btn{
  font-family:var(--sans); font-weight:700; font-size:14px;
  border-radius:8px; border:1px solid transparent;
  padding:12px 18px; cursor:pointer;
  transition:transform 0.08s ease, opacity 0.15s ease;
}
.btn:active{ transform: scale(0.98); }
.btn-primary{
  background:var(--accent-signal); color:#1a0e0a;
}
.btn-primary:hover{ opacity:0.92; }
.btn-primary:disabled{ opacity:0.5; cursor:not-allowed; }
.btn-ghost{
  background:transparent; border-color:var(--border); color:var(--muted);
}
.btn-ghost:hover{ color:var(--text); border-color:var(--accent-signal); }

.form-status{
  margin:0; font-size:13px; font-family:var(--mono); min-height:16px;
}
.form-status.ok{ color:var(--accent-cracked); }
.form-status.err{ color:var(--accent-signal); }

/* ===== feed ===== */
.feed-list{ display:flex; flex-direction:column; gap:14px; }
.empty-state{ color:var(--muted); font-family:var(--mono); font-size:13px; }

.card{
  border:1px solid var(--border);
  border-radius: var(--radius);
  padding:18px;
  background: var(--panel-2);
  position:relative;
  overflow:hidden;
}
.card::before{
  content:"";
  position:absolute; left:0; top:0; bottom:0; width:3px;
  background: var(--accent-signal);
}
.card.is-cracked::before{ background: var(--accent-cracked); }

.card-meta{
  display:flex; align-items:center; justify-content:space-between;
  gap:10px; margin-bottom:10px; flex-wrap:wrap;
}
.card-author{
  font-family:var(--mono); font-weight:700; font-size:13px;
}
.card-time{ font-family:var(--mono); font-size:11px; color:var(--muted); }

.card-status{
  font-family:var(--mono); font-size:11px; letter-spacing:0.05em;
  padding:3px 9px; border-radius:999px; border:1px solid var(--border);
  color:var(--accent-signal);
}
.card.is-cracked .card-status{ color:var(--accent-cracked); border-color:rgba(74,222,128,0.35); }

.cipher-block{
  font-family:var(--mono); font-size:13px; line-height:1.6;
  background:var(--bg);
  border:1px dashed var(--border);
  border-radius:8px;
  padding:12px;
  word-break:break-all;
  color:#c9d1e0;
  margin-bottom:12px;
}

.plaintext-block{
  font-family:var(--sans); font-size:14px;
  background: rgba(74,222,128,0.06);
  border:1px solid rgba(74,222,128,0.3);
  border-radius:8px;
  padding:12px;
  margin-bottom:12px;
}
.plaintext-label{
  display:block; font-family:var(--mono); font-size:10px; letter-spacing:0.1em;
  color:var(--accent-cracked); margin-bottom:6px;
}

.card-footer{ display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
.cracked-by{ font-family:var(--mono); font-size:12px; color:var(--accent-cracked); }

/* ===== modal ===== */
.modal-backdrop{
  position:fixed; inset:0; background:rgba(5,6,9,0.72);
  display:none; align-items:center; justify-content:center;
  padding:20px; z-index:10;
  backdrop-filter: blur(2px);
}
.modal-backdrop.open{ display:flex; }
.modal{
  background:var(--panel); border:1px solid var(--border); border-radius:var(--radius);
  padding:26px; max-width:480px; width:100%; position:relative;
}
.modal-close{
  position:absolute; top:14px; right:16px; background:none; border:none;
  color:var(--muted); font-size:22px; cursor:pointer; line-height:1;
}
.modal-close:hover{ color:var(--text); }
.modal-cipher{
  font-family:var(--mono); font-size:12px; color:var(--muted);
  background:var(--bg); border:1px dashed var(--border); border-radius:8px;
  padding:10px; margin:12px 0 16px; word-break:break-all; max-height:80px; overflow:auto;
}

/* ===== footer ===== */
.site-footer{
  border-top:1px solid var(--border);
  padding:20px 0 40px;
  position:relative; z-index:2;
}
.site-footer p{
  margin:0; color:var(--muted); font-size:12px; font-family:var(--mono);
  max-width:60ch;
}

/* ===== responsive ===== */
@media (max-width:560px){
  .header-inner{ flex-direction:column; align-items:flex-start; }
  .panel{ padding:18px; }
  .panel-head--row{ flex-direction:column; align-items:flex-start; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce){
  .dial-dot{ animation:none; }
}
