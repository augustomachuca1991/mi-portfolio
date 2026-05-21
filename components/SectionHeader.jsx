// components/SectionHeader.jsx

/**
 * Renders the standard two-line section heading used across all sections.
 *
 * @param {string}  label      - Small all-caps label above the title  (e.g. "PROYECTOS")
 * @param {string}  title      - Main serif title                       (e.g. "Proyectos")
 * @param {string}  [italic]   - Italic continuation of the title       (e.g. "full-stack.")
 * @param {string}  [desc]     - Optional subtitle paragraph
 * @param {string}  [className]
 */

const SectionHeader = ({ label, title, italic, desc, className = "" }) => {
  return (
    <div className={className}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: ".15em",
          color: "#888",
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 52,
          fontWeight: 400,
          color: "#1a1a1a",
          marginBottom: desc ? 8 : 0,
        }}
      >
        {title} {italic && <em style={{ fontStyle: "italic", fontWeight: 300, color: "#555" }}>{italic}</em>}
      </h2>
      {desc && <p style={{ fontSize: 15, color: "#777", maxWidth: 480 }}>{desc}</p>}
    </div>
  );
};

export default SectionHeader;
