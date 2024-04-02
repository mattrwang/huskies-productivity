import React from "react";
import { Flex, Image, Spacer, Button } from "@chakra-ui/react";
import logo from "../Assets/Northeastern_Huskies_.svg";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Profile from "./Profile";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      p="4"
      bg="nugray.700"
      width="full"
      maxH="75px"
      shadow="md"
    >
      <RouterLink to="/">
        <Image src={logo} alt="Logo" boxSize="75px" />
      </RouterLink>
      <Spacer />
      {user ? (
        <Profile />
      ) : (
        <Flex gap="4">
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="nured"
            variant="outline"
            width="85px"
          >
            Log In
          </Button>
          <Button
            as={RouterLink}
            to="/signup"
            colorScheme="nured"
            color="white"
            variant="solid"
            width="85px"
          >
            Sign Up
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
