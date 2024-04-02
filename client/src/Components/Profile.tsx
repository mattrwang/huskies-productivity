import React from "react";
import {
  Circle,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    await axios.post("/logout");
    window.location.href = "/login";
  };

  return (
    <Flex>
      <Menu>
        <MenuButton as={Button} variant="unstyled">
          <Circle size="40px" bg="nugray.200" cursor="pointer">
            <Icon as={FaUser} color="white" />
          </Circle>
        </MenuButton>
        <MenuList bg="nugray.400">
          <MenuItem bg="nugray.400" _hover={{ bg: "nured.200" }}>
            My Profile
          </MenuItem>
          <MenuDivider />
          <MenuItem
            bg="nugray.400"
            _hover={{ bg: "nured.200" }}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Profile;
