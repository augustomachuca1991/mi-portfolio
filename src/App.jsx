// Portfolio.jsx  — root component (orchestrator only)
import { useState, useEffect, useRef } from "react";

import "../styles/portfolio.css";

import { T } from "../data/translations";
import { STACK_GROUPS } from "../data/stack";
import PROJECTS_BASE from "../data/projects.json";

import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import SectionHeader from "../components/SectionHeader";
import Tag from "../components/Tag";
import SocialBtn from "../components/SocialBtn";

import emailjs from "@emailjs/browser";

const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

// Agregá este handler antes del return:

// ─── Constants ───────────────────────────────
const NAV_IDS = ["hero", "about", "stack", "websites", "contact"];

const { VITE_DEFAULT_LANG } = import.meta.env;

// ─── Portfolio ───────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState(VITE_DEFAULT_LANG ?? "en");
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const [modalProject, setModal] = useState(null);

  const sectionRefs = useRef({});
  const t = T[lang];
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState("idle"); // "idle" | "sending" | "success" | "error"

  // Merge static project data with translated copy
  const projects = PROJECTS_BASE.map((p, i) => ({
    ...p,
    title: t.projects[i].title,
    description: t.projects[i].description,
  }));

  // Scroll → nav highlight
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // IntersectionObserver → fade-in + active nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => ({ ...v, [e.target.id]: true }));
            const idx = NAV_IDS.indexOf(e.target.id);
            if (idx !== -1) setActive(idx);
          }
        }),
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormState("sending");
    try {
      await emailjs.send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        VITE_EMAILJS_PUBLIC_KEY
      );
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setFormState("error");
    }
  };

  const scrollTo = (id) => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });

  const ref = (id) => (r) => (sectionRefs.current[id] = r);
  const vis = (id, delay = "") => `fade-up${visible[id] ? " visible" : ""}${delay ? ` ${delay}` : ""}`;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#fafaf8",
        color: "#1a1a1a",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Modal ── */}
      {modalProject && <ProjectModal project={modalProject} lang={lang} t={t} onClose={() => setModal(null)} />}

      {/* ── Navbar ── */}
      <Navbar t={t} lang={lang} setLang={setLang} scrolled={scrolled} active={active} navIds={NAV_IDS} sectionRefs={sectionRefs} />

      <main
        style={{
          width: "100%",
          maxWidth: 1120,
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
        <section id="hero" ref={ref("hero")} style={{ minHeight: "100vh", padding: "140px 0 80px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              {/* Available badge */}
              <div
                className={vis("hero")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f1f1ee",
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid #e3e3df",
                  marginBottom: 32,
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: "#555" }}>{t.available}</span>
              </div>

              {/* Name */}
              <h1
                className={vis("hero", "d1")}
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 84,
                  lineHeight: 0.95,
                  color: "#1a1a1a",
                  marginBottom: 28,
                  fontWeight: 400,
                  letterSpacing: "-.02em",
                }}
              >
                {t.heroTitle}
                <span style={{ color: "#e06931" }}>.</span>
              </h1>

              <p className={vis("hero", "d2")} style={{ fontSize: 16, lineHeight: 1.7, color: "#444", maxWidth: 500, marginBottom: 14 }}>
                {t.heroDesc1}
              </p>
              <p className={vis("hero", "d2")} style={{ fontSize: 14, lineHeight: 1.7, color: "#777", maxWidth: 500, marginBottom: 36 }}>
                {t.heroDesc2}
              </p>

              {/* CTA buttons */}
              <div className={vis("hero", "d3")} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* <button className="btn-primary" onClick={() => scrollTo("websites")}>
                  {t.seeProjects}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button> */}
                <a
                  href="mailto:augustof.machuca@gmail.com"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    background: "#1a1a1a",
                    color: "#fafaf8",
                    padding: "12px 20px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 500,
                    width: "fit-content",
                    minWidth: 240,
                    transition: "background .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                >
                  augustof.machuca@gmail.com
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <button className="btn-outline" onClick={() => scrollTo("contact")}>
                  {t.contact}
                </button>
              </div>

              <div className={vis("hero", "d4")} style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: ".12em", color: "#aaa", fontWeight: 500, marginBottom: 10 }}>{lang === "es" ? "TAMBIÉN EN" : "ALSO ON"}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <SocialBtn href="https://www.linkedin.com/in/augusto-fernando-machuca/" label="LinkedIn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </SocialBtn>
                    <SocialBtn href="https://github.com/augustomachuca1991" label="GitHub">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a1a">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </SocialBtn>
                  </div>
                </div>
              </div>
            </div>

            {/* Identity card */}
            <div className={`hero-card ${vis("hero", "d2")}`} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e3e3df",
                  borderRadius: 16,
                  width: "100%",
                  maxWidth: 340,
                  padding: 24,
                  boxShadow: "0 12px 40px rgba(0,0,0,.03)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px dashed #e3e3df",
                    paddingBottom: 12,
                    marginBottom: 16,
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", letterSpacing: ".05em" }}>// IDENTITY</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, color: "#e06931" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e06931" }} />
                    LIVE
                  </span>
                </div>

                {/* Avatar placeholder */}
                <div
                  style={{
                    height: 200,
                    borderRadius: 10,
                    marginBottom: 20,
                    backgroundImage: "url('/profile/01.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    padding: 12,
                  }}
                >
                  {/* Overlay oscuro opcional para legibilidad */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 10,
                      background: "linear-gradient(to top, rgba(0,0,0,.1) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Fields */}
                {[
                  { l: "name", v: "Augusto Machuca" },
                  { l: "role", v: "Web Developer Fullstack" },
                  { l: "focus", v: "React · Vue 3 · Node.js" },
                  { l: "based", v: "Corrientes, AR" },
                ].map((row) => (
                  <div key={row.l} style={{ display: "flex", borderBottom: "1px solid #f1f1ee", paddingBottom: 8, marginBottom: 8, fontSize: 12 }}>
                    <span style={{ fontFamily: "monospace", color: "#aaa", width: 65, flexShrink: 0 }}>{row.l}</span>
                    <span style={{ color: "#222" }}>{row.v}</span>
                  </div>
                ))}

                <div style={{ display: "flex", fontSize: 12, paddingTop: 4 }}>
                  <span style={{ fontFamily: "monospace", color: "#aaa", width: 65, flexShrink: 0 }}>status</span>
                  <span style={{ color: "#e06931", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e06931" }} />
                    {t.openToWork}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            ABOUT / EXPERIENCE
        ══════════════════════════════════════ */}
        <section id="about" ref={ref("about")} style={{ padding: "100px 0" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1.8fr", gap: 64, alignItems: "start" }}>
            {/* About text (sticky) */}
            <div style={{ position: "sticky", top: 120 }}>
              <p className={vis("about")} style={{ fontSize: 11, letterSpacing: ".15em", color: "#888", marginBottom: 12, fontWeight: 500 }}>
                {t.aboutLabel}
              </p>
              <h2 className={vis("about", "d1")} style={{ fontFamily: "'DM Serif Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 24 }}>
                {t.aboutTitle}
                <br />
                <em style={{ fontStyle: "italic", color: "#777", fontWeight: 300 }}>{t.aboutSub}</em>
              </h2>
              <p className={vis("about", "d2")} style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 14 }}>
                {t.aboutP1}
              </p>
              <p className={vis("about", "d3")} style={{ fontSize: 15, lineHeight: 1.8, color: "#555" }}>
                {t.aboutP2}
              </p>
            </div>

            {/* Experience timeline */}
            <div>
              <p className={vis("about")} style={{ fontSize: 11, letterSpacing: ".15em", color: "#888", marginBottom: 12, fontWeight: 500 }}>
                {t.expLabel}
              </p>
              <h2 className={vis("about", "d1")} style={{ fontFamily: "'DM Serif Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 40 }}>
                {t.expTitle}
              </h2>

              <div style={{ position: "relative", borderLeft: "1px solid #e8e8e4", paddingLeft: 28, marginLeft: 6 }}>
                {t.exp.map((item, i) => (
                  <div key={i} className={vis("about", `d${i + 2}`)} style={{ marginBottom: i < t.exp.length - 1 ? 48 : 0, position: "relative" }}>
                    {/* Timeline dot */}
                    <div
                      style={{
                        position: "absolute",
                        width: item.current ? 11 : 9,
                        height: item.current ? 11 : 9,
                        background: item.current ? "#e06931" : "#1a1a1a",
                        borderRadius: "50%",
                        left: item.current ? -34 : -33,
                        top: 6,
                        border: "3px solid #fafaf8",
                      }}
                    />
                    <span style={{ fontSize: 12, color: item.current ? "#e06931" : "#8a8a82", fontWeight: item.current ? 600 : 500 }}>{item.date}</span>
                    <h3 style={{ fontSize: 19, fontWeight: 500, color: "#1a1a1a", marginTop: 4, marginBottom: 2 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: "#555", fontWeight: 500, marginBottom: item.sub ? 2 : 12 }}>{item.place}</p>
                    {item.sub && <p style={{ fontSize: 12, color: "#8a8a82", marginBottom: 12 }}>{item.sub}</p>}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
                      {item.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            STACK
        ══════════════════════════════════════ */}
        <section id="stack" ref={ref("stack")} style={{ padding: "100px 0" }}>
          <SectionHeader className={vis("stack")} label={t.stackLabel} title={t.stackTitle} italic={t.stackItalic} desc={t.stackDesc} />

          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 56 }}>
            {STACK_GROUPS.map((group, gi) => (
              <div
                key={group.cat}
                className={vis("stack", `d${gi + 1}`)}
                style={{
                  borderTop: "1px solid #e8e8e4",
                  padding: "32px 0",
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: 40,
                  alignItems: "start",
                }}
              >
                <div>
                  <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 24, fontWeight: 400, color: "#1a1a1a", marginBottom: 4 }}>{group.cat}</h3>
                  <span style={{ fontSize: 11, color: "#aaa", letterSpacing: ".06em", fontWeight: 500 }}>{group.count} ITEMS</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 10 }}>
                  {group.items.map((tech) => (
                    <div key={tech.name} className="stack-icon-card">
                      <div style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: tech.icon }} />
                      <span style={{ fontSize: 11, color: "#555", fontWeight: 500, textAlign: "center", lineHeight: 1.3 }}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════ */}
        <section id="websites" ref={ref("websites")} style={{ padding: "100px 0" }}>
          <SectionHeader className={`${vis("websites")} `} label={t.projLabel} title={t.projTitle} italic={t.projItalic} desc={t.projDesc} />

          <div className="websites-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 48 }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} t={t} className={vis("websites", `d${(i % 3) + 1}`)} onClick={() => setModal(project)} />
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ══════════════════════════════════════
            CONTACT
        ══════════════════════════════════════ */}
        <section id="contact" ref={ref("contact")} style={{ padding: "100px 0 140px" }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 11, letterSpacing: ".15em", color: "#888", marginBottom: 12, fontWeight: 500 }}>{t.contactLabel}</p>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 42, fontWeight: 400, marginBottom: 16 }}>{t.contactTitle}</h2>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.6, marginBottom: 32 }}>{t.contactDesc}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
              <input type="text" placeholder={t.yourName} className="contact-input" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
              <input type="email" placeholder={t.yourEmail} className="contact-input" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
              <textarea
                placeholder={t.yourMessage}
                className="contact-input"
                rows={4}
                style={{ resize: "vertical" }}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              />
            </div>

            <button className="btn-primary" onClick={handleSubmit} disabled={formState === "sending"} style={{ opacity: formState === "sending" ? 0.7 : 1 }}>
              {formState === "sending" ? "Enviando..." : t.send}
            </button>

            {formState === "success" && (
              <p style={{ marginTop: 14, fontSize: 13, color: "#10b981", fontWeight: 500 }}>✓ {lang === "es" ? "Mensaje enviado, te respondo pronto." : "Message sent, I'll get back to you soon."}</p>
            )}
            {formState === "error" && (
              <p style={{ marginTop: 14, fontSize: 13, color: "#e06931", fontWeight: 500 }}>✗ {lang === "es" ? "Algo salió mal, intentá de nuevo." : "Something went wrong, please try again."}</p>
            )}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid #e8e8e4",
          padding: "28px 24px",
          background: "#fafaf8",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1120, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: 18 }}>Augusto Machuca</span>
          <span style={{ fontSize: 12, color: "#aaa" }}>
            {t.footerRole} © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
