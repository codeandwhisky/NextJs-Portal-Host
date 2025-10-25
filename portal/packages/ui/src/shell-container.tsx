import { MainNavigation } from "./main-navigation";

interface ShellContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const ShellContainer = (props: ShellContainerProps) => {
  const { children, title, subtitle } = props;

  return (
    <div style={{ padding: 0, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MainNavigation />

        <div style={{ padding: "16px" }}>
          <h1 style={{ margin: "8px 0", fontSize: "1.5rem" }}>{title}</h1>
          <p style={{ margin: "4px 0 16px 0", color: "#555" }}>{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
};
