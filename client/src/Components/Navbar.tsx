import React, { useEffect } from "react";
import { Flex, Image, Spacer, Button } from "@chakra-ui/react";
import logo from "../Assets/Northeastern_Huskies_.svg";
import { Link as RouterLink } from "react-router-dom";
import { isLoggedIn } from "../auth";
import axios from "axios";

const NavBar = () => {
  const [auth, setAuth] = React.useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await isLoggedIn();
      setAuth(isAuthenticated);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
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
      {auth ? (
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
