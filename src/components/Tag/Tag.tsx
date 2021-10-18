import { Tag as ChakraTag } from "@chakra-ui/tag";

type IProps = {
  tagRightIcon?: React.ReactNode;
  tagLeftIcon?: React.ReactNode;
  children: React.ReactNode;
  variant: "primary";
};

export const Tag = ({
  children,
  tagRightIcon,
  tagLeftIcon,
  variant,
}: IProps): JSX.Element => {
  return (
    <ChakraTag variant={variant}>
      {tagLeftIcon}
      {children}
      {tagRightIcon}
    </ChakraTag>
  );
};
