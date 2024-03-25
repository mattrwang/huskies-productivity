import React from "react";
import { Flex, Image, Spacer, Button } from "@chakra-ui/react";
import logo from "../Assets/Northeastern_Huskies_.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
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
      <Link to="/">
        <Image src={logo} alt="Logo" boxSize="75px" />
      </Link>
      <Spacer />
      <Flex gap="4">
        <Button colorScheme="nured" variant="outline">
          Login
        </Button>
        <Button colorScheme="nured" color="white" variant="solid">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default NavBar;
