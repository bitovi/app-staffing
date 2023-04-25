/** @jsxImportSource @emotion/react */
import { Fragment } from "react";
import { Box, Button, Grid } from "@mui/material";
import { css } from "@emotion/react";

import type { Primitive, XFormProps } from "../../interfaces";

const styles = {
  box: css`
    padding: 10px 0px;
    margin: 15px;
  `,
  label: css`
    font-weight: bold;
  `,
};

const MuiForm: React.FC<XFormProps> = ({
  isEdit,
  fields,
  formState,
  onUpdate,
  onSave,
}) => {
  return (
    <Box css={styles.box}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Fragment key={field.key}>
            <Grid
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              item
              xs={1.5}
            >
              <span css={styles.label}>{field.label}</span>
            </Grid>
            <Grid item xs={10.5}>
              {field.render({
                value: formState[field.key],
                onUpdate: (value: Primitive) => onUpdate(field.key, value),
              })}
            </Grid>
          </Fragment>
        ))}
        <Grid item>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MuiForm;
