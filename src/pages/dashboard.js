 import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import Counter from "../components/Counter";

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
          {/* Private Sale Card */}
          <FeatureCard title="Private Sale">
            <Flex gap={4} mb={4}>
              <Counter
                label="Tokens Sold"
                value="12,000"
                color="turquoise.500"
              />
              <Counter
                label="Goal"
                value="100,000"
                color="lilac.200"
              />
            </Flex>
            <Button variant="maroon" size="sm" mt={2}>
              Buy Tokens
            </Button>
          </FeatureCard>

          {/* Mining Card */}
          <FeatureCard title="Mining">
            <Flex gap={4} mb={4}>
              <Counter
                label="Session Time"
                value="00:12:34"
                color="pink.500"
              />
              <Counter
                label="Speed"
                value="Gold 🥇"
                color="cream.200"
              />
            </Flex>
            <Button variant="turquoise" size="sm" mt={2}>
              Start Mining
            </Button>
          </FeatureCard>

          {/* Voting Card */}
          <FeatureCard title="Voting">
            <Counter
              label="Your Vote"
              value="₦0.15"
              color="lilac.200"
            />
            <Button variant="pink" size="sm" mt={4}>
              Vote for Next Price
            </Button>
          </FeatureCard>

          {/* Wallet Card */}
          <FeatureCard title="Wallet">
            <Counter
              label="Naira Balance"
              value="₦5,000"
              color="cream.200"
            />
            <Counter
              label="USDT Balance"
              value="120"
              color="turquoise.500"
            />
            <Button variant="lilac" size="sm" mt={4}>
              Withdraw
            </Button>
          </FeatureCard>
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}
