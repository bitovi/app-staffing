import { Textarea, TextareaProps } from "@chakra-ui/react";
import React from "react";
import { BaseProps } from "../baseProps";
import { FormControl } from "../FormControl";

export type TextareaControlProps = TextareaProps & BaseProps;

export const TextArea = (props: TextareaControlProps): JSX.Element => {
  const { label, formControlProps, testid, ...rest } = props;
  const { error, ...formControlPropsRest } = formControlProps || {};

  return (
    <FormControl
      label={label}
      testid={testid}
      error={error}
      {...formControlPropsRest}
    >
      <Textarea data-testid={testid} {...rest} />
    </FormControl>
  );
};
