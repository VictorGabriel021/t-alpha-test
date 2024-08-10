import { Button } from "@mui/material";

import { Container } from "./styles";

interface ITitleAndActionsProps {
  title: string;
  onCreateHandler: () => void;
}

const TitleAndActions = ({ title, onCreateHandler }: ITitleAndActionsProps) => {
  return (
    <Container>
      <h1>{title}</h1>

      <Button variant="contained" color="primary" onClick={onCreateHandler}>
        Cadastrar
      </Button>
    </Container>
  );
};

export default TitleAndActions;
