import React from "react";
import { Container, Heading, Text, Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userId");
    navigate("/login");
  };

  return (
    <Container centerContent>
      <Center height="100vh" flexDirection="column">
        <Heading as="h1" size="2xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="lg" mb={8}>
          The page you are looking for does not exist.
        </Text>
        <Button colorScheme="blue" onClick={handleLogout}>
          Go to login
        </Button>
      </Center>
    </Container>
  );
};

export default NotFound;
