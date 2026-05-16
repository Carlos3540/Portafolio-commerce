import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Calendar, 
  MessageSquare, 
  Mail, 
  Camera, 
  ShoppingCart, 
  Gamepad2, 
  Zap, 
  Bot, 
  BarChart3, 
  Search, 
  RefreshCw, 
  PlusCircle, 
  Palette, 
  Ruler, 
  Rocket, 
  Package, 
  CreditCard, 
  Globe, 
  Phone,
  RotateCw,
  Plus,
  AlertTriangle,
  Sparkles,
  Hexagon
} from "lucide-react";
import perfilImg from "./src/assets/perfil.jpg";

/* ─── FRAMER MOTION (CDN via esm.sh not available in sandbox, so we do CSS + IntersectionObserver animations) ─── */

/* ════════════════════════════════════════════════════════════
   GLOBAL STYLES injected once
════════════════════════════════════════════════════════════ */
const GlobalStyles = () => {
  useEffect(() => {
    const id = "cr-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --bg:#050508;--bg2:#0b0b10;--bg3:#111119;
        --surface:#15151e;--surface2:#1c1c28;
        --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.12);
        --text:#eeeef5;--muted:#8080a0;
        --accent:#00e5a0;--accent2:#00b8ff;
        --accent-dim:rgba(0,229,160,.1);--accent2-dim:rgba(0,184,255,.1);
        --fh:'Syne',sans-serif;--fb:'DM Sans',sans-serif;
        --r8:8px;--r12:12px;--r16:16px;--r20:20px;--r999:999px;
      }
      html{scroll-behavior:smooth;overflow-x:hidden}
      body{background:var(--bg);color:var(--text);font-family:var(--fb);line-height:1.7;overflow-x:hidden}
      ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

      /* KEYFRAMES */
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes spin3d{to{transform:rotateY(360deg) rotateX(15deg)}}
      @keyframes spinRing{to{transform:rotate(360deg)}}
      @keyframes spinRingR{to{transform:rotate(-360deg)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.7);opacity:.5}}
      @keyframes waFloat{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,.4)}50%{box-shadow:0 4px 32px rgba(37,211,102,.7),0 0 0 10px rgba(37,211,102,.08)}}
      @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes scanline{0%{top:-40px}100%{top:100%}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}

      /* REVEAL */
      .reveal{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
      .reveal.in{opacity:1;transform:translateY(0)}
      .reveal-left{opacity:0;transform:translateX(-32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
      .reveal-left.in{opacity:1;transform:translateX(0)}
      .reveal-right{opacity:0;transform:translateX(32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
      .reveal-right.in{opacity:1;transform:translateX(0)}
      .reveal-scale{opacity:0;transform:scale(.92);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
      .reveal-scale.in{opacity:1;transform:scale(1)}

      /* NAV MOBILE MENU */
      .mobile-menu{position:fixed;inset:0;background:rgba(5,5,8,.97);z-index:90;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;transform:translateY(-100%);transition:transform .4s cubic-bezier(.22,1,.36,1);backdrop-filter:blur(24px)}
      .mobile-menu.open{transform:translateY(0)}

      /* GRID BG */
      .grid-bg{background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:64px 64px}

      /* GLOW */
      .glow-teal{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(0,229,160,.12),transparent 65%);pointer-events:none}
      .glow-blue{position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(0,184,255,.09),transparent 65%);pointer-events:none}

      /* HERO TYPING */
      .typing-cursor::after{content:'|';animation:blink 1s step-end infinite;color:var(--accent)}

      /* CHART TOOLTIP */
      .chart-tooltip{position:absolute;background:var(--surface2);border:1px solid var(--border2);border-radius:var(--r8);padding:.5rem .85rem;font-size:.75rem;color:var(--text);pointer-events:none;white-space:nowrap;z-index:10}

      /* PROGRESS BAR */
      .prog-bar{height:4px;border-radius:var(--r999);background:var(--surface2);overflow:hidden;margin-top:.5rem}
      .prog-fill{height:100%;border-radius:var(--r999);background:linear-gradient(90deg,var(--accent),var(--accent2));transform-origin:left;transform:scaleX(0);transition:transform 1.2s cubic-bezier(.22,1,.36,1)}
      .prog-fill.in{transform:scaleX(1)}

      /* TECH CARD */
      .tech-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r12);padding:1rem;display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center;transition:border-color .25s,transform .25s,background .25s;cursor:default}
      .tech-card:hover{border-color:rgba(0,229,160,.3);transform:translateY(-4px);background:var(--surface2)}

      /* FLOW NODE */
      .flow-node{background:var(--surface);border:1px solid var(--border2);border-radius:var(--r12);padding:1rem 1.25rem;display:flex;align-items:center;gap:.875rem;transition:border-color .25s,transform .25s}
      .flow-node:hover{border-color:rgba(0,229,160,.35);transform:translateX(5px)}

      /* CERT CARD */
      .cert-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r16);padding:1.5rem;position:relative;overflow:hidden;transition:border-color .25s,transform .25s}
      .cert-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent2))}
      .cert-card:hover{transform:translateY(-4px);border-color:rgba(0,229,160,.25)}

      /* SHIMMER TEXT */
      .shimmer-text{background:linear-gradient(90deg,var(--accent) 0%,#fff 40%,var(--accent2) 60%,var(--accent) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite}

      /* BUTTON */
      .btn-p{background:var(--accent);color:#050508;font-family:var(--fh);font-weight:700;padding:.85rem 1.75rem;border-radius:var(--r8);text-decoration:none;font-size:.9rem;letter-spacing:.02em;transition:transform .2s,box-shadow .2s;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;line-height:1}
      .btn-p:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,229,160,.35)}
      .btn-p:active{transform:translateY(0)}
      .btn-s{background:transparent;color:var(--text);font-family:var(--fh);font-weight:600;padding:.85rem 1.75rem;border-radius:var(--r8);text-decoration:none;font-size:.9rem;letter-spacing:.02em;transition:all .2s;border:1px solid var(--border2);display:inline-flex;align-items:center;gap:.5rem;cursor:pointer;line-height:1}
      .btn-s:hover{border-color:rgba(0,184,255,.45);color:var(--accent2);background:var(--accent2-dim)}

      /* PROFILE PHOTO */
      .profile-container{border-radius:var(--r999);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;border:2px solid var(--border2)}
      .profile-img{width:100%;height:100%;object-fit:cover;border-radius:var(--r999)}

      /* CANVAS 3D */
      .canvas-ring{position:absolute;border-radius:50%;border:1px solid;top:50%;left:50%;transform:translate(-50%,-50%)}

      /* ACTIVE NAV */
      .nav-link-active{color:var(--accent) !important}
    `;
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(e){} };
  }, []);
  return null;
};

/* ════════════════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════════════════ */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("in"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function useCountUp(target, duration = 2000, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let s = null, st = performance.now();
    const tick = (now) => {
      const p = Math.min((now - st) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) s = requestAnimationFrame(tick);
    };
    s = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s);
  }, [start, target, duration]);
  return val;
}

/* ════════════════════════════════════════════════════════════
   MINI CHART – pure SVG, no lib needed for small charts
════════════════════════════════════════════════════════════ */
function MiniBarChart({ data, labels, color = "#00e5a0", label }) {
  const max = Math.max(...data);
  const w = 100, h = 80, pad = 8, barW = (w - pad * 2) / data.length - 4;
  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} style={{ width: "100%", overflow: "visible" }}>
      {data.map((v, i) => {
        const bh = ((v / max) * h) * 0.85;
        const x = pad + i * ((w - pad * 2) / data.length) + 2;
        const y = h - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="3"
              fill={color} opacity={0.7 + (v / max) * 0.3} />
            <text x={x + barW / 2} y={h + 14} textAnchor="middle"
              fontSize="6" fill="#8080a0">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function MiniLineChart({ data, color = "#00b8ff" }) {
  const max = Math.max(...data), min = Math.min(...data);
  const w = 100, h = 70, pad = 4;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const fillPts = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="lgLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill="url(#lgLine)" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => {
        const x = pad + (i / (data.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
        return <circle key={i} cx={x} cy={y} r="2" fill={color} />;
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   COMPONENTS
════════════════════════════════════════════════════════════ */

/* — NAV — */
function Nav({ activeSection }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "problema", label: "El Problema" },
    { id: "servicios", label: "Servicios" },
    { id: "evocore", label: "Evocore 96" },
    { id: "logistica", label: "Logística" },
    { id: "techstack", label: "Stack" },
    { id: "certs", label: "Certificaciones" },
    { id: "cta", label: "Contacto" },
  ];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 1.5rem", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(5,5,8,.88)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div style={{ fontFamily: "var(--fh)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-.02em" }}>
          CR<span style={{ color: "var(--accent)" }}>.</span>dev
        </div>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "1.75rem", listStyle: "none", alignItems: "center" }}
          className="desktop-nav">
          {links.map(l => (
            <li key={l.id}>
              <button onClick={() => scrollTo(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeSection === l.id ? "var(--accent)" : "var(--muted)",
                fontSize: ".82rem", fontFamily: "var(--fb)", fontWeight: 400,
                transition: "color .2s", padding: "4px 0"
              }}>{l.label}</button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
          <a href="https://wa.me/573183414381?text=Hola%20Carlos,%20quiero%20agendar%20una%20demo%20gratuita"
            target="_blank" rel="noopener noreferrer" className="btn-p"
            style={{ padding: ".5rem 1.1rem", fontSize: ".78rem", display: "inline-flex" }}>
            <Calendar size={14} /> Agendar Demo
          </a>
          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} aria-label="Menú" style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 4
          }}
            className="hamburger-btn">
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2,
                background: open && i === 1 ? "transparent" : "var(--text)",
                borderRadius: 2, transition: "all .3s",
                transform: open ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none"
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: activeSection === l.id ? "var(--accent)" : "var(--text)",
            fontSize: "1.6rem", fontFamily: "var(--fh)", fontWeight: 700,
            transition: "color .2s"
          }}>{l.label}</button>
        ))}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="https://wa.me/573183414381" target="_blank" rel="noopener noreferrer" className="btn-p" onClick={() => setOpen(false)}>
            <MessageSquare size={18} /> WhatsApp
          </a>
          <a href="mailto:carlosestecnologia@gmail.com" className="btn-s" onClick={() => setOpen(false)}>
            <Mail size={18} /> Email
          </a>
        </div>
      </div>

      <style>{`
        @media(min-width:769px){.hamburger-btn{display:none}.desktop-nav{display:flex!important}}
        @media(max-width:768px){.hamburger-btn{display:flex}.desktop-nav{display:none!important}}
      `}</style>
    </>
  );
}

/* — HERO — */
function Hero({ profileImg }) {
  // const fileRef = useRef(null); // Removed upload logic
  const [typed, setTyped] = useState("");
  const fullText = "Full-Stack Developer & E-commerce Specialist";

  useEffect(() => {
    let i = 0, t;
    const tick = () => { setTyped(fullText.slice(0, i + 1)); i++; if (i < fullText.length) t = setTimeout(tick, 45); };
    t = setTimeout(tick, 900);
    return () => clearTimeout(t);
  }, []);

  const statsVisible = useRef(false);
  const statRef = useRef(null);
  const [statsOn, setStatsOn] = useState(false);
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !statsVisible.current) { statsVisible.current = true; setStatsOn(true); } }, { threshold: .3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const c1 = useCountUp(12, 2000, statsOn);
  const c2 = useCountUp(4, 1500, statsOn);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "7rem 1.5rem 4rem",
      position: "relative", overflow: "hidden"
    }} className="grid-bg">
      <div className="glow-teal" style={{ width: 600, height: 600, top: "10%", left: "30%", transform: "translateX(-50%)" }} />
      <div className="glow-blue" style={{ width: 400, height: 400, top: "50%", right: "5%" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Two-column layout: content + profile */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto",
          gap: "3rem", alignItems: "center"
        }} className="hero-grid">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              background: "var(--accent-dim)", border: "1px solid rgba(0,229,160,.2)",
              padding: ".35rem .9rem", borderRadius: "var(--r999)",
              fontSize: ".72rem", fontWeight: 600, color: "var(--accent)",
              marginBottom: "1.75rem",
              animation: "fadeUp .6s .1s both"
            }}>
              <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%", display: "inline-block", animation: "pulseDot 2s infinite" }} />
              Disponible para proyectos · Bogotá, Colombia
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "var(--fh)", fontWeight: 800, lineHeight: 1.05,
              letterSpacing: "-.035em", marginBottom: "1.25rem",
              fontSize: "clamp(2.2rem,6vw,4.5rem)",
              animation: "fadeUp .7s .25s both"
            }}>
              <span style={{ color: "var(--accent)" }}>Carlos Riaño</span><br />
              <span className="shimmer-text">Ecosistema Digital</span><br />
              <span style={{ color: "var(--text)", fontSize: "70%" }}>para marcas que no se detienen</span>
            </h1>

            {/* Typing subtitle */}
            <p style={{
              fontFamily: "var(--fh)", fontWeight: 600, fontSize: "clamp(.95rem,2vw,1.15rem)",
              color: "var(--muted)", marginBottom: "1rem",
              animation: "fadeUp .7s .4s both", minHeight: "1.5em"
            }} className={typed.length < fullText.length ? "typing-cursor" : ""}>
              {typed}
            </p>

            <p style={{
              color: "var(--muted)", fontWeight: 300, fontSize: ".95rem",
              maxWidth: 520, marginBottom: "2rem", lineHeight: 1.8,
              animation: "fadeUp .7s .55s both"
            }}>
              Automatización logística avanzada, experiencias interactivas en 3D y contenido con IA — diseñado para maximizar tu conversión.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: ".875rem", flexWrap: "wrap", animation: "fadeUp .7s .7s both" }}>
              <a href="https://wa.me/573183414381?text=Hola%20Carlos,%20quiero%20agendar%20mi%20demo%20gratuita"
                target="_blank" rel="noopener noreferrer" className="btn-p">
                <Calendar size={18} /> Agendar Demo Gratis
              </a>
              <a href="https://evolet96.com" target="_blank" rel="noopener noreferrer" className="btn-s">
                <Gamepad2 size={18} /> Ver Evocore 96 en vivo
              </a>
            </div>

            {/* Stats */}
            <div ref={statRef} style={{
              display: "flex", gap: "2.5rem", marginTop: "3rem",
              paddingTop: "2rem", borderTop: "1px solid var(--border)",
              flexWrap: "wrap", animation: "fadeUp .7s .85s both"
            }}>
              {[
                { num: `+${c1}`, label: "meses automatizando logística", suffix: "" },
                { num: `${c2}+`, label: "transportadoras integradas", suffix: "" },
                { num: "3D", label: "Tecnología propietaria Evocore 96", suffix: "" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--muted)", marginTop: ".2rem", maxWidth: 120 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Profile Photo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", animation: "fadeIn 1s .5s both" }}
            className="hero-profile">
            {/* Glow ring behind photo */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: -12,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, var(--accent), var(--accent2), var(--accent))",
                animation: "spinRing 6s linear infinite",
                opacity: .6, filter: "blur(8px)"
              }} />
              {/* Photo container */}
              <div className="profile-container" style={{ width: 220, height: 220, position: "relative" }}>
                {profileImg ? (
                  <img src={profileImg} alt="Carlos Riaño" className="profile-img" />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", textAlign: "center", padding: "1.5rem" }}>
                    <div style={{ color: "var(--accent)" }}><Camera size={40} /></div>
                    <div style={{ fontFamily: "var(--fh)", fontSize: ".8rem", fontWeight: 700, color: "var(--text)" }}>No photo</div>
                  </div>
                )}
              </div>
            </div>
            {/* Name card below photo */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r12)", padding: ".875rem 1.25rem", textAlign: "center", width: "100%" }}>
              <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".9rem" }}>Carlos Riaño</div>
              <div style={{ fontSize: ".7rem", color: "var(--accent)", fontWeight: 600, marginTop: ".15rem" }}>Full-Stack · E-commerce · 3D</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          .hero-grid{grid-template-columns:1fr!important; gap: 2.5rem!important; text-align: center!important;}
          .hero-profile{display:flex!important; order: -1!important;}
          .hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .hero-grid > div:first-child > div:first-child { margin-left: auto; margin-right: auto; }
          .hero-grid div[style*="flexWrap: wrap"] { justify-content: center; }
        }
      `}</style>
    </section>
  );
}

