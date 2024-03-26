import React, { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  useToast,
  Divider,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      event.preventDefault();
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
    } else {
      try {
        const { data } = await axios.post("/login", { username, password });
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
    }
  };

  return (
    <Flex flexDir="column">
      <Navbar />
      <Flex align="center" justify="center" pt="50px">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} p={8} rounded="md" shadow="md" bg="nugray.600">
            <Heading size="lg" color="white">
              Log In
            </Heading>
            <VStack maxW="220px">
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
            />

            <Button
              mt={4}
              colorScheme="nured"
              color="white"
              type="submit"
              width="85px"
            >
              Log In
            </Button>
            <Text>
              No account?{" "}
              <Link
                as={RouterLink}
                to="/signup"
                color="nured.200"
                fontWeight="bold"
              >
                Create one!
              </Link>
            </Text>
          </VStack>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
