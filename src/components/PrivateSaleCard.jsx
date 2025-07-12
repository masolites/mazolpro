import { useEffect, useState } from "react";
import {
  Box, Text, Flex, Button, Input, Select, VStack, useToast, Spinner,
} from "@chakra-ui/react";
import Counter from "./Counter";

export default function PrivateSaleCard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("wallet");
  const [buying, setBuying] = useState(false);
  const [result, setResult] = useState("");
  const toast = useToast();

  useEffect(() => {
    async function fetchStatus() {
      setLoading(true);
      try {
        const res = await fetch("/api/private_sale_status");
        const data = await res.json();
        setStatus(data);
      } catch {
        setStatus(null);
      }
      setLoading(false);
    }
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // Timer logic
  const [timer, setTimer] = useState("00:00:00");
  useEffect(() => {
    if (!status?.endTime) return;
    function updateTimer() {
      const endTime = new Date(status.endTime).getTime();
      const now = Date.now();
      let diff = Math.max(0, endTime - now);
      const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimer(`${hours}:${mins}:${secs}`);
    }
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [status]);

  // Buy tokens
  const handleBuy = async (e) => {
    e.preventDefault();
    setBuying(true);
    setResult("");
    try {
      const wallet = JSON.parse(localStorage.getItem("mazol_user"))?.user?.wallet || "";
      if (!wallet) {
        setResult("Please login first.");
        setBuying(false);
        return;
      }
      const res = await fetch(`/api/purchase_${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, wallet }),
      });
      const data = await res.json();
      setResult(data.message || data.error || "");
      toast({ title: data.message || data.error || "", status: data.error ? "error" : "success" });
    } catch (err) {
      setResult("Error buying tokens.");
      toast({ title: "Error buying tokens.", status: "error" });
    }
    setBuying(false);
  };

  if (loading) {
    return (
      <Box bg="maroon.700" color="cream.100" p={6} borderRadius="xl" textAlign="center" minW="300px">
        <Spinner color="turquoise.500" />
      </Box>
    );
  }

  return (
    <Box
      bgGradient="linear(to-br, maroon.700, orange.300)"
      color="cream.100"
      p={6}
      borderRadius="xl"
      minW="300px"
      boxShadow="0 4px 16px 0 #80000055, 0 2px 8px 0 #fff5e122"
    >
      <Text fontWeight="bold" fontSize="lg" color="orange.300" mb={2} textShadow="1px 1px 2px #000">
        Private Sale
      </Text>
      <Text mb={2}>Token Price: ₦{status?.tokenPrice || "0.00"} (MAZOL MZLx)</Text>
      <Text mb={2}>Countdown: {timer}</Text>
      <Flex gap={4} mb={2}>
        <Counter label="Tokens Sold" value={status?.totalSold?.toLocaleString() || "0"} color="turquoise.500" shadow3d />
        <Counter label="Goal" value={status?.goal?.toLocaleString() || "0"} color="lilac.200" shadow3d />
      </Flex>
      <form onSubmit={handleBuy}>
        <VStack spacing={2} align="stretch">
          <Input
            placeholder="Amount"
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            bg="cream.100"
            color="maroon.800"
            required
          />
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            bg="cream.100"
            color="maroon.800"
          >
            <option value="wallet">Platform Wallet Balance</option>
            <option value="flutterwave">Flutterwave</option>
            <option value="manual">Manual Bank Deposit (Admin Approval)</option>
            <option value="usdt">USDT (BEP-20)</option>
          </Select>
          <Button
            type="submit"
            bgGradient="linear(to-r, orange.300, turquoise.500)"
            color="maroon.900"
            isLoading={buying}
            loadingText="Processing..."
            fontWeight="bold"
            borderRadius="xl"
            boxShadow="0 4px 16px 0 #80000055"
            _hover={{ transform: "scale(1.05)" }}
          >
            Buy Tokens
          </Button>
        </VStack>
      </form>
      {result && (
        <Text mt={2} color={result.includes("success") ? "turquoise.500" : "deepPink.400"}>
          {result}
        </Text>
      )}
    </Box>
  );
     }
