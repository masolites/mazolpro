 import { Flex, Box, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
  return (
    <Flex
      as="header"
      direction="column"
      align="center"
      justify="center"
      px={6}
      py={6}
      bg="maroon.900"
      color="cream.100"
      boxShadow="md"
    >
      <Link href="/" passHref>
        <Text
          fontWeight="bold"
          fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
          letterSpacing="wide"
          textAlign="center"
        >
          Mazol Pro
        </Text>
      </Link>
      <Text
        fontSize={{ base: "md", md: "lg" }} // This matches the "Token Price" font size
        color="cream.200"
        mt={2}
        textAlign="center"
      >
        E-commerce & Blockchain Solutions
      </Text>
    </Flex>
  );
}
