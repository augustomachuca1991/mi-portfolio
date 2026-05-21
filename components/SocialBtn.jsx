import React from "react";

const SocialBtn = ({ href, label, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid #e3e3df",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        transition: "border-color .2s, box-shadow .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#1a1a1a";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e3e3df";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
};

export default SocialBtn;
