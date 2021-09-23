import { TagCloseButton as ChakraTagCloseButton } from "@chakra-ui/tag";

interface IProps {
  onClick?: () => void;
}

export const TagCloseButton = ({ onClick }: IProps): JSX.Element => {
  return <ChakraTagCloseButton onClick={onClick} />;
};
