import { Flex, Text } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useAuth } from "../Context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <Flex flexDir="column">
      <Navbar />
      {user && <Text>Welcome, {user.id}</Text>}
    </Flex>
  );
};

export default Home;
