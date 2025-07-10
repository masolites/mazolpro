import {
  Flex,
  Heading,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";

export default function Header({ onAuth }) {
  const { user, admin, logout } = useAuth();

  return (
    <Flex
      as="header"
      p={4}
      bg="white"
      align="center"
      boxShadow="sm"
    >
      <Heading size="lg" color="blue.700">
        Mazol Pro
      </Heading>
      <Spacer />
      <Heading
        size="sm"
        color="gray.600"
        fontWeight="normal"
        mr={6}
      >
        E-commerce & Blockchain
      </Heading>
      {user ? (
        <>
          {admin && (
            <Link href="/admin">
              <Button colorScheme="purple" mr={3}>
                Admin
              </Button>
            </Link>
          )}
          <Button
            onClick={logout}
            colorScheme="red"
            variant="outline"
          >
            Logout
          </Button>
        </>
      ) : (
        <Button onClick={onAuth} colorScheme="blue">
          Sign In
        </Button>
      )}
    </Flex>
  );
}
