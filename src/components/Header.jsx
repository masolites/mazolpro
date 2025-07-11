import {
  Flex,
  Box,
  Button,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onAuth }) {
  const { user, logout } = useAuth();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={6}
      py={4}
      bg="maroon.900"
      color="cream.100"
      boxShadow="md"
    >
      <Box>
        <Link href="/" passHref>
          <Text
            fontWeight="bold"
            fontSize="xl"
            letterSpacing="wide"
          >
            Mazol Pro E-commerce & Blockchain Admin
          </Text>
        </Link>
      </Box>
      <Spacer />
      <Box>
        {user ? (
          <Button variant="turquoise" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button variant="pink" onClick={onAuth}>
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
}
