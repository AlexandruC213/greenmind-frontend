import { Box, Container, Heading, Text } from "@chakra-ui/react";

const TermsPolicy = () => {
  return (
    <Container maxW="3xl" py={12}>
      <Heading as="h1" mb={6}>
        Terms & Policy
      </Heading>
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Introduction
        </Heading>
        <Text>
          Welcome to our application. These terms and conditions outline the
          rules and regulations for the use of our app.
        </Text>
      </Box>
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          User Responsibilities
        </Heading>
        <Text>
          By accessing this app, we assume you accept these terms and
          conditions. Do not continue to use the app if you do not agree to all
          of the terms and conditions stated on this page.
        </Text>
      </Box>
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Privacy Policy
        </Heading>
        <Text>
          Your privacy is important to us. It is our policy to respect your
          privacy regarding any information we may collect while operating our
          app.
        </Text>
      </Box>
      <Box mb={4}>
        <Heading as="h2" size="md" mb={2}>
          Changes to These Terms
        </Heading>
        <Text>
          We may update our Terms & Policy from time to time. We will notify you
          of any changes by posting the new Terms & Policy on this page.
        </Text>
      </Box>
      <Box>
        <Heading as="h2" size="md" mb={2}>
          Contact Us
        </Heading>
        <Text>
          If you have any questions about these Terms & Policy, please contact
          us at support@example.com.
        </Text>
      </Box>
    </Container>
  );
};

export default TermsPolicy;
