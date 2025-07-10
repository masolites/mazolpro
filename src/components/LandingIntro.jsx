 import { Box, Heading, Text } from "@chakra-ui/react";

export default function LandingIntro() {
  return (
    <Box textAlign="center" py={10} px={4}>
      <Heading
        as="h1"
        size="2xl"
        color="cream.100"
        mb={2}
        letterSpacing="tight"
      >
        Mazol Pro
      </Heading>
      <Heading
        as="h2"
        size="lg"
        color="cream.100"
        mb={4}
        fontWeight="medium"
      >
        E-commerce & Blockchain
      </Heading>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="cream.100"
        maxW="600px"
        mx="auto"
        bg="maroon.700"
        p={4}
        borderRadius="md"
        boxShadow="sm"
      >
        Mazol-Pro is a Blockchain supported Platform
        promoting a Better Society Together by offering
        Trusted Systems, Goods & Services to people.
      </Text>
    </Box>
  );
}
