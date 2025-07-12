 import { Flex, Box, Button, Spacer, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ onAuth }) {
  const { user, logout } = useAuth();

  return (
    <Flex as="header" align="center" bg="maroon.900" px={6} py={4} boxShadow="md">
      <Box>
        <Text fontWeight="bold" fontSize="xl" color="turquoise.500" textShadow="1px 2px 8px #000">
          Mazol Pro E-commerce & Blockchain
        </Text>
      </Box>
      <Spacer />
      <Box>
        {user ? (
          <Button variant="solid" bg="deepPink.400" color="white" borderRadius="xl" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button
            variant="solid"
            bgGradient="linear(to-r, turquoise.500, orange.300)"
            color="maroon.900"
            borderRadius="xl"
            onClick={onAuth}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
}
