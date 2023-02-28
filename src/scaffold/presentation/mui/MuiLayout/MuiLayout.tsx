/** @jsxImportSource @emotion/react */
import { Container } from "@mui/material";
import { css } from "@emotion/react";

import { XLayoutProps } from "../../interfaces";

const styles = {
  headerRow: css`
    display: flex;
    flex: 1;
    justify-content: space-between;
    background-color: white;
    height: 50px;
    padding: 15px 20px;
    align-items: center;
  `,
  header: css`
    font-weight: bold;
    font-size: 1.5rem;
  `,
};

const MuiLayout: React.FC<XLayoutProps> = ({
  schema,
  renderActions,
  children,
}) => {
  console.log("mui layout", children);
  return (
    <Container disableGutters maxWidth={false}>
      <div css={styles.headerRow}>
        <h1 css={styles.header}>{schema.name}</h1>
        {/* @todo Filters */}
        <div>{renderActions && renderActions()}</div>
      </div>
      <div>{children}</div>
    </Container>
  );
};

export default MuiLayout;
