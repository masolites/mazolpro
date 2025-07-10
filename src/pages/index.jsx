 import { useState } from "react";
import { Box, Container, Button } from "@chakra-ui/react";
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

  if (user && typeof window !== "undefined") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <Box minH="100vh" bg="maroon.800">
      <Header onAuth={() => setAuthOpen(true)} />
      <Container maxW="container.md" py={12}>
        <LandingIntro />
        {!user && !loading && (
          <Button
            variant="maroon"
            mt={8}
            size="lg"
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
