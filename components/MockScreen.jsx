const MockScreen = ({ color, index, imageUrl }) => {
  if (imageUrl) {
    return <img src={imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  }

  const offsetY = (index * 37) % 60;
  const offsetX = (index * 53) % 40;

  return (
    <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="600" height="360" fill="#0a0e1a" />

      {/* Sidebar */}
      <rect width="110" height="360" fill={color} opacity=".18" />
      <rect x="14" y="20" width="82" height="11" rx="4" fill={color} opacity=".5" />
      {[52, 78, 104, 130, 156, 182].map((y, i) => (
        <rect key={y} x="14" y={y} width={i === 0 ? 82 : 64} height="8" rx="3" fill={i === 0 ? color : "#fff"} opacity={i === 0 ? 0.65 : 0.1} />
      ))}

      {/* Top bar */}
      <rect x="110" y="0" width="490" height="44" fill="#fff" opacity=".04" />
      <rect x="126" y="14" width={100 + offsetX} height="10" rx="4" fill="#fff" opacity=".11" />
      <rect x={490 - offsetX} y="12" width="90" height="14" rx="5" fill={color} opacity=".7" />

      {/* Stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={126 + i * 122} y={62 + offsetY * 0.3} width="112" height="62" rx="8" fill="#fff" opacity=".05" />
          <rect x={140 + i * 122} y={74 + offsetY * 0.3} width="66" height="8" rx="3" fill="#fff" opacity=".14" />
          <rect x={140 + i * 122} y={90 + offsetY * 0.3} width="44" height="18" rx="4" fill={color} opacity=".55" />
        </g>
      ))}

      {/* Main table */}
      <rect x="126" y={140 + offsetY * 0.2} width="458" height="196" rx="8" fill="#fff" opacity=".04" />
      <rect x="142" y={154 + offsetY * 0.2} width="430" height="10" rx="3" fill="#fff" opacity=".06" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="142" y={174 + offsetY * 0.2 + i * 26} width={160 + ((i * 41 + offsetX) % 100)} height="7" rx="3" fill="#fff" opacity=".09" />
          <rect x="360" y={174 + offsetY * 0.2 + i * 26} width="88" height="7" rx="3" fill={i === 1 || i === 3 ? color : "#fff"} opacity={i === 1 || i === 3 ? 0.5 : 0.07} />
          <rect x="468" y={174 + offsetY * 0.2 + i * 26} width="50" height="7" rx="3" fill="#fff" opacity=".06" />
        </g>
      ))}

      {/* Accent bar */}
      <rect x="110" y="0" width="3" height="360" fill={color} opacity=".3" />
      <text x="590" y="350" textAnchor="end" fontSize="10" fill="#fff" opacity=".15" fontFamily="monospace">
        {index + 1}
      </text>
    </svg>
  );
};

export default MockScreen;
