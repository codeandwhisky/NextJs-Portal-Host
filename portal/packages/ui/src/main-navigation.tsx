import * as React from "react";

export const MainNavigation: React.FC = () => {
  const menus = [
    { name: "Home", path: "/shell" },
    { name: "Estimator", path: "/home-estimation" },
    { name: "Analyser", path: "/home-market-analyser" },
  ];

  return (
    <header style={{ background: "#1976d2", color: "white" }}>
      <nav style={{ display: "flex", alignItems: "center", padding: "8px 16px" }}>
        <div style={{ marginRight: 12 }} aria-hidden>
          {/* placeholder for menu icon */}
          <button
            aria-label="menu"
            style={{
              background: "transparent",
              border: "none",
              color: "inherit",
              cursor: "pointer",
              padding: 8,
              fontSize: 18,
            }}
          >
            ☰
          </button>
        </div>

        <div style={{ fontWeight: 600, fontSize: 18, flex: 1 }}>Shell</div>

        <div style={{ display: "flex", gap: 8 }}>
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.path}
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "6px 10px",
                borderRadius: 4,
                background: "transparent",
              }}
            >
              {menu.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
