import { Box, Text, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      py={4}
      textAlign="center"
      color="gray.500"
    >
      <Link href="/admin" color="blue.500" mr={2}>
        Admin Dashboard
      </Link>
      &copy; {new Date().getFullYear()} Mazol Pro
    </Box>
  );
}
