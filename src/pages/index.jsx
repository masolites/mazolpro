 import {
  Box,
  SimpleGrid,
  Center,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import PrivateSaleCard from "../components/PrivateSaleCard";
import MiningCard from "../components/MiningCard";
import LandingIntro from "../components/LandingIntro";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <Box minH="100vh" bg="maroon.800">
      <Header onAuth={() => setAuthModalOpen(true)} />
      <Box
        maxW="100vw"
        mx="auto"
        py={{ base: 2, md: 4 }}
        px={{ base: 1, md: 4 }}
      >
        <LandingIntro />
        <Center mb={4}>
          <Button
            variant="turquoise"
            size="lg"
            onClick={() => setAuthModalOpen(true)}
          >
            Sign In
          </Button>
        </Center>
        <SimpleGrid
          columns={{ base: 2, md: 3 }}
          spacing={{ base: 2, md: 4 }}
          justifyItems="center"
          minChildWidth="140px"
        >
          <Box maxW="180px" w="100%">
            <FeatureCard>
              <PrivateSaleCard />
            </FeatureCard>
          </Box>
          <Box maxW="180px" w="100%">
            <FeatureCard>
              <MiningCard />
            </FeatureCard>
          </Box>
          {/* Add more FeatureCards here as you build more features */}
        </SimpleGrid>
      </Box>
      <Footer />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  );
}
