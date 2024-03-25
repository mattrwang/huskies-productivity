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
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import axios from "axios";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !username || !password || !teamCode) {
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
        const response = await axios.get("/test");
        alert(response.data.message);
      } catch (error) {
        console.log(error);
      }
      console.log({ fullName, username, password, teamCode });
    }
  };

  return (
    <Flex flexDir="column">
      <Navbar />
      <Flex align="center" justify="center">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} p={8} rounded="md" shadow="md" bg="nugray.600">
            <Heading size="lg" color="white">
              Sign Up
            </Heading>
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
            <FormControl id="teamCode">
              <FormLabel color="white">Team Code</FormLabel>
              <Input
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
              />
            </FormControl>
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
