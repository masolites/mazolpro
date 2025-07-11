 import { Box, Heading, Text } from "@chakra-ui/react";

export default function LandingIntro() {
  return (
    <Box
      bg="maroon.700"
      color="cream.100"
      borderRadius="lg"
      boxShadow="lg"
      p={{ base: 3, md: 4 }}
      mb={4}
      textAlign="center"
      maxW="400px"
      mx="auto"
    >
      <Heading fontSize="2xl" mb={2}>
        Welcome to Mazol Pro
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }} // matches subtitle in header
        color="cream.200"
        maxW="350px"
        mx="auto"
      >
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people.
      </Text>
    </Box>
  );
}
