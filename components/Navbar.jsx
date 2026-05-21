import { useState } from "react";

const Navbar = ({ t, lang, setLang, scrolled, active, navIds, sectionRefs }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled || menuOpen ? "rgba(250,250,248,.95)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: "1px solid #e8e8e4",
          transition: "all .3s",
          padding: "0 24px",
          display: "flex",
          justifyContent: "center",
          height: 72,
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1120, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Brand */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
          >
            <div
              style={{
                background: "#1a1a1a",
                color: "#fafaf8",
                fontFamily: "'DM Serif Display',serif",
                fontSize: 15,
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
              }}
            >
              A
            </div>
            <span style={{ fontSize: 15, fontWeight: 500 }}>Augusto Machuca</span>
            <span style={{ color: "#aaa", fontSize: 13, fontFamily: "monospace" }}>/ {t.role}</span>
          </div>

          {/* Nav links — desktop */}
          <div className="nav-links-box" style={{ display: "flex", gap: 24 }}>
            {t.navItems.map((label, i) => (
              <span key={label} className={`nav-link${active === i ? " active" : ""}`} onClick={() => scrollTo(navIds[i])}>
                {label}
              </span>
            ))}
          </div>

          {/* Actions — desktop */}
          <div className="nav-actions-box" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LangToggle lang={lang} setLang={setLang} />
            <CvButton label={t.downloadCV} />
          </div>

          {/* Hamburger — mobile */}
          <button className="hamburger-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {t.navItems.map((label, i) => (
          <span key={label} className="mobile-nav-link" onClick={() => scrollTo(navIds[i])}>
            {label}
          </span>
        ))}
        <div className="mobile-actions">
          <LangToggle lang={lang} setLang={setLang} />
          <CvButton label={t.downloadCV} />
        </div>
      </div>
    </>
  );
};

export default Navbar;

/* ── Subcomponentes compartidos entre desktop y mobile ── */
function LangToggle({ lang, setLang }) {
  return (
    <div className="lang-toggle">
      <button className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>
        ES
      </button>
      <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>
        EN
      </button>
    </div>
  );
}

function CvButton({ label }) {
  return (
    <a href="/src/assets/curriculum/MachucaFernandoAugustoCV.pdf" target="_blank" rel="noopener noreferrer" download="MachucaFernandoAugustoCV.pdf">
      <button className="nav-btn-cv">
        {label}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </button>
    </a>
  );
}
