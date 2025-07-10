import { Box, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      py={4}
      textAlign="center"
      color="cream.100"
      bg="maroon.900"
    >
      <Link href="/admin" color="turquoise.500" mr={2}>
        Admin Dashboard
      </Link>
      &copy; {new Date().getFullYear()} Mazol Pro
    </Box>
  );
}
