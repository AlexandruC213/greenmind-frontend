import { useState } from "react";

import {
  Button,
  FormLabel,
  InputRightElement,
  InputGroup,
  Input,
  Flex,
} from "@chakra-ui/react";

interface PasswordInputProps {
  children?: React.ReactNode;
  label?: string;
  password: string;
  setPassword: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  children,
  label = "Password",
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Flex mb={1} align="center" justify="space-between">
        <FormLabel mb={0}>{label}</FormLabel>
        {children}
      </Flex>
      <InputGroup>
        <Input
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default PasswordInput;
