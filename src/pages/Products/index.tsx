import { useCallback, useEffect, useState } from "react";

import ListTable from "shared/components/ListTable";

import ProductForm from "./components/Form";

import { IBodyProduct, IBodyProductList } from "shared/types/body/products";

import ProductService from "shared/services/products";
import { abortControllerHandler } from "shared/utils/functions/abortController";

import StyledModal from "shared/components/Modal";

import DeleteModal from "./components/DeleteModal";
import { formatToBRL } from "shared/utils/functions/formatters";

export enum ICRUD {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

const columns = [
  { id: "name", label: "Nome" },
  { id: "price", label: "Preço" },
  { id: "stock", label: "Estoque" },
];

const { getProducts } = ProductService();

const ProductsList = () => {
  const [products, setProducts] = useState<IBodyProductList>({ products: [] });
  const [selectedProduct, setSelectedProduct] = useState<
    IBodyProduct | undefined
  >(undefined);
  const [productId, setProductId] = useState<number>();
  const [formType, setFormType] = useState<ICRUD>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [abortController, setAbortController] = useState<AbortController>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onCreateHandler = () => {
    handleOpen();
    setFormType(ICRUD.CREATE);
  };

  const onEditHandler = (id: number) => {
    setProductId(id);
    setFormType(ICRUD.EDIT);
    handleOpen();
  };

  const onDeleteHandler = (data: IBodyProduct) => {
    setSelectedProduct(data);
    setFormType(ICRUD.DELETE);
    handleOpen();
  };

  const getProductsCallback = useCallback(
    async (controller: AbortController) => {
      setIsLoading(true);
      const response = await getProducts(controller);

      if (response?.success) {
        setProducts(response.data);
      }
      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    setAbortController(controller);
    getProductsCallback(controller);
  }, [getProductsCallback]);

  useEffect(() => {
    return () => {
      abortControllerHandler(abortController);
    };
  }, [abortController]);

  return (
    <div style={{ width: "100%" }}>
      <ListTable
        title="Produtos"
        notFoundText="Produtos não encontrados!"
        isLoading={isLoading}
        columns={columns}
        rows={
          products.products.map((item) => ({
            ...item,
            price: formatToBRL(item.price),
          })) as any
        }
        onCreateHandler={onCreateHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />

      {formType !== ICRUD.DELETE && (
        <StyledModal open={open} onClose={handleClose}>
          {formType === ICRUD.CREATE && <h2>Cadastrar Produto</h2>}
          {formType === ICRUD.EDIT && <h2>Editar Produto</h2>}

          <ProductForm
            onClose={handleClose}
            fetchList={() =>
              getProductsCallback(abortController as AbortController)
            }
            formType={formType}
            productId={productId as number}
          />
        </StyledModal>
      )}

      {formType === ICRUD.DELETE && (
        <DeleteModal
          open={open}
          handleClose={handleClose}
          selectedProduct={selectedProduct}
          fetchList={() =>
            getProductsCallback(abortController as AbortController)
          }
        />
      )}
    </div>
  );
};

export default ProductsList;
