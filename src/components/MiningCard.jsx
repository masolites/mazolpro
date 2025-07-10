import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Counter from "./Counter";

export default function MiningCard() {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Timer state
  const [timer, setTimer] = useState("00:00:00");
  let timerInterval = null;

  // Start mining handler
  const startMining = async () => {
    setLoading(true);
    setStatus("");
    try {
      const wallet =
        JSON.parse(localStorage.getItem("mazol_user"))?.user
          ?.wallet || "";
      if (!wallet) {
        setStatus("Please login first.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/mining", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });
      const data = await res.json();
      setStatus(data.message || data.error || "");
      if (data.session) {
        setSession(data.session);
        // Start timer
        const start = new Date(
          data.session.start,
        ).getTime();
        function updateMiningTimer() {
          const now = Date.now();
          let diff = Math.max(0, now - start);
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
        updateMiningTimer();
        timerInterval = setInterval(
          updateMiningTimer,
          1000,
        );
      }
      toast({
        title: data.message || data.error || "",
        status: data.error ? "error" : "success",
      });
    } catch (err) {
      setStatus("Error starting mining.");
      toast({
        title: "Error starting mining.",
        status: "error",
      });
    }
    setLoading(false);
  };

  // Show speed
  const speedLabel =
    session?.speed === 3
      ? "Gold 🥇"
      : session?.speed === 1
        ? "Silver 🥈"
        : "—";

  return (
    <Box>
      <Text fontWeight="bold" fontSize="xl" mb={2}>
        Mining
      </Text>
      <Flex gap={4} mb={4}>
        <Counter
          label="Session Time"
          value={session ? timer : "00:00:00"}
          color="pink.500"
        />
        <Counter
          label="Speed"
          value={speedLabel}
          color="cream.200"
        />
      </Flex>
      <Button
        variant="turquoise"
        onClick={startMining}
        isLoading={loading}
        loadingText="Starting..."
        mb={2}
      >
        Start Mining
      </Button>
      {status && (
        <Text
          mt={2}
          color={
            status.includes("success")
              ? "turquoise.500"
              : "red.500"
          }
        >
          {status}
        </Text>
      )}
    </Box>
  );
}
