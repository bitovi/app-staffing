/** @jsxImportSource @emotion/react */
import React from "react";
import { Container } from "@mui/material";
import { css } from "@emotion/react";

import ScaffoldList from "../../../components/ScaffoldList";
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
  valueComponents,
  renderActions,
  useData,
  children,
}) => {
  return (
    <Container disableGutters maxWidth={false}>
      <div css={styles.headerRow}>
        <h1 css={styles.header}>{schema.name}</h1>
        {/* @todo Filters */}
        <div>{renderActions && renderActions()}</div>
      </div>
      <div>
        <ScaffoldList
          schema={schema}
          valueComponents={valueComponents}
          useData={useData}
        >
          {children}
        </ScaffoldList>
      </div>
    </Container>
  );
};

export default MuiLayout;
