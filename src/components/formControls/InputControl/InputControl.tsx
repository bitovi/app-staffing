import { Input, InputGroup, InputProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { BaseProps } from "../baseProps";
import { FormControl } from "../FormControl";

export type InputControlProps = BaseProps &
  InputProps & {
    inputLeftElement?: ReactNode;
    inputRightElement?: ReactNode;
    formHelperText?: ReactNode;
  };

export const InputControl = (props: InputControlProps): JSX.Element => {
  const {
    label,
    formHelperText,
    formControlProps,
    inputLeftElement,
    inputRightElement,
    testid,
    ...inputProps
  } = props;

  return (
    <FormControl label={label} testid={testid} {...formControlProps}>
      <InputGroup>
        {inputLeftElement}
        <Input data-testid={testid} {...inputProps} />
        {inputRightElement}
      </InputGroup>
      {formHelperText}
    </FormControl>
  );
};
