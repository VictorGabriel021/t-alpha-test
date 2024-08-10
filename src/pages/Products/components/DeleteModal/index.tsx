import { useEffect, useState } from "react";

import { ButtonContainer } from "./styles";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Button, CircularProgress } from "@mui/material";

import StyledModal from "shared/components/Modal";

import { IBodyProduct } from "shared/types/body/products";

import {
  abortControllerHandler,
  getAbortController,
} from "shared/utils/functions/abortController";
import ProductService from "shared/services/products";

const { deleteProduct } = ProductService();

interface IDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  fetchList: () => void;
  selectedProduct: IBodyProduct | undefined;
}

const DeleteModal: React.FC<IDeleteModalProps> = ({
  open,
  handleClose,
  fetchList,
  selectedProduct,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>();

  const onDeleteHandler = async () => {
    const controller = getAbortController(setAbortController);
    setIsLoading(true);

    const deleteSuccess = await deleteProduct(
      selectedProduct?.id as number,
      controller
    );

    if (deleteSuccess) {
      handleClose();
      fetchList();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      abortControllerHandler(abortController);
    };
  }, [abortController]);

  return (
    <StyledModal open={open} onClose={handleClose}>
      <div style={{ textAlign: "center" }}>
        <ErrorOutlineIcon color={"error"} style={{ fontSize: 180 }} />
        <h2>Você deseja deletar o Produto {selectedProduct?.name} ?</h2>
        <p style={{ marginTop: 8 }}>
          Esta ação não poderá ser revertida futuramente.
        </p>

        <ButtonContainer>
          <Button variant="text" disabled={isLoading} onClick={handleClose}>
            Fechar
          </Button>
          <Button
            onClick={onDeleteHandler}
            variant="contained"
            disabled={isLoading}
            endIcon={
              isLoading && <CircularProgress color="inherit" size={18} />
            }
          >
            Deletar
          </Button>
        </ButtonContainer>
      </div>
    </StyledModal>
  );
};

export default DeleteModal;
