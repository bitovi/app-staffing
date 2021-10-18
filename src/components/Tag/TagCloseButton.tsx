import { TagCloseButton as ChakraTagCloseButton } from "@chakra-ui/tag";

interface IProps {
  "data-testid"?: string;
  onClick?: () => void;
}

export const TagCloseButton = ({ onClick, ...rest }: IProps): JSX.Element => {
  return <ChakraTagCloseButton onClick={onClick} {...rest} />;
};
