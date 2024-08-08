import ResourceFound from "shared/components/ResourceFound";

const NotFound = () => {
  return (
    <ResourceFound>
      <h1 style={{ marginBottom: 10 }}>Ops! Página Não Encontrada</h1>

      <p>Parece que você se perdeu... 😅</p>

      <p>A página que você está tentando acessar não existe ou foi movida.</p>
    </ResourceFound>
  );
};

export default NotFound;
