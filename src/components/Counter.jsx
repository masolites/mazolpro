import { Box, Text } from "@chakra-ui/react";

export default function Counter({ label, value, color = "turquoise.500", shadow3d }) {
  return (
    <Box
      textAlign="center"
      my={2}
      p={2}
      borderRadius="lg"
      bg="maroon.900"
      boxShadow={shadow3d ? `0 4px 16px 0 ${color}55, 0 2px 8px 0 #fff5e122` : "md"}
      minW="100px"
    >
      <Text fontSize="2xl" fontWeight="extrabold" color={color} textShadow="1px 2px 8px #000">
        {value}
      </Text>
      <Text fontSize="sm" color="cream.200" fontWeight="bold">
        {label}
      </Text>
    </Box>
  );
}
