import PrivateSaleCard from "../components/PrivateSaleCard";
// ...other imports

export default function Dashboard() {
  // ...auth logic
  return (
    <Box minH="100vh" bg="maroon.800">
      <Header />
      <Box maxW="container.xl" mx="auto" py={10} px={4}>
        <Heading size="lg" color="cream.100" mb={2}>
          Welcome, {user.email || user.wallet}
        </Heading>
        <Text color="cream.100" mb={8} fontSize="lg">
          Your Mazol Pro dashboard. All your features in one
          place.
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
        >
          <FeatureCard>
            <PrivateSaleCard />
          </FeatureCard>
          {/* ...other cards */}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
}
