import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const NewTeam = () => {
  const [team, setTeam] = useState("");
  const [code, setCode] = useState("");
  const [created, setCreated] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const logout = async () => {
      await axios.post("/logout");
    };
    logout();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/create", { teamName: team });
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
        setCode(data.team.code);
        setCreated(true);
        toast({
          title: "Success",
          description: "Team created successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
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
      {created ? (
        <Flex align="center" justify="center" pt="50px">
          <VStack spacing={4} p={8} rounded="md" shadow="md" bg="nugray.600">
            <Heading size="lg" color="white">
              Team Created
            </Heading>
            <Heading size="md" color="white">
              Code: {code}
            </Heading>
          </VStack>
        </Flex>
      ) : (
        <Flex align="center" justify="center" pt="50px">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} p={8} rounded="md" shadow="md" bg="nugray.600">
              <Heading size="lg" color="white">
                Create Team
              </Heading>
              <FormControl id="teamCode">
                <FormLabel color="white">Team Name</FormLabel>
                <Input value={team} onChange={(e) => setTeam(e.target.value)} />
              </FormControl>
              <Button mt={4} colorScheme="nured" color="white" type="submit">
                Create Team
              </Button>
            </VStack>
          </form>
        </Flex>
      )}
    </Flex>
  );
};

export default NewTeam;
