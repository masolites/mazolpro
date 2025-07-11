import { Box } from "@chakra-ui/react";

export default function FeatureCard({ children }) {
  return (
    <Box
      bg="cream.100"
      color="maroon.800"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={6}
      minH="220px"
    >
      {children}
    </Box>
  );
}
