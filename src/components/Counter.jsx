 import { Box, Text } from "@chakra-ui/react";

export default function Counter({
  label,
  value,
  color = "turquoise.500",
}) {
  return (
    <Box
      bg={color}
      color="maroon.700"
      borderRadius="md"
      px={4}
      py={2}
      textAlign="center"
      boxShadow="md"
      minW="100px"
      mb={2}
    >
      <Text fontSize="2xl" fontWeight="bold">
        {value}
      </Text>
      <Text fontSize="sm">{label}</Text>
    </Box>
  );
}
