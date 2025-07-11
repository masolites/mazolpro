 import {
  Box,
  SimpleGrid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <Box minH="100vh" bg="maroon.800">
      <Header onAuth={() => setAuthModalOpen(true)} />
      <Box maxW="1200px" mx="auto" py={8} px={4}>
        <Heading mb={2} color="cream.100">
          Welcome, {user.email || user.wallet}
        </Heading>
        <Text mb={8} color="cream.200">
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
          {/* Add more FeatureCards as you build more features */}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}
