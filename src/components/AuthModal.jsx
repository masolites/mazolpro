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
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!email) {
      toast({
        title: "Please enter your email.",
        status: "error",
      });
      setSubmitting(false);
      return;
    }

    try {
      if (isSignup) {
        await signup(email);
        toast({
          title: `Signup successful! You are signed in as ${email}`,
          status: "success",
        });
      } else {
        await login(email);
        toast({
          title: `Login successful! You are signed in as ${email}`,
          status: "success",
        });
      }
      setEmail("");
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
                required
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
