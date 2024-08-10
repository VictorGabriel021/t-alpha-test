import styled from "styled-components";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const Card = styled.div`
  background: #fff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  padding: 30px;
  width: -webkit-fill-available;
`;

export const Content = styled.div`
  min-height: calc(-165.8px + 100vh);
  display: flex;
  justify-content: center;
  margin: 20px;
`;

export const EditIconCustom = styled(EditIcon)`
  color: #1976d2;
  cursor: pointer;

  &:hover {
    color: #1565c0;
  }
`;

export const DeleteIconCustom = styled(DeleteIcon)`
  color: #d22d2d;
  cursor: pointer;

  &:hover {
    color: #a22424;
  }
`;
