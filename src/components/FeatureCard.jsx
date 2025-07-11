 import { Box } from "@chakra-ui/react";

export default function FeatureCard({ children }) {
  return (
    <Box
      bg="cream.300"
      color="maroon.800"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={4}
    >
      {children}
    </Box>
  );
}
