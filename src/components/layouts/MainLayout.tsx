import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import MainHeader from "../global/MainHeader";

const AuthLayout: React.FC = () => {
  return (
    <Flex minH="100vh" direction={"column"}>
      <MainHeader />
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
