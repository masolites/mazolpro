import { useState } from "react";
import { Box, Container, Flex, SimpleGrid, Text, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingIntro from "../components/LandingIntro";
import AuthModal from "../components/AuthModal";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";
import FeatureCard from "../components/FeatureCard";
import Counter from "../components/Counter";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  // Horizontal features
  const horizontalFeatures = [
    <FeatureCard key="earnings" bgGradient="linear(to-br, maroon.700, lilac.200)">
      <Text fontWeight="bold" color="orange.300" fontSize="lg" mb={2} textShadow="1px 1px 2px #000">
        Wallet Earnings
      </Text>
      <Counter label="Total Earnings" value="₦0.00" color="orange.300" shadow3d />
      <Counter label="Mining Earnings" value="₦0.00" color="turquoise.500" shadow3d />
      <Counter label="Wallet Balance" value="₦0.00" color="lilac.300" shadow3d />
    </FeatureCard>,
    <PrivateSaleCard key="private-sale" />,
    <MiningCard key="mining" />,
    <FeatureCard key="voting" bgGradient="linear(to-br, maroon.700, turquoise.500)">
      <Text fontWeight="bold" color="deepPink.400" fontSize="lg" mb={2} textShadow="1px 1px 2px #000">
        Price Voting
      </Text>
      <Text color="cream.100" fontSize="md" mb={1}>
        Voting opens 6PM–11PM daily (Nigeria time)
      </Text>
      <Button
        mt={2}
        variant="solid"
        bgGradient="linear(to-r, deepPink.400, orange.300)"
        color="white"
        boxShadow="0 4px 16px 0 #80000055"
        _hover={{ bgGradient: "linear(to-r, orange.300, deepPink.400)", transform: "scale(1.05)" }}
        fontWeight="bold"
        borderRadius="xl"
      >
        View Voting
      </Button>
    </FeatureCard>,
  ];

  // Grid features
  const gridFeatures = [
    { label: "Deposit", color: "turquoise.500", icon: "💸" },
    { label: "Withdraw", color: "deepPink.400", icon: "🏧" },
    { label: "Escrow Buy", color: "lilac.200", icon: "🛒" },
    { label: "Escrow Sell", color: "lilac.300", icon: "💼" },
    { label: "Send Mazol", color: "orange.300", icon: "📤" },
    { label: "Receive Mazol", color: "cream.100", icon: "📥" },
  ];

  return (
    <Box minH="100vh" bgGradient="linear(to-br, maroon.800 70%, lilac.200 100%)">
      <Header onAuth={() => setAuthOpen(true)} />
      <Container maxW="container.xl" py={8}>
        <LandingIntro />
        {/* Horizontal Feature Row */}
        <Flex gap={6} mb={10} overflowX="auto" flexWrap={{ base: "wrap", md: "nowrap" }}>
          {horizontalFeatures}
        </Flex>
        {/* Feature Grid */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 6 }} spacing={6} mb={8}>
          {gridFeatures.map((feature) => (
            <FeatureCard
              key={feature.label}
              bg="maroon.900"
              color={feature.color}
              boxShadow="0 8px 24px 0 #80000088, 0 2px 8px 0 #fff5e122"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: `0 12px 32px 0 ${feature.color}55, 0 2px 8px 0 #fff5e122`,
              }}
              transition="all 0.2s"
              cursor="pointer"
              minH="120px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="3xl" mb={2}>{feature.icon}</Text>
              <Text fontWeight="bold" fontSize="md" color={feature.color} textShadow="1px 1px 2px #000">
                {feature.label}
              </Text>
            </FeatureCard>
          ))}
        </SimpleGrid>
        {!user && (
          <Box textAlign="center" mt={8}>
            <Button
              size="lg"
              variant="solid"
              bgGradient="linear(to-r, turquoise.500, orange.300)"
              color="maroon.900"
              fontWeight="bold"
              borderRadius="xl"
              boxShadow="0 4px 16px 0 #80000055"
              onClick={() => setAuthOpen(true)}
            >
              Sign In / Sign Up to Get Started
            </Button>
          </Box>
        )}
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      </Container>
      <Footer />
    </Box>
  );
      }
