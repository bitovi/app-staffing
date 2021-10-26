import { Textarea, TextareaProps } from "@chakra-ui/react";
import { FormHelperText } from "@chakra-ui/form-control";
import React, { ReactNode } from "react";
import { BaseProps } from "../baseProps";
import { FormControl } from "../FormControl";

export type TextareaControlProps = TextareaProps &
  BaseProps & {
    formHelperText?: ReactNode;
  };

export const TextArea = (props: TextareaControlProps): JSX.Element => {
  const { label, formControlProps, formHelperText, testid, ...rest } = props;
  const { error, ...formControlPropsRest } = formControlProps || {};

  return (
    <FormControl
      label={label}
      testid={testid}
      error={error}
      {...formControlPropsRest}
    >
      <Textarea data-testid={testid} {...rest} />

      {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
    </FormControl>
  );
};
