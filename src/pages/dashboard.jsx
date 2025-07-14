 // pages/dashboard.js

import {
  Box,
  SimpleGrid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";

export default function Dashboard() {
  const { user, wallet, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !wallet) {
      router.replace("/");
    }
  }, [wallet, loading, router]);

  if (loading || !wallet || !user) return null;

  return (
    <Box minH="100vh" bg="maroon.800">
      <Header />
      <Box maxW="1200px" mx="auto" py={8} px={4}>
        <Heading
          mb={2}
          color="cream.100"
          textAlign="center"
        >
          Welcome, {wallet}
        </Heading>
        <Text mb={8} color="cream.200" textAlign="center">
          Your Mazol Pro dashboard. All your features in one
          place.
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          justifyItems="center"
        >
          <Box maxW="320px" w="100%">
            <FeatureCard>
              <PrivateSaleCard />
            </FeatureCard>
          </Box>
          <Box maxW="320px" w="100%">
            <FeatureCard>
              <MiningCard />
            </FeatureCard>
          </Box>
          {/* Add more FeatureCards here as you build more features */}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}
