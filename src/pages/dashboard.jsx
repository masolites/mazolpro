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
import Feature from "../components/FeatureCard";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";

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
    <Box minH="100vh" bg="maroon.800">
      <Header />
      <Box maxW="container.xl" mx="auto" py={10} px={4}>
        <Heading size="lg" color="cream.100" mb={2}>
          Welcome, {user.email || user.wallet}
        </Heading>
        <Text color="cream.100" mb={8} fontSize="lg">
          Your Mazol Pro dashboard. All your features in one
          place.
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
        >
          <FeatureCard>
            <PrivateSaleCard />
          </FeatureCard>
          <FeatureCard>
            <MiningCard />
          </FeatureCard>
          {/* Add more cards here as you build more features */}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}
