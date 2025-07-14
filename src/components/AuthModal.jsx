 import { useState } from "react";
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
  VStack,
  useToast,
} from "@chakra-ui/react";

export default function PinEmailModal({
  isOpen,
  onClose,
  walletAddress,
  onPinSet,
}) {
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      toast({
        title: "PIN must be 4 digits",
        status: "error",
      });
      return;
    }
    setLoading(true);
    // Send to backend to save (hash PIN server-side)
    const res = await fetch("/api/user/setup-pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress, pin, email }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      toast({
        title: "PIN set successfully!",
        status: "success",
      });
      onPinSet();
      onClose();
    } else {
      toast({
        title: "Error",
        description: data.error,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#2d0000" color="#fff5e1">
        <ModalHeader>Set Security PIN</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="4-digit PIN"
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) =>
                setPin(e.target.value.replace(/\D/g, ""))
              }
              bg="#fff5e1"
              color="#1a0000"
            />
            <Input
              placeholder="Email (optional, for support only)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="#fff5e1"
              color="#1a0000"
            />
            <Text fontSize="sm" color="orange.200">
              Your PIN is required for withdrawals and
              transfers.
              <br />
              Email is only for support if you ever need
              help with your wallet.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="orange"
            onClick={handleSubmit}
            isLoading={loading}
            bgGradient="linear(to-r, orange.300, turquoise.500)"
            color="#1a0000"
          >
            Save
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
