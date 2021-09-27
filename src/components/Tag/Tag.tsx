import { Tag as ChakraTag, TagProps } from "@chakra-ui/tag";

type IProps = TagProps & {
  tagRightIcon?: React.ReactNode;
  tagLeftIcon?: React.ReactNode;
};

export const Tag = ({
  children,
  tagRightIcon,
  tagLeftIcon,
  ...rest
}: IProps): JSX.Element => {
  return (
    <ChakraTag variant="primary" {...rest}>
      {tagLeftIcon}
      {children}
      {tagRightIcon}
    </ChakraTag>
  );
};
