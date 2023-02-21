/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import { css } from "@emotion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  TableContainer,
} from "@mui/material";

import { XListProps } from "../../interfaces";

const styles = {
  tableContainer: css`
    padding: 15px;
  `,
  table: css`
    background-color: white;
  `,
  th: css`
    font-weight: bold;
  `,
};

const MuiList: React.FC<XListProps> = ({ columns, useData }) => {
  return (
    <TableContainer css={styles.tableContainer}>
      <Table css={styles.table}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.headerName} css={styles.th}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={<SkeletonCells columns={columns} />}>
            <MuiListRows columns={columns} useData={useData} />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiList;

const MuiListRows: React.FC<XListProps> = ({ columns, useData }) => {
  const data = useData();

  return (
    <>
      {data.map((item) => (
        <TableRow key={item.id}>
          {columns.map((column) => (
            <TableCell key={`${item.id}-${column.attribute}`}>
              {column.renderCell({
                value: item[column.attribute],
                record: item,
              })}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

type SkeletonCellsProps = Omit<XListProps, "useData">;

const SkeletonCells = ({ columns }: SkeletonCellsProps) => {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <TableRow key={key}>
          {columns.map((column) => (
            <TableCell key={column.headerName}>
              <Skeleton variant="rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
