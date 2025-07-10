// src/pages/dashboard.js
import {
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <Box minH="100vh" bg="cream.50">
      <Header />
      <Box maxW="container.md" mx="auto" py={10}>
        <Heading size="lg" color="maroon.500" mb={4}>
          Welcome, {user.email || user.wallet}
        </Heading>
        <Text color="gray.700" mb={8}>
          Your dashboard is under construction. All features
          will appear here soon!
        </Text>
        {/* Add feature components here */}
      </Box>
      <Footer />
    </Box>
  );
}
