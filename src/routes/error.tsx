import { useRouteError } from "react-router-dom";
import { Box, Container } from "@mui/material";

export function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Container>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </Box>
    </Container>
  );
}
