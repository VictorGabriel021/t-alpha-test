import React, { ReactNode } from "react";

import { Modal, Box } from "@mui/material";

import styled from "styled-components";

interface StyledModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 24;
  padding: 16px;

  @media (max-width: 450px) {
    width: 250px;
  }
`;

const StyledModal: React.FC<StyledModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalBox>{children}</ModalBox>
    </Modal>
  );
};

export default StyledModal;
