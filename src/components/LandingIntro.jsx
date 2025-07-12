import { Box, Text, Heading } from "@chakra-ui/react";

export default function LandingIntro() {
  return (
    <Box textAlign="center" py={8} px={4}>
      <Heading color="turquoise.500" mb={2} textShadow="1px 2px 8px #000">
        Mazol Pro E-commerce & Blockchain
      </Heading>
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="cream.100"
        maxW="600px"
        mx="auto"
        bg="maroon.700"
        p={4}
        borderRadius="xl"
        boxShadow="0 2px 8px 0 #fff5e122"
      >
        Mazol-Pro is a Blockchain supported Platform promoting a Better Society Together by offering Trusted Systems, Goods & Services to people.
      </Text>
    </Box>
  );
}