/* — SECTION WRAPPER — */
const Sec = ({ id, bg = "var(--bg)", children, style = {} }) => (
  <section id={id} style={{ padding: "5rem 1.5rem", background: bg, position: "relative", overflow: "hidden", ...style }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
  </section>
);

const Tag = ({ children }) => (
  <p style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--accent)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".75rem" }}>
    {children}
  </p>
);

const H2 = ({ children }) => (
  <h2 style={{ fontFamily: "var(--fh)", fontWeight: 800, fontSize: "clamp(1.75rem,4vw,2.8rem)", letterSpacing: "-.025em", lineHeight: 1.1, marginBottom: "1rem" }}>
    {children}
  </h2>
);

/* — PROBLEMA — */
function Problema() {
  const r1 = useReveal(0), r2 = useReveal(100), r3 = useReveal(200);
  const progRef = useRef(null);
  const [progOn, setProgOn] = useState(false);
  useEffect(() => {
    const el = progRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setProgOn(true); obs.unobserve(el); } }, { threshold: .2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const perdidas = [
    { sector: "Ropa / Moda", val: 8.5, unit: "M COP/mes" },
    { sector: "Restaurante", val: 12, unit: "M COP/mes" },
    { sector: "Tecnología", val: 18, unit: "M COP/mes" },
    { sector: "Marca personal", val: 5, unit: "M COP/mes" },
    { sector: "Estudio creativo", val: 7, unit: "M COP/mes" },
  ];
  const max = 18;

  return (
    <Sec id="problema" bg="var(--bg2)">
      <div className="reveal" ref={r1}>
        <Tag>El problema real · Datos que no puedes ignorar</Tag>
        <H2>¿Cuánto te cuesta <span style={{ color: "var(--accent)" }}>NO</span> existir online?</H2>
        <p style={{ color: "var(--muted)", maxWidth: 580, fontSize: ".98rem", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
          En la era digital, carecer de presencia profesional no es una posición neutral — es una pérdida activa y cuantificable cada mes.
        </p>
      </div>

      {/* Stats band */}
      <div ref={r2} className="reveal" style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
        gap: "1rem", marginBottom: "2.5rem"
      }}>
        {[
          { num: "81%", label: "busca online antes de comprar", c: "#ff5252" },
          { num: "3 seg", label: "para decidir quedarse en tu web", c: "#ffab40" },
          { num: "+340%", label: "más conversión con experiencia 3D", c: "var(--accent)" },
          { num: "53%", label: "abandona si carga más de 3 segundos", c: "#ff5252" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "var(--surface)", border: "1px solid var(--border2)",
            borderRadius: "var(--r12)", padding: "1.25rem", textAlign: "center"
          }}>
            <div style={{ fontFamily: "var(--fh)", fontSize: "1.9rem", fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: ".72rem", color: "var(--muted)", marginTop: ".35rem" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div ref={r3} className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
        {/* Chart 1: Pérdidas por sector */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r16)", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".9rem", marginBottom: ".25rem" }}>Pérdida estimada sin web</div>
          <div style={{ fontSize: ".7rem", color: "var(--muted)", marginBottom: "1rem" }}>por sector · COP millones/mes</div>
          <div ref={progRef} style={{ display: "flex", flexDirection: "column", gap: ".875rem" }}>
            {perdidas.map((p, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", marginBottom: ".25rem" }}>
                  <span style={{ color: "var(--muted)" }}>{p.sector}</span>
                  <span style={{ color: "#ff5252", fontWeight: 600 }}>${p.val}M</span>
                </div>
                <div className="prog-bar">
                  <div className={`prog-fill${progOn ? " in" : ""}`}
                    style={{ width: `${(p.val / max) * 100}%`, transitionDelay: `${i * 0.12}s`, background: "linear-gradient(90deg,#ff5252,#ff8a80)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Abandono por velocidad */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r16)", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".9rem", marginBottom: ".25rem" }}>Abandono por velocidad del sitio</div>
          <div style={{ fontSize: ".7rem", color: "var(--muted)", marginBottom: "1rem" }}>% usuarios que se van según tiempo de carga</div>
          <MiniLineChart data={[9, 20, 38, 53, 62, 78, 90]} color="#ff5252" />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".65rem", color: "var(--muted)", marginTop: ".5rem" }}>
            <span>1s</span><span>2s</span><span>3s</span><span>4s</span><span>5s</span><span>7s</span><span>10s</span>
          </div>
          <div style={{ marginTop: ".75rem", padding: ".6rem .75rem", background: "rgba(255,82,82,.08)", border: "1px solid rgba(255,82,82,.2)", borderRadius: "var(--r8)", fontSize: ".73rem", color: "#ff8a80", display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={14} /> 53% abandona si tu web carga más de 3 segundos
          </div>
        </div>

        {/* Chart 3: Conversión 3D vs plana */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r16)", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".9rem", marginBottom: ".25rem" }}>Conversión: Plana vs 3D</div>
          <div style={{ fontSize: ".7rem", color: "var(--muted)", marginBottom: "1rem" }}>tasa de conversión promedio</div>
          <MiniBarChart
            data={[1.2, 2.8, 5.4]}
            labels={["Plana", "Optim.", "3D Evocore"]}
            color="var(--accent)"
          />
          <div style={{ marginTop: ".75rem", padding: ".6rem .75rem", background: "var(--accent-dim)", border: "1px solid rgba(0,229,160,.2)", borderRadius: "var(--r8)", fontSize: ".73rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} /> Evocore 96 entrega hasta 5.4% de conversión — 4.5× más que una web plana
          </div>
        </div>

        {/* Chart 4: Tiempo manual vs automatizado */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r16)", padding: "1.5rem" }}>
          <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".9rem", marginBottom: ".25rem" }}>Manual vs Automatizado</div>
          <div style={{ fontSize: ".7rem", color: "var(--muted)", marginBottom: "1rem" }}>tiempo en gestión de envíos por pedido</div>
          {[
            { label: "Proceso manual", val: 92, pct: 100, c: "#ff5252", bg: "rgba(255,82,82,.15)" },
            { label: "Con automatización", val: 3, pct: 3.3, c: "var(--accent)", bg: "var(--accent-dim)" },
          ].map((row, i) => (
            <div key={i} style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", marginBottom: ".3rem" }}>
                <span style={{ color: "var(--muted)" }}>{row.label}</span>
                <span style={{ color: row.c, fontWeight: 700 }}>{row.val} min</span>
              </div>
              <div style={{ height: 8, borderRadius: "var(--r999)", background: "var(--surface2)", overflow: "hidden" }}>
                <div className={`prog-fill${progOn ? " in" : ""}`}
                  style={{ height: "100%", width: `${row.pct}%`, background: row.c, transitionDelay: `${i * .2}s` }} />
              </div>
            </div>
          ))}
          <div style={{ padding: ".6rem .75rem", background: "var(--accent-dim)", border: "1px solid rgba(0,229,160,.2)", borderRadius: "var(--r8)", fontSize: ".73rem", color: "var(--accent)", display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} /> La automatización reduce el tiempo en un 97% por pedido
          </div>
        </div>
      </div>
    </Sec>
  );
}

/* — SERVICIOS — */
function Servicios() {
  const r1 = useReveal(0);
  const services = [
    { icon: <ShoppingCart size={32} />, title: "E-commerce Pro", desc: "Tiendas ultra optimizadas en Shopify, WordPress/WooCommerce y Next.js. Velocidad, UX y conversión como prioridad.", tags: ["Shopify", "WordPress", "Next.js"] },
    { icon: <Gamepad2 size={32} />, title: "Experiencias 3D (Evocore 96)", desc: "Motor de modelado 3D en tiempo real. Tus usuarios personalizan el producto desde el navegador antes de comprar.", tags: ["Three.js", "WebGL", "Personalización"] },
    { icon: <Zap size={32} />, title: "Automatización Logística", desc: "Integración con Coordinadora, Envía, Servientrega y TCC. Guías automáticas, tarifas en tiempo real.", tags: ["n8n", "APIs", "Transportadoras"] },
    { icon: <Bot size={32} />, title: "Contenido con IA", desc: "Imágenes, copy y estrategia digital generados con inteligencia artificial. Tu marca siempre activa.", tags: ["Midjourney", "GPT", "Canva AI"] },
    { icon: <BarChart3 size={32} />, title: "Análisis & BI", desc: "Dashboards en Power BI, SQL y Excel avanzado para tomar decisiones con datos reales en tiempo real.", tags: ["Power BI", "SQL", "ETL"] },
    { icon: <Search size={32} />, title: "SEO & Marketing Digital", desc: "Posicionamiento orgánico, Google Ads y estrategia de contenido para asegurar visibilidad sostenible.", tags: ["SEO", "Google Ads", "Analytics"] },
  ];
  return (
    <Sec id="servicios" bg="var(--bg)">
      <div className="reveal" ref={r1}>
        <Tag>Servicios · Lo que construyo para ti</Tag>
        <H2>Soluciones <span style={{ color: "var(--accent)" }}>Full-Stack</span> integrales</H2>
        <p style={{ color: "var(--muted)", maxWidth: 580, fontSize: ".97rem", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
          "Diseñamos experiencias donde el usuario toma el control, integrando pasarelas seguras y flujos de conversión optimizados. Una solución escalable para marcas que no se detienen."
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
        {services.map((s, i) => {
          const ref = useReveal(i * 80);
          return (
            <div key={i} ref={ref} className="reveal" style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "var(--r16)", padding: "1.75rem",
              transition: "border-color .25s, transform .25s",
              cursor: "default"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,160,.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ color: "var(--accent)", marginBottom: ".875rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: "1rem", marginBottom: ".5rem" }}>{s.title}</div>
              <div style={{ fontSize: ".83rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1rem" }}>{s.desc}</div>
              <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                {s.tags.map(t => (
                  <span key={t} style={{ background: "var(--surface2)", border: "1px solid var(--border)", padding: ".2rem .6rem", borderRadius: "var(--r999)", fontSize: ".65rem", color: "var(--muted)", fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

/* — EVOCORE — */
function Evocore() {
  const rL = useReveal(0), rR = useReveal(150);
  return (
    <Sec id="evocore" bg="var(--bg2)">
      <div className="reveal" ref={rL}>
        <Tag>Innovación Disruptiva · Ventaja Competitiva Indestructible</Tag>
        <H2>Evocore 96: El comercio del <span style={{ color: "var(--accent)" }}>futuro no es plano</span></H2>
        <p style={{ color: "var(--muted)", maxWidth: 560, fontSize: ".97rem", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
          Tecnología propietaria de modelado 3D en tiempo real para la web. Desarrollado para Evolet 96. Esto te separa del 99% de los desarrolladores comunes.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="evocore-grid">
        {/* Canvas demo */}
        <div className="reveal-scale" ref={useReveal(0)} style={{
          background: "var(--surface)", border: "1px solid var(--border2)",
          borderRadius: "var(--r20)", minHeight: 400,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", position: "relative", overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", fontSize: ".65rem", fontWeight: 700, color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}><Hexagon size={12} /> Evocore 96 · Render Engine</div>
          {/* 3D rings animation */}
          <div style={{ width: 240, height: 240, position: "relative" }}>
            {[
              { size: 240, color: "rgba(0,229,160,.2)", dur: "9s", dir: "normal" },
              { size: 190, color: "rgba(0,184,255,.18)", dur: "13s", dir: "reverse" },
              { size: 140, color: "rgba(0,229,160,.3)", dur: "7s", dir: "normal" },
              { size: 90, color: "rgba(0,184,255,.4)", dur: "5s", dir: "reverse" },
            ].map((r, i) => (
              <div key={i} style={{
                position: "absolute", borderRadius: "50%", border: `1px solid ${r.color}`,
                width: r.size, height: r.size,
                top: (240 - r.size) / 2, left: (240 - r.size) / 2,
                animation: `${r.dir === "normal" ? "spinRing" : "spinRingR"} ${r.dur} linear infinite`
              }} />
            ))}
            <div style={{
              position: "absolute", inset: 92,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, rgba(0,229,160,.6), rgba(0,184,255,.3) 60%, transparent)",
              border: "1px solid rgba(0,229,160,.5)"
            }} />
            <div style={{
              position: "absolute", width: 8, height: 8, background: "var(--accent)",
              borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              boxShadow: "0 0 16px var(--accent)", animation: "pulseDot 2s infinite"
            }} />
          </div>
          {/* Controls */}
          <div style={{ display: "flex", gap: ".5rem", marginTop: "1.5rem" }}>
            {[
              { label: "Rotar", icon: <RotateCw size={12} /> },
              { label: "Zoom", icon: <Plus size={12} /> },
              { label: "Color", icon: <Palette size={12} /> },
              { label: "Talla", icon: <Ruler size={12} /> }
            ].map(c => (
              <button key={c.label} style={{
                background: "var(--surface2)", border: "1px solid var(--border2)",
                borderRadius: "var(--r8)", padding: ".35rem .7rem",
                fontSize: ".65rem", color: "var(--muted)", cursor: "pointer",
                transition: "all .2s", fontFamily: "var(--fb)",
                display: "flex", alignItems: "center", gap: "4px"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,160,.4)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted)"; }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "1.25rem", right: "1.25rem", fontSize: ".62rem", color: "var(--muted)" }}>Three.js · WebGL · Real-time</div>
        </div>

        {/* Content */}
        <div className="reveal-right" ref={rR}>
          <h3 style={{ fontFamily: "var(--fh)", fontSize: "1.4rem", fontWeight: 800, marginBottom: "1rem" }}>
            Desarrollado para{" "}
            <a href="https://evolet96.com" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}>
              Evolet 96 →
            </a>
          </h3>
          <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Permitimos que los usuarios modelen, personalicen e interactúen con sus prendas o productos directamente desde el navegador antes de comprar. El siguiente nivel de la experiencia de usuario.
          </p>
          {/* Metric highlight */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r12)", padding: "1.25rem", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: ".7rem", color: "var(--accent)", fontWeight: 700, letterSpacing: ".08em", marginBottom: ".4rem" }}>↑ IMPACTO MEDIDO</div>
            <div style={{ fontFamily: "var(--fh)", fontSize: "2.2rem", fontWeight: 800, color: "var(--accent)" }}>+340%</div>
            <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>mejora en tasa de conversión con experiencias 3D interactivas vs fotos planas</div>
          </div>
          {/* Tags */}
          <div style={{ marginBottom: "1.5rem" }}>
            {[
              { label: "Modelado 3D real-time", icon: <Gamepad2 size={12} /> },
              { label: "WebGL / Three.js", icon: <Zap size={12} /> },
              { label: "Personalización", icon: <Palette size={12} /> },
              { label: "Sin plugins", icon: <Zap size={12} /> },
              { label: "Responsive", icon: <Globe size={12} /> },
              { label: "Integrado con checkout", icon: <ShoppingCart size={12} /> }
            ].map(t => (
              <span key={t.label} style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                background: "var(--surface2)", border: "1px solid var(--border)",
                padding: ".3rem .75rem", borderRadius: "var(--r999)", fontSize: ".7rem",
                color: "var(--muted)", margin: ".25rem", transition: "all .2s", cursor: "default"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,160,.35)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
                {t.icon} {t.label}
              </span>
            ))}
          </div>
          <a href="https://evolet96.com" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              padding: ".75rem 1.4rem", background: "var(--accent-dim)",
              border: "1px solid rgba(0,229,160,.25)", borderRadius: "var(--r8)",
              color: "var(--accent)", textDecoration: "none", fontSize: ".85rem", fontWeight: 700,
              transition: "all .25s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,160,.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--accent-dim)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <Rocket size={16} /> Ver demo en vivo · evolet96.com
          </a>
        </div>
      </div>
      <style>{`.evocore-grid{@media(max-width:700px){grid-template-columns:1fr!important}}`}</style>
    </Sec>
  );
}

/* — LOGÍSTICA — */
function Logistica() {
  const r1 = useReveal(0), r2 = useReveal(150);
  const nodes = [
    { icon: <ShoppingCart size={18} />, title: "Orden de compra", sub: "Cliente confirma el pedido" },
    { icon: <CreditCard size={18} />, title: "Pasarela de pagos", sub: "Wompi · PayU · Stripe · MercadoPago" },
    { icon: <Zap size={18} />, title: "Automatización n8n", sub: "Disparo automático del flujo logístico" },
    { icon: <Package size={18} />, title: "Generación de guía", sub: "API transportadora · sin intervención humana" },
    { icon: <BarChart3 size={18} />, title: "Panel de administración", sub: "Trazabilidad y análisis en tiempo real" },
  ];
  return (
    <Sec id="logistica" bg="var(--bg)">
      <div className="reveal" ref={r1}>
        <Tag>Backend & Automatización · +1 año de experiencia real</Tag>
        <H2>Eficiencia Full-Stack:<br /><span style={{ color: "var(--accent2)" }}>Cero errores manuales</span></H2>
        <p style={{ color: "var(--muted)", maxWidth: 560, fontSize: ".97rem", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
          Automatizamos tu proceso de envíos conectando tu plataforma directamente con las principales transportadoras. Tú vendes, el sistema hace el resto.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }} className="logi-grid">
        {/* Flow diagram */}
        <div className="reveal-left" ref={r2} style={{ display: "flex", flexDirection: "column" }}>
          {nodes.map((n, i) => (
            <div key={i}>
              <div className="flow-node">
                <div style={{ width: 40, height: 40, borderRadius: "var(--r8)", background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)", flexShrink: 0 }}>{n.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".88rem" }}>{n.title}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--muted)" }}>{n.sub}</div>
                </div>
                <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              </div>
              {i < nodes.length - 1 && (
                <div style={{ width: 2, height: 20, background: "linear-gradient(var(--accent),var(--accent2))", margin: "0 0 0 19px", opacity: .4 }} />
              )}
            </div>
          ))}
        </div>
        {/* Right */}
        <div className="reveal-right" ref={useReveal(200)}>
          <h3 style={{ fontFamily: "var(--fh)", fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: "1rem" }}>Transportadoras integradas</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem", marginBottom: "1.75rem" }}>
            {[["#0056b3", "Coordinadora"], ["#28a745", "Envía"], ["#dc3545", "Servientrega"], ["#ffc107", "TCC"]].map(([color, name]) => (
              <div key={name} style={{
                background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: "var(--r12)",
                padding: ".9rem 1rem", display: "flex", alignItems: "center", gap: ".75rem",
                fontSize: ".85rem", fontWeight: 600, transition: "all .25s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,184,255,.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />{name}
              </div>
            ))}
          </div>
          <h3 style={{ fontFamily: "var(--fh)", fontSize: "1rem", fontWeight: 700, color: "var(--muted)", marginBottom: ".875rem" }}>Plataformas manejadas</h3>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
            {["WordPress", "Shopify", "Next.js", "Python", "n8n"].map((name) => (
              <div key={name} style={{
                background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "var(--r8)",
                padding: ".5rem 1rem", fontSize: ".78rem", fontWeight: 600, color: "var(--muted)",
                display: "flex", alignItems: "center", gap: ".4rem", transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,160,.3)"; e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
                {name}
              </div>
            ))}
          </div>
          <a href="https://wa.me/573183414381?text=Hola%20Carlos,%20quiero%20agendar%20mi%20cita%20virtual%20gratuita"
            target="_blank" rel="noopener noreferrer" className="btn-p">
            <Calendar size={16} /> Agenda tu cita virtual gratis →
          </a>
        </div>
      </div>
      <style>{`.logi-grid{@media(max-width:700px){grid-template-columns:1fr!important}}`}</style>
    </Sec>
  );
}

/* — TECH STACK — */
const techData = [
  { name: "React", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "JavaScript", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "CSS3", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "WordPress", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Shopify", cat: "frontend", icon: "" },
  { name: "Three.js", cat: "frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Python", cat: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "PHP", cat: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Java", cat: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Supabase", cat: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "REST APIs", cat: "backend", icon: "" },
  { name: "SQL Server", cat: "data", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
  { name: "MySQL", cat: "data", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Power BI", cat: "data", icon: "" },
  { name: "Excel Avanzado", cat: "data", icon: "" },
  { name: "Power Query", cat: "data", icon: "" },
  { name: "ETL", cat: "data", icon: "" },
  { name: "n8n", cat: "auto", icon: "" },
  { name: "Selenium", cat: "auto", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
  { name: "VBA / Macros", cat: "auto", icon: "" },
  { name: "Git", cat: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "VS Code", cat: "tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "A2 ERP", cat: "tools", icon: "" },
];

function TechStack() {
  const [filter, setFilter] = useState("all");
  const r1 = useReveal(0);
  const cats = [
    { id: "all", label: "Todo" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "data", label: "Data & BI" },
    { id: "auto", label: "Automatización" },
    { id: "tools", label: "Herramientas" },
  ];
  const filtered = filter === "all" ? techData : techData.filter(t => t.cat === filter);
  return (
    <Sec id="techstack" bg="var(--bg2)">
      <div className="reveal" ref={r1}>
        <Tag>Arsenal técnico · Tecnologías que domino</Tag>
        <H2>Stack <span style={{ color: "var(--accent)" }}>completo</span> y probado</H2>
      </div>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", margin: "1.75rem 0 1.5rem" }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => setFilter(c.id)} style={{
            background: filter === c.id ? "var(--accent-dim)" : "transparent",
            border: `1px solid ${filter === c.id ? "rgba(0,229,160,.3)" : "var(--border)"}`,
            color: filter === c.id ? "var(--accent)" : "var(--muted)",
            padding: ".45rem 1rem", borderRadius: "var(--r999)",
            fontSize: ".78rem", fontWeight: 500, cursor: "pointer",
            transition: "all .2s", fontFamily: "var(--fb)"
          }}>{c.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(115px,1fr))", gap: ".75rem" }}>
        {filtered.map((t, i) => (
          <div key={t.name} className="tech-card reveal" ref={useReveal(i * 40)}
            style={{ transitionDelay: `${i * 40}ms` }}>
            <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {t.icon ? (
                <img src={t.icon} alt={t.name} style={{ width: 34, height: 34, objectFit: "contain" }}
                  onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              ) : (
                <div style={{ width: 34, height: 34, borderRadius: "var(--r8)", background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                  <Zap size={20} />
                </div>
              )}
              {t.icon && <div style={{ width: 34, height: 34, borderRadius: "var(--r8)", background: "var(--surface2)", display: "none", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}><Zap size={20} /></div>}
            </div>
            <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".72rem", color: "var(--text)", textAlign: "center" }}>{t.name}</div>
            <div style={{ fontSize: ".6rem", color: "var(--muted)" }}>
              {{ frontend: "Frontend", backend: "Backend", data: "Data", auto: "Auto", tools: "Tools" }[t.cat]}
            </div>
          </div>
        ))}
      </div>
    </Sec>
  );
}

/* — CERTIFICACIONES — */
function Certs() {
  const r1 = useReveal(0);
  const certs = [
    { year: "2024", title: "Full-Stack Web Development", issuer: "React · Next.js · Node.js · Bases de Datos" },
    { year: "2024", title: "E-commerce & Shopify Expert", issuer: "Integración de pagos · Logística · Conversión" },
    { year: "2023", title: "Automatización con n8n & Python", issuer: "Workflows · APIs · Selenium WebDriver" },
    { year: "2023", title: "SEO & Marketing Digital", issuer: "Posicionamiento orgánico · Google Ads · Analytics" },
    { year: "2023", title: "Power BI & Data Analytics", issuer: "SQL · Power Query · ETL · Visualización de datos" },
    { year: "2024", title: "Inteligencia Artificial Aplicada", issuer: "Generación de contenido · Automatización con IA" },
  ];
  return (
    <Sec id="certs" bg="var(--bg)">
      <div className="reveal" ref={r1}>
        <Tag>Formación & Certificaciones</Tag>
        <H2>Conocimiento <span style={{ color: "var(--accent2)" }}>validado</span></H2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.1rem", marginTop: "2rem" }}>
        {certs.map((c, i) => {
          const ref = useReveal(i * 80);
          return (
            <div key={i} ref={ref} className="cert-card reveal">
              <div style={{ position: "absolute", top: "1.1rem", right: "1.1rem", fontSize: ".68rem", color: "var(--muted)" }}>{c.year}</div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: ".35rem",
                background: "var(--accent-dim)", border: "1px solid rgba(0,229,160,.2)",
                padding: ".22rem .65rem", borderRadius: "var(--r999)",
                fontSize: ".62rem", fontWeight: 700, color: "var(--accent)", marginBottom: ".75rem",
                display: "flex", alignItems: "center", gap: "4px"
              }}><Sparkles size={10} /> Certificado</div>
              <div style={{ fontFamily: "var(--fh)", fontWeight: 700, fontSize: ".92rem", marginBottom: ".3rem" }}>{c.title}</div>
              <div style={{ fontSize: ".75rem", color: "var(--muted)" }}>{c.issuer}</div>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

/* — CTA FINAL — */
function CTA() {
  const r1 = useReveal(0);
  return (
    <Sec id="cta" bg="var(--bg2)" style={{ paddingBottom: "6rem" }}>
      <div className="glow-teal" style={{ width: 600, height: 400, bottom: -100, left: "50%", transform: "translateX(-50%)" }} />
      <div className="reveal" ref={r1} style={{ textAlign: "center", maxWidth: 680, margin: "0 auto", position: "relative" }}>
        <Tag>¿Listo para el siguiente nivel?</Tag>
        <h2 style={{
          fontFamily: "var(--fh)", fontWeight: 800, letterSpacing: "-.03em",
          lineHeight: 1.08, marginBottom: "1.25rem",
          fontSize: "clamp(2rem,5vw,3.4rem)"
        }}>
          Transforma tu <span style={{ color: "var(--accent)" }}>infraestructura digital</span> hoy
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "1rem", marginBottom: "2.5rem", lineHeight: 1.8, fontWeight: 300 }}>
          Hablemos sobre cómo implementar automatización y tecnología interactiva en tu modelo de negocio.<br />
          La cita de diagnóstico es <strong style={{ color: "var(--text)" }}>completamente gratis</strong>.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/573183414381?text=Hola%20Carlos,%20quiero%20agendar%20mi%20cita%20virtual%20gratuita"
            target="_blank" rel="noopener noreferrer" className="btn-p" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
            <Calendar size={20} /> Agenda tu cita gratis
          </a>
          <a href="mailto:carlosestecnologia@gmail.com" className="btn-s" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
            <Mail size={20} /> carlosestecnologia@gmail.com
          </a>
        </div>
        {/* Social */}
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {[
            { label: "GitHub", href: "https://github.com", icon: (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
            ) },
            { label: "LinkedIn", href: "https://linkedin.com", icon: (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.896 1.639-1.841 3.388-1.841 3.621 0 4.29 2.382 4.29 5.485v6.247zM5.338 7.433c-1.144 0-2.063-.92-2.063-2.057 0-1.137.919-2.057 2.063-2.057 1.143 0 2.062.92 2.062 2.057 0 1.137-.919 2.057-2.062 2.057zM7.115 20.452H3.561V9h3.554v11.452z" />
              </svg>
            ) },
            { label: "evolet96.com", href: "https://evolet96.com", icon: <Globe size={14} /> },
            { label: "WhatsApp", href: "https://wa.me/573183414381", icon: <Phone size={14} /> },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              background: "var(--surface)", border: "1px solid var(--border2)",
              padding: ".55rem 1.1rem", borderRadius: "var(--r8)",
              color: "var(--muted)", textDecoration: "none", fontSize: ".8rem", fontWeight: 500,
              transition: "all .2s", display: "flex", alignItems: "center", gap: ".4rem"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,229,160,.35)"; e.currentTarget.style.color = "var(--text)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted)"; }}>
              <span style={{ color: "var(--accent)", display: "flex" }}>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>
        {/* Footer bottom */}
        <div style={{ borderTop: "1px solid var(--border)", marginTop: "3.5rem", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: ".75rem", color: "var(--muted)", textAlign: "left" }}>
          <span>© 2025 Carlos Riaño · Full-Stack Developer & E-commerce Specialist</span>
          <span>📍 Bogotá, Colombia</span>
        </div>
      </div>
    </Sec>
  );
}

/* — WHATSAPP FLOAT — */
function WAFloat() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".5rem" }}>
      {hov && (
        <div style={{
          background: "var(--surface2)", border: "1px solid var(--border2)",
          padding: ".5rem 1rem", borderRadius: "var(--r8)",
          fontSize: ".75rem", color: "var(--text)", whiteSpace: "nowrap",
          animation: "fadeUp .2s both",
          display: "flex", alignItems: "center", gap: "6px"
        }}>
          <MessageSquare size={14} /> Chatea con Carlos ahora
        </div>
      )}
      <a href="https://wa.me/573183414381?text=Hola%20Carlos,%20vi%20tu%20portafolio%20y%20me%20interesa%20saber%20más"
        target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          width: 58, height: 58, borderRadius: "50%",
          background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", transition: "transform .3s",
          animation: "waFloat 3s infinite",
          transform: hov ? "scale(1.1)" : "scale(1)"
        }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════════════════ */
export default function App() {
  const [profileImg, setProfileImg] = useState(perfilImg);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "problema", "servicios", "evocore", "logistica", "techstack", "certs", "cta"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Nav activeSection={activeSection} />
      <main>
        <Hero profileImg={profileImg} />
        <Problema />
        <Servicios />
        <Evocore />
        <Logistica />
        <TechStack />
        <Certs />
        <CTA />
      </main>
      <WAFloat />
    </>
  );
}