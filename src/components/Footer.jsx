import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" py={4} textAlign="center" bg="maroon.900" color="cream.100" mt={8}>
      <Text>
        Admin Dashboard © {new Date().getFullYear()} Mazol Pro
      </Text>
    </Box>
  );
}
