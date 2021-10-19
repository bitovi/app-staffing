import { TagCloseButton as ChakraTagCloseButton } from "@chakra-ui/tag";

interface TagCloseButtonProps {
  onClick?: () => void;
}

export const TagCloseButton = ({
  onClick,
  ...props
}: TagCloseButtonProps): JSX.Element => {
  return <ChakraTagCloseButton {...props} onClick={onClick} />;
};
