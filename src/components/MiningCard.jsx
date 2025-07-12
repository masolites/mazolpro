import { useState } from "react";
import { Box, Text, Button, useToast } from "@chakra-ui/react";
import Counter from "./Counter";

export default function MiningCard() {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [miningOn, setMiningOn] = useState(false);
  const toast = useToast();

  // Timer state
  const [timer, setTimer] = useState("00:00:00");
  let timerInterval = null;

  // Start mining handler
  const startMining = async () => {
    setLoading(true);
    setStatus("");
    try {
      const wallet = JSON.parse(localStorage.getItem("mazol_user"))?.user?.wallet || "";
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
        setMiningOn(true);
        // Start timer
        const start = new Date(data.session.start).getTime();
        function updateMiningTimer() {
          const now = Date.now();
          let diff = Math.max(0, now - start);
          const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
          const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
          const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
          setTimer(`${hours}:${mins}:${secs}`);
        }
        updateMiningTimer();
        timerInterval = setInterval(updateMiningTimer, 1000);
      }
      toast({ title: data.message || data.error || "", status: data.error ? "error" : "success" });
    } catch (err) {
      setStatus("Error starting mining.");
      toast({ title: "Error starting mining.", status: "error" });
    }
    setLoading(false);
  };

  return (
    <Box
      bgGradient="linear(to-br, maroon.700, turquoise.500)"
      color="cream.100"
      p={6}
      borderRadius="xl"
      minW="300px"
      boxShadow="0 4px 16px 0 #80000055, 0 2px 8px 0 #fff5e122"
    >
      <Text fontWeight="bold" fontSize="lg" color="lilac.300" mb={2} textShadow="1px 1px 2px #000">
        Mining
      </Text>
      <Counter label="Session Time" value={session ? timer : "00:00:00"} color="deepPink.400" shadow3d />
      <Button
        mt={2}
        bg={miningOn ? "green.400" : "orange.300"}
        color={miningOn ? "white" : "maroon.900"}
        fontWeight="bold"
        borderRadius="xl"
        boxShadow="0 4px 16px 0 #80000055"
        onClick={startMining}
        isLoading={loading}
        loadingText="Starting..."
        _hover={{ transform: "scale(1.05)", bg: miningOn ? "green.500" : "orange.400" }}
        leftIcon={miningOn ? "💚" : "⛏️"}
      >
        {miningOn ? "Mining ON" : "Start Mining"}
      </Button>
      {status && (
        <Text mt={2} color={status.includes("success") ? "turquoise.500" : "deepPink.400"}>
          {status}
        </Text>
      )}
    </Box>
  );
           }
