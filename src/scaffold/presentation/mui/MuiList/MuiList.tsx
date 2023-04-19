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

const MuiList: React.FC<XListProps> = ({ displays, useData }) => {
  return (
    <TableContainer css={styles.tableContainer}>
      <Table css={styles.table}>
        <TableHead>
          <TableRow>
            {displays.map((display) => (
              <TableCell key={display.label} css={styles.th}>
                {display.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={<SkeletonCells displays={displays} />}>
            <MuiListRows displays={displays} useData={useData} />
          </Suspense>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiList;

const MuiListRows: React.FC<XListProps> = ({ displays, useData }) => {
  const data = useData();
  console.log("data???", data);

  return (
    <>
      {data.map((item) => (
        <TableRow key={item.id}>
          {displays.map((display) => (
            <TableCell key={`${item.id}-${display.key}`}>
              {display.render({
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

const SkeletonCells = ({ displays }: SkeletonCellsProps) => {
  return (
    <>
      {[1, 2, 3].map((key) => (
        <TableRow key={key}>
          {displays.map((display) => (
            <TableCell key={display.label}>
              <Skeleton variant="rounded" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
