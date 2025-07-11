 import { Box, Heading, Text } from "@chakra-ui/react";

export default function LandingIntro() {
  return (
    <Box
      bg="maroon.700"
      color="cream.100"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={8}
      textAlign="center"
      maxW="700px"
      mx="auto"
    >
      <Heading fontSize="2xl" mb={2}>
        Welcome to Mazol Pro
      </Heading>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="cream.100"
        maxW="600px"
        mx="auto"
      >
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people.
      </Text>
    </Box>
  );
}
