 import { Box, SimpleGrid } from "@chakra-ui/react";
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
      <Box maxW="1200px" mx="auto" py={8} px={4}>
        <LandingIntro />
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
