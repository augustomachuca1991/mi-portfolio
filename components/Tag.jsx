const Tag = ({ children, small = false }) => {
  return (
    <span className="tag" style={small ? { fontSize: 10, padding: "2px 7px" } : undefined}>
      {children}
    </span>
  );
};

export default Tag;
