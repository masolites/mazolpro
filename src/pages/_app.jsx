 // pages/_app.jsx

import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../contexts/AuthContext";
import { ThirdwebProvider } from "thirdweb/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "../styles/theme";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  // Create a QueryClient instance only once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider clientId="71e20f4fe4537525ee7c766d094b27b1">
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
