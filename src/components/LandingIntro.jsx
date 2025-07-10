import { Box, Heading, Text } from "@chakra-ui/react";

export default function LandingIntro() {
  return (
    <Box textAlign="center" py={8}>
      <Heading as="h1" size="2xl" color="blue.700" mb={2}>
        Mazol Pro
      </Heading>
      <Heading as="h2" size="lg" color="gray.600" mb={4}>
        E-commerce & Blockchain
      </Heading>
      <Text
        fontSize="xl"
        color="gray.700"
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
