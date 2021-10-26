import {
  FormControl as ChakraFormControl,
  FormControlProps as ChakraFormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

export type FormControlProps = Omit<ChakraFormControlProps, "label"> & {
  name?: string;
  label: React.ReactNode | string;
  testid?: string;
  error?: string;
  children: ReactNode;
  formLabelProps?: FormLabelProps;
};

export const FormControl = (props: FormControlProps): JSX.Element => {
  const {
    testid,
    error,
    mb = 4,
    label,
    children,
    name,
    formLabelProps,
    ...rest
  } = props;

  return (
    <ChakraFormControl mb={mb} isInvalid={!!error} {...rest}>
      {label && (
        <FormLabel
          fontSize="14px"
          fontWeight="400"
          display="flex"
          htmlFor={name}
          {...formLabelProps}
        >
          {label}
        </FormLabel>
      )}
      {children}
      <FormErrorMessage data-testid={`${testid}-error`}>
        {error}
      </FormErrorMessage>
    </ChakraFormControl>
  );
};
