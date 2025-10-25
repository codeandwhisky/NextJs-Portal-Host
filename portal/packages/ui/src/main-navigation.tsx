import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

export const MainNavigation = () => {
  const menus = [
    { name: "Home", path: "/shell" },
    { name: "Estimator", path: "/home-estimation" },
    { name: "Analyser", path: "/home-market-analyser" },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shell
        </Typography>
        {menus.map((menu) => (
          <Button key={menu.name} color="inherit" href={menu.path}>
            {menu.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};
