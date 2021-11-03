import { Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingProjectList(): JSX.Element {
  return (
    <Stack data-testid="loading-projects-skeleton">
      <Skeleton height="55px" />
      <Skeleton height="55px" />
      <Skeleton height="55px" />
      <Skeleton height="55px" />
    </Stack>
  );
}
