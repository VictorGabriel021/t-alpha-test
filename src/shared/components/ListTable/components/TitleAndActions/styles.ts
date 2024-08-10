import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    flex-direction: column;

    div {
      margin-top: 10px;
    }
    button {
      width: 100%;
    }
  }
`;
