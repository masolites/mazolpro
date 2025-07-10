import { useState } from "react";
import { Box, Container, Button } from "@chakra-ui/react";
import Header from "../components/Header";
import LandingIntro from "../components/LandingIntro";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <Box minH="100vh" bg="gray.50">
      <Header onAuth={() => setAuthOpen(true)} />
      <Container maxW="container.md" py={8}>
        <LandingIntro />
        {!user && (
          <Button
            colorScheme="blue"
            mt={6}
            onClick={() => setAuthOpen(true)}
          >
            Sign Up / Sign In
          </Button>
        )}
        {/* Add your feature components here when ready */}
      </Container>
      <Footer />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </Box>
  );
}
