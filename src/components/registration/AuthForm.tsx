import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Divider,
  AbsoluteCenter,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { loginUser, registerUser } from "@/api/auth";
import { useToastNotification } from "@/hooks/useToastNotification";

import PasswordInput from "./PasswordInput";

const AuthForm = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const showToast = useToastNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (!termsAccepted) {
          showToast("error", "Error", "You must accept the terms & policy");
          return;
        }
        await registerUser({ name, email, password });
        showToast(
          "success",
          "Account created.",
          "We've created your account for you."
        );
        navigate("/login");
      } else {
        await loginUser({ email, password, rememberFor30Days: rememberMe });
        showToast("success", "Login successful.", "Welcome back!");
        navigate("/products?page=1&perPage=3");
      }
    } catch (error: any) {
      showToast(
        "error",
        isRegister ? "Registration failed." : "Login failed.",
        error.message
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
            {isRegister ? "Get Started Now" : "Welcome back!"}
          </Text>
          {!isRegister && (
            <Text fontSize="lg" color="gray.600">
              Enter your Credentials to access your account
            </Text>
          )}
        </Stack>
        <Box w="100%" bg="white">
          <Stack spacing={6} as="form" onSubmit={handleSubmit}>
            {isRegister && (
              <FormControl id="name" isRequired>
                <FormLabel mb={1}>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            )}
            <FormControl id="email" isRequired>
              <FormLabel mb={1}>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <PasswordInput password={password} setPassword={setPassword}>
                {!isRegister && (
                  <ChakraLink
                    color="#0F3DDE"
                    textDecoration={"none"}
                    _hover={{ textDecoration: "none" }}
                    to="/forgot-password"
                    as={ReactRouterLink}
                  >
                    forgot password
                  </ChakraLink>
                )}
              </PasswordInput>
            </FormControl>
            {isRegister && (
              <Checkbox
                my={2}
                isChecked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              >
                I agree to the{" "}
                <ChakraLink
                  color="black"
                  textDecoration={"underline"}
                  as={ReactRouterLink}
                  to="/terms-policy"
                >
                  terms & policy
                </ChakraLink>
              </Checkbox>
            )}
            {!isRegister && (
              <Checkbox
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember for 30 days
              </Checkbox>
            )}
            <Button
              type="submit"
              bg="#3A5B22"
              color="white"
              borderRadius="12px"
              _hover={{ bg: "#47692f" }}
              size="lg"
            >
              {loading ? (
                <Spinner size="sm" />
              ) : isRegister ? (
                "Signup"
              ) : (
                "Login"
              )}
            </Button>
            <Box position="relative" py={4}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                or
              </AbsoluteCenter>
            </Box>
            <Text align="center">
              {isRegister ? (
                <>
                  Have an account?{" "}
                  <ChakraLink
                    color="#0F3DDE"
                    textDecoration={"none"}
                    _hover={{ textDecoration: "none" }}
                    to="/login"
                    as={ReactRouterLink}
                  >
                    Sign In
                  </ChakraLink>
                </>
              ) : (
                <>
                  Don’t have an account?{" "}
                  <ChakraLink
                    color="#0F3DDE"
                    textDecoration={"none"}
                    _hover={{ textDecoration: "none" }}
                    to="/register"
                    as={ReactRouterLink}
                  >
                    Sign up
                  </ChakraLink>
                </>
              )}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default AuthForm;
