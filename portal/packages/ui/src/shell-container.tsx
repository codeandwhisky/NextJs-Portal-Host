import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { MainNavigation } from "./main-navigation";

interface ShellContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const ShellContainer = (props: ShellContainerProps) => {
  const { children, title, subtitle } = props;

  return (
    <Container maxWidth={false} style={{padding: 0}}>
      <Box sx={{ flexGrow: 1 }}>
        <MainNavigation />
        <Typography variant="h4" marginY={2}>
          {title}
        </Typography>

        <Typography variant="subtitle1">
          {subtitle}
        </Typography>

        {children}
      </Box>
    </Container>
  );
};
