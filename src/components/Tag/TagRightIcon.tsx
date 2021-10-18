import { Box } from "@chakra-ui/layout";

interface TagRightIconProps {
  children: React.ReactNode;
}

export const TagRightIcon = ({ children }: TagRightIconProps): JSX.Element => {
  return <Box p={1}>{children}</Box>;
};
