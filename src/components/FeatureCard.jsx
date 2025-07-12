import { Box } from "@chakra-ui/react";

export default function FeatureCard({ children, ...props }) {
  return (
    <Box
      borderRadius="xl"
      boxShadow="0 4px 16px 0 #80000055, 0 2px 8px 0 #fff5e122"
      p={5}
      minW="260px"
      minH="180px"
      bg="maroon.900"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </Box>
  );
}
