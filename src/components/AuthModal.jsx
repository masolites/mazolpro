 import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Require at least one field
    if (!email && !wallet) {
      toast({
        title: "Please enter an email or wallet address.",
        status: "error",
      });
      setSubmitting(false);
      return;
    }

    try {
      if (isSignup) {
        await signup(email, wallet);
        toast({
          title: "Signup successful!",
          status: "success",
        });
      } else {
        await login(email, wallet);
        toast({
          title: "Login successful!",
          status: "success",
        });
      }
      onClose();
    } catch (err) {
      toast({
        title: err.message || "Error",
        status: "error",
      });
    }
    setSubmitting(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="maroon.700" color="cream.100">
        <ModalHeader>
          {isSignup ? "Sign Up" : "Sign In"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="cream.100"
                color="maroon.800"
              />
              <Input
                placeholder="Wallet Address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                bg="cream.100"
                color="maroon.800"
              />
              <Button
                colorScheme={
                  isSignup ? "pink" : "turquoise"
                }
                variant={isSignup ? "pink" : "turquoise"}
                type="submit"
                w="100%"
                isLoading={submitting}
                loadingText={
                  isSignup
                    ? "Signing up..."
                    : "Signing in..."
                }
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </Button>
              <Text>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="maroon"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </Button>
              </Text>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
