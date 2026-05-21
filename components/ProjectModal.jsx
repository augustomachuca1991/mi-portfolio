// components/ProjectModal.jsx
import { useState, useEffect, useCallback } from "react";
import MockScreen from "./MockScreen";
import Tag from "./Tag";
import ViewSiteLink from "./ViewSiteLink";

/* ── Internal nav arrow ── */
function NavArrow({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        [isLeft ? "left" : "right"]: 14,
        top: "50%",
        transform: "translateY(-50%)",
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "rgba(250,250,248,.92)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 12px rgba(0,0,0,.35)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

const ProjectModal = ({ project, lang, t, onClose }) => {
  const [current, setCurrent] = useState(0);
  const total = project.images?.length ?? 0;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(8,10,20,.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 800,
          background: "#fafaf8",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Browser chrome bar */}
        <div
          style={{
            background: "#f1f1ee",
            height: 42,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: "1px solid #e3e3df",
            flexShrink: 0,
            position: "relative",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <div onClick={onClose} title="Close" style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56", cursor: "pointer" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          </div>

          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 11, color: "#8a8a82", fontFamily: "monospace" }}>{project.url}</span>
            <span style={{ fontSize: 10, color: "#bbb", fontFamily: "monospace" }}>
              {current + 1} / {total}
            </span>
          </div>

          <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "#444", fontFamily: "'DM Serif Display',serif" }}>{project.title}</div>
        </div>

        {/* Image slider */}
        <div style={{ position: "relative", background: "#0a0e1a", flexShrink: 0, height: 340, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", transition: "opacity .3s" }}>
            <MockScreen color={project.imgColor} index={current} imageUrl={project.images[current]} />
          </div>

          <NavArrow direction="left" onClick={prev} />
          <NavArrow direction="right" onClick={next} />
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            background: "#f0eeeb",
            borderTop: "1px solid #e3e3df",
            padding: "10px 14px",
            display: "flex",
            gap: 8,
            overflowX: "auto",
            flexShrink: 0,
          }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: 76,
                height: 48,
                borderRadius: 6,
                overflow: "hidden",
                border: i === current ? "2.5px solid #1a1a1a" : "2.5px solid transparent",
                padding: 0,
                cursor: "pointer",
                flexShrink: 0,
                background: "#0a0e1a",
                transition: "border-color .2s, opacity .2s",
                opacity: i === current ? 1 : 0.55,
              }}
            >
              <MockScreen color={project.imgColor} index={i} imageUrl={project.images[i]} />
            </button>
          ))}
        </div>

        {/* Info bar */}
        <div
          style={{
            padding: "18px 22px",
            borderTop: "1px solid #e3e3df",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa" }}>#{project.number}</span>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 21, fontWeight: 400, color: "#1a1a1a" }}>{project.title}</h3>
              {project.live && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: "#e06931", letterSpacing: ".04em" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#e06931", animation: "blink 2s infinite" }} />
                  {t.live}
                </span>
              )}
              <ViewSiteLink url={project.url} label={t.viewSite} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: "#555", maxWidth: 440 }}>{project.description}</p>
          </div>

          <div style={{ flexShrink: 0, textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#aaa", marginBottom: 8 }}>
              {project.year} · {project.type}
            </div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
