import { ReactNode } from "react";

import { Link } from "react-router-dom";

import { Alert, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Container, ButtonContainer } from "./styles";

interface IResourceFound {
  children: ReactNode;
  color?: "error" | "info" | "success" | "warning";
}

const ResourceFound = ({ children, color = "error" }: IResourceFound) => {
  return (
    <Container>
      <ErrorOutlineIcon color={color} style={{ fontSize: 180 }} />

      <Alert icon={false} variant="outlined" severity={color}>
        {children}
      </Alert>

      <Link to="/">
        <ButtonContainer>
          <Button variant="contained" color="primary">
            Voltar para Home
          </Button>
        </ButtonContainer>
      </Link>
    </Container>
  );
};

export default ResourceFound;
