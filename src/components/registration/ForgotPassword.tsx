import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { forgotUserPassword, resetUserPassword } from "@/api/auth";
import { useToastNotification } from "@/hooks/useToastNotification";

import PasswordInput from "./PasswordInput";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastNotification();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location.search]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotUserPassword({ email });
      showToast(
        "success",
        "Password reset email sent.",
        "Check your email for further instructions."
      );

      navigate("/login");
    } catch (error: any) {
      showToast(
        "error",
        "Error.",
        error?.message ||
          "An error occurred while trying to reset the password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetUserPassword({ password, token });
      showToast(
        "success",
        "Password reset successful.",
        "You can now log in with your new password."
      );

      navigate("/login");
    } catch (error: any) {
      showToast(
        "error",
        "Error.",
        error?.message ||
          "An error occurred while trying to reset the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="2xl" centerContent>
      <Stack w="100%" spacing={8}>
        <Stack align="left">
          <Text fontSize="4xl" fontWeight="bold">
            {token ? "Reset Password" : "Forgot Password"}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {token
              ? "Enter your new password below."
              : "Enter your email to reset your password."}
          </Text>
        </Stack>
        <Box w="100%" bg="white">
          <Stack
            spacing={4}
            as="form"
            onSubmit={token ? handlePasswordSubmit : handleEmailSubmit}
          >
            {token ? (
              <FormControl id="password" isRequired>
                <PasswordInput
                  label="New Password"
                  password={password}
                  setPassword={setPassword}
                />
              </FormControl>
            ) : (
              <FormControl id="email" isRequired>
                <Flex mb={1} align="center" justify="space-between">
                  <FormLabel mb={0}>Email address</FormLabel>
                  <ChakraLink
                    color="#0F3DDE"
                    textDecoration={"none"}
                    _hover={{ textDecoration: "none" }}
                    to="/login"
                    as={ReactRouterLink}
                  >
                    login
                  </ChakraLink>
                </Flex>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            )}
            <Button
              type="submit"
              bg="#3A5B22"
              color="white"
              borderRadius="12px"
              _hover={{ bg: "#47692f" }}
              size="lg"
              mt={4}
            >
              {loading ? (
                <Spinner size="sm" />
              ) : token ? (
                "Reset Password"
              ) : (
                "Reset Email"
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
