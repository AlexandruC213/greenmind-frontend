import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import registrationCover from "@/assets/registration-cover.png";

const AuthLayout: React.FC = () => {
  return (
    <Flex minH="100vh">
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={2}
      >
        <Outlet />
      </Box>
      <Box flex="1" display={{ base: "none", xl: "block" }} position="relative">
        <Image
          src={registrationCover}
          alt="Auth side image"
          objectFit="fill"
          w="full"
          h="full"
          position="absolute"
          top="0"
          right="0"
        />
      </Box>
    </Flex>
  );
};

export default AuthLayout;
