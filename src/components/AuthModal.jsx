 import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleAuth = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isSignUp ? "register" : "login",
          email,
          password,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Auth failed");
      login(data.user, data.token);
      toast({
        title: isSignUp
          ? "Sign up successful!"
          : "Login successful!",
        status: "success",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#2d0000" color="#fff5e1">
        <ModalHeader>
          {isSignUp ? "Sign Up" : "Sign In"}
        </ModalHeader>
        <ModalBody>
          <Input
            placeholder="Email"
            type="email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="#fff5e1"
            color="#1a0000"
          />
          <Input
            placeholder="Password"
            type="password"
            mb={3}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="#fff5e1"
            color="#1a0000"
          />
          <Text
            fontSize="sm"
            color="orange.300"
            cursor="pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "New user? Sign Up"}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            mr={3}
            onClick={handleAuth}
            isLoading={loading}
            bgGradient="linear(to-r, orange.300, turquoise.500)"
            color="#1a0000"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            color="#FFA726"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
