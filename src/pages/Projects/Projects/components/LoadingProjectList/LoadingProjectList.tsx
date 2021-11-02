import { Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingProjectList(): JSX.Element {
  return (
    <Stack>
      <Skeleton height="55px" />
      <Skeleton height="55px" />
      <Skeleton height="55px" />
      <Skeleton height="55px" />
    </Stack>
  );
}
