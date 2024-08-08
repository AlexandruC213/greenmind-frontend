import React from "react";
import { Container, Flex, Text, IconButton, Spacer } from "@chakra-ui/react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "@/assets/fonts/quellaFont.css";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxW="container.xl" as="header" bg="white" py={4}>
      <Flex align="center">
        <Text fontSize="2xl" style={{ fontFamily: "Quella, sans-serif" }}>
          Greenmind
        </Text>
        <Spacer />
        <IconButton
          aria-label="Logout"
          icon={<FaSignOutAlt />}
          variant="ghost"
          size="lg"
          onClick={() => {
            Cookies.remove("authToken");
            Cookies.remove("userId");
            navigate("/login");
          }}
        />
      </Flex>
    </Container>
  );
};

export default Header;
