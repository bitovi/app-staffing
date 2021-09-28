import { Box } from "@chakra-ui/layout";

type IProps = {
  children: React.ReactNode;
};

export const TagRightIcon = ({ children }: IProps): JSX.Element => {
  return <Box p={1}>{children}</Box>;
};
