 import {
  Flex,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onAuth }) {
  const { user, admin, logout } = useAuth();

  return (
    <Flex
      as="header"
      p={4}
      bg="maroon.800"
      align="center"
      boxShadow="sm"
    >
      <Heading size="lg" color="cream.100">
        Mazol Pro
      </Heading>
      <Spacer />
      <Heading
        size="sm"
        color="cream.100"
        fontWeight="normal"
        mr={6}
      >
        E-commerce & Blockchain
      </Heading>
      <Link href="/admin">
        <Button colorScheme="pink" mr={3}>
          Admin
        </Button>
      </Link>
      {user ? (
        <Button
          onClick={logout}
          colorScheme="red"
          variant="outline"
        >
          Logout
        </Button>
      ) : (
        <Button onClick={onAuth} colorScheme="turquoise">
          Sign In
        </Button>
      )}
    </Flex>
  );
}
