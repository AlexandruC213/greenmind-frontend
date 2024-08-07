import { useToast } from "@chakra-ui/react";

export const useToastNotification = () => {
  const toast = useToast();

  const showToast = (
    status: "info" | "warning" | "success" | "error",
    title: string,
    description?: string
  ) => {
    toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
    });
  };

  return showToast;
};
