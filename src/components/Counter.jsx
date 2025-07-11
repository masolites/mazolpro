import { Box, Text } from "@chakra-ui/react";

export default function Counter({
  label,
  value,
  color = "turquoise.500",
}) {
  return (
    <Box textAlign="center" mb={2}>
      <Text fontSize="2xl" fontWeight="bold" color={color}>
        {value}
      </Text>
      <Text fontSize="md" color="cream.100">
        {label}
      </Text>
    </Box>
  );
}
