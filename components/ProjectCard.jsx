// components/ProjectCard.jsx
import MockScreen from "./MockScreen";
import Tag from "./Tag";
import ViewSiteLink from "./ViewSiteLink";

const ProjectCard = ({ project, t, className, onClick }) => {
  return (
    <div className={`window-card ${className ?? ""}`} onClick={onClick}>
      {/* Window chrome */}
      <div className="window-header">
        <div className="window-dots">
          <div className="window-dot" />
          <div className="window-dot" />
          <div className="window-dot" />
        </div>
        <div className="window-url">{project.url}</div>
      </div>

      {/* Preview */}
      <div style={{ position: "relative", background: "#0a0e1a", height: 160, flexShrink: 0, overflow: "hidden" }}>
        <MockScreen color={project.imgColor} index={0} imageUrl={project.images[0]} />
        <div className="card-overlay">
          <div
            style={{
              background: "#fafaf8",
              color: "#1a1a1a",
              fontSize: 12,
              fontWeight: 600,
              padding: "9px 18px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {t.clickToView}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 18px 22px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#aaa", marginBottom: 7 }}>#{project.number}</div>
        <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 21, fontWeight: 400, color: "#1a1a1a", marginBottom: 7 }}>{project.title}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "#555", marginBottom: 14, flexGrow: 1 }}>{project.description}</p>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
          {project.tags.map((tag) => (
            <Tag key={tag} small>
              {tag}
            </Tag>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 11,
            color: "#8a8a82",
            borderTop: "1px solid #f1f1ee",
            paddingTop: 12,
          }}
        >
          <span>
            {project.year} · {project.type}
          </span>
          <ViewSiteLink url={project.url} label={t.viewSite} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
