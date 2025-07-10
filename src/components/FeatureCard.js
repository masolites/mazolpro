import { Box, Text } from "@chakra-ui/react";

export default function FeatureCard({ title, children }) {
  return (
    <Box
      bg="cream.100"
      color="maroon.700"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={6}
      minH="220px"
    >
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        {title}
      </Text>
      {children}
    </Box>
  );
}

