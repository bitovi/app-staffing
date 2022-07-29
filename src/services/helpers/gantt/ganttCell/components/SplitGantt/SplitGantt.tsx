import { Box } from "@chakra-ui/react";
import getConfidenceColor from "../../../color";

const SplitGantt = ({
  width,
  startConfidence,
  endConfidence,
}: {
  width: number;
  startConfidence: number;
  endConfidence: number;
}): JSX.Element => {
  return (
    <>
      <Box
        minHeight="18px"
        margin="auto"
        marginLeft={0}
        marginRight={"auto"}
        borderRadius={`0px 8px 8px 0px`}
        width={`${width}%`}
        opacity={0.7}
        backgroundColor={getConfidenceColor(startConfidence)}
      />
      <Box
        minHeight="18px"
        margin="auto"
        marginLeft={"auto"}
        marginRight={0}
        borderRadius={`8px 0px 0px 8px`}
        width={`${100 - width}%`}
        opacity={0.7}
        backgroundColor={getConfidenceColor(endConfidence, "endConfidence")}
      />
    </>
  );
};

export default SplitGantt;
