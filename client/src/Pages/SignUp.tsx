import React, { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  useToast,
  HStack,
  Divider,
  Text,
  Link,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const toast = useToast();

  useEffect(() => {
    const logout = async () => {
      await axios.post("/logout");
    };

    logout();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!fullName || !username || !password || !teamCode) {
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    if (password.length < 4) {
      toast({
        title: "Error",
        description: "Password must be at least 4 characters long.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    try {
      const { data } = await axios.post("/signup", {
        name: fullName,
        username,
        password,
        code: teamCode,
      });
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <Flex flexDir="column">
      <Navbar />
      <Flex align="center" justify="center" pt="50px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} p={8} rounded="md" shadow="md" bg="nugray.600">
            <Heading size="lg" color="white">
              Sign Up
            </Heading>
            <HStack
              spacing={{ base: 6, md: 10 }}
              flexDir={{ base: "column", md: "row" }}
            >
              <VStack maxW="220px">
                <FormControl id="fullName">
                  <FormLabel color="white">Full Name</FormLabel>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="username">
                  <FormLabel color="white">Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </VStack>
              <Divider
                orientation="vertical"
                height="auto"
                minWidth="1px"
                bg="nugray.300"
                alignSelf="stretch"
                display={{ base: "none", md: "block" }}
                rounded="md"
              />
              <Divider
                orientation="horizontal"
                minHeight="1px"
                width="auto"
                bg="nugray.300"
                alignSelf="stretch"
                display={{ base: "block", md: "none" }}
                rounded="md"
              />
              <VStack maxW="220px">
                <Text align="center">
                  Ask your coaches or captains for a team code!
                </Text>
                <FormControl id="teamCode" mb={{ base: "none", md: "60px" }}>
                  <FormLabel color="white">Team Code</FormLabel>
                  <Input
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value)}
                  />
                </FormControl>
                <Text fontSize="15px">
                  <Link
                    as={RouterLink}
                    to="/create"
                    color="nured.200"
                    fontWeight="bold"
                  >
                    Click here
                  </Link>{" "}
                  to create a new team!
                </Text>
              </VStack>
            </HStack>

            <Button mt={4} colorScheme="nured" color="white" type="submit">
              Create Account
            </Button>
          </VStack>
        </form>
      </Flex>
    </Flex>
  );
};

export default SignUp;
