 import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  Select,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Counter from "./Counter";

export default function PrivateSaleCard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("fixed");
  const [buying, setBuying] = useState(false);
  const [result, setResult] = useState("");
  const toast = useToast();

  // Fetch sale status
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
      const hours = String(
        Math.floor(diff / 3600000),
      ).padStart(2, "0");
      const mins = String(
        Math.floor((diff % 3600000) / 60000),
      ).padStart(2, "0");
      const secs = String(
        Math.floor((diff % 60000) / 1000),
      ).padStart(2, "0");
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
      const wallet =
        JSON.parse(localStorage.getItem("mazol_user"))?.user
          ?.wallet || "";
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
      toast({
        title: data.message || data.error || "",
        status: data.error ? "error" : "success",
      });
    } catch (err) {
      setResult("Error buying tokens.");
      toast({
        title: "Error buying tokens.",
        status: "error",
      });
    }
    setBuying(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner color="turquoise.500" />
      </Box>
    );
  }

  return (
    <Box
      bg="maroon.700"
      color="cream.100"
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      mb={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Private Sale
      </Text>
      <Text mb={2}>
        Token Price: <b>₦{status?.tokenPrice || "0.00"}</b>
      </Text>
      <Counter
        label="Tokens Sold"
        value={status?.totalSold?.toLocaleString() || "0"}
        color="turquoise.500"
      />
      <Counter
        label="Goal"
        value={status?.goal?.toLocaleString() || "0"}
        color="lilac.200"
      />
      <Counter
        label="Time Left"
        value={timer}
        color="pink.500"
      />
      <form onSubmit={handleBuy}>
        <VStack spacing={3} mt={4}>
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
            <option value="fixed">
              Fixed Amount (Seniors)
            </option>
            <option value="flex">
              Flexible Amount (Flex)
            </option>
          </Select>
          <Button
            type="submit"
            variant="turquoise"
            isLoading={buying}
            w="100%"
          >
            Buy Now
          </Button>
          {result && (
            <Text
              mt={2}
              color={
                result.includes("success")
                  ? "turquoise.500"
                  : "pink.500"
              }
            >
              {result}
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
}
