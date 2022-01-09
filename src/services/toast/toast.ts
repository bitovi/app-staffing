import type { UseToastOptions } from "@chakra-ui/toast";

import { useToast as useChakraToast } from "@chakra-ui/toast";

export function useToast(): (
  options: UseToastOptions,
) => ReturnType<ReturnType<typeof useChakraToast>> {
  const chakraToast = useChakraToast();

  function toast(options: UseToastOptions) {
    return chakraToast({
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
      variant: "left-accent",
      status: "success",
      ...options,
    });
  }

  toast.close = chakraToast.close;
  toast.closeAll = chakraToast.closeAll;
  toast.update = chakraToast.update;
  toast.isActive = chakraToast.isActive;

  return toast;
}
