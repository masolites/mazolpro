// src/pages/index.js
import { useState } from "react";
import {
  Box,
  Container,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Header from "../components/Header";
import LandingIntro from "../components/LandingIntro";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // Redirect to dashboard if logged in
  if (user && typeof window !== "undefined") {
    router.replace("/dashboard");
    return <Spinner size="xl" color="maroon.500" mt={20} />;
  }

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, maroon.500, cream.100)"
    >
      <Header onAuth={() => setAuthOpen(true)} />
      <Container maxW="container.md" py={8}>
        <LandingIntro />
        {!user && !loading && (
          <Button
            colorScheme="maroon"
            mt={6}
            size="lg"
            onClick={() => setAuthOpen(true)}
            boxShadow="md"
          >
            Sign Up / Sign In
          </Button>
        )}
      </Container>
      <Footer />
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </Box>
  );
}
