 import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { ThirdwebProvider } from "thirdweb/react";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ThirdwebProvider
        clientId="71e20f4fe4537525ee7c766d094b27b1" // Your actual thirdweb clientId
        activeChain="binance" // BEP-20 (Binance Smart Chain)
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThirdwebProvider>
    </ChakraProvider>
  );
}
