import { TagCloseButton as ChakraTagCloseButton } from "@chakra-ui/tag";

interface IProps {
  onClick?: () => void;
}

export const TagCloseButton = ({ onClick, ...props }: IProps): JSX.Element => {
  return <ChakraTagCloseButton {...props} onClick={onClick} />;
};
