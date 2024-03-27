import React from "react";
import { Flex, Image, Spacer, Button } from "@chakra-ui/react";
import logo from "../Assets/Northeastern_Huskies_.svg";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    await axios.post("/logout");
    window.location.href = "/login";
  };

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
        <Button
          colorScheme="nured"
          variant="outline"
          width="85px"
          onClick={handleLogout}
        >
          Log Out
        </Button>
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

export default NavBar;
