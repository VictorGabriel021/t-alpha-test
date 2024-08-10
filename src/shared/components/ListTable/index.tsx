import { ReactNode } from "react";

import { Alert } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TitleAndActions from "./components/TitleAndActions";

import Loading from "../Loading";

import { AlertContainer, PaperContainer, ActionsContainer } from "./styles";
import { DeleteIconCustom, EditIconCustom } from "shared/styles/styles";

interface IColumns {
  id: string;
  label: string;
}

interface IRows<T> {
  [key: string]: T;
}

interface IListTableProps<T> {
  columns: IColumns[];
  rows: IRows<T>[];
  onEditHandler: (id: number) => void;
  onDeleteHandler: (rows: T) => void;
  title: string;
  notFoundText: string;
  onCreateHandler: () => void;
  isLoading: boolean;
}

const ListTable = <T,>({
  columns,
  rows,
  onEditHandler,
  onDeleteHandler,
  title,
  notFoundText,
  onCreateHandler,
  isLoading,
}: IListTableProps<T>) => {
  const TableCellCustom = ({ children }: { children?: ReactNode }) => {
    return (
      <TableCell
        align="center"
        style={{
          minWidth: 200,
          background: "#1976D2",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {children}
      </TableCell>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TitleAndActions title={title} onCreateHandler={onCreateHandler} />

      {!rows.length ? (
        <AlertContainer>
          <Alert variant="filled" severity="info">
            {notFoundText}
          </Alert>
        </AlertContainer>
      ) : (
        <PaperContainer sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ width: "100vw" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCellCustom key={index}>
                      {column.label}
                    </TableCellCustom>
                  ))}
                  <TableCellCustom />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id] as any;
                        return (
                          <TableCell key={column.label} align="center">
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <ActionsContainer>
                          <EditIconCustom
                            onClick={() => onEditHandler(row.id as number)}
                          />
                          <DeleteIconCustom
                            onClick={() => onDeleteHandler(row as T)}
                          />
                        </ActionsContainer>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </PaperContainer>
      )}
    </>
  );
};

export default ListTable;
