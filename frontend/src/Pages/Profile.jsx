import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Text,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [plan, setPlan] = useState(user.subscriptionPlan || "Basic");
  const token = localStorage.getItem("token");
  const [content, setContent] = useState("");
  const toast = useToast();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5900/subscribe",
  //       { plan },
  //       {
  //         headers: { "x-auth-token": token },
  //       }
  //     );
  //     toast({
  //       title: "Subscription updated.",
  //       description: response.data.message,
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "An error occurred.",
  //       description: error.response.data.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const fetchContent = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5900/content", {
  //         headers: { "x-auth-token": token },
  //       });
  //       setContent(response.data.content);
  //     } catch (error) {
  //       toast({
  //         title: "An error occurred.",
  //         description: error.response.data.message,
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     }
  //   };
  //   fetchContent();
  // }, [token, toast]);
  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5900/subscribe",
        { plan },
        {
          headers: { "x-auth-token": token },
        }
      );
      toast({
        title: "Subscription updated.",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5900/content", {
          headers: { "x-auth-token": token },
        });
        setContent(response.data.content);
      } catch (error) {
        toast({
          title: "An error occurred.",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchContent();
  }, [token, toast]);

  return (
    <>
      <Text
        fontSize={"4xl"}
        fontWeight={700}
        mt={10}
        textDecoration={"underline"}
        textAlign={"center"}
      >
        Profile
      </Text>

      <Container mt={10}>
        <Box
          m={"auto"}
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          fontSize={"2xl"}
          p={4}
        >
           <Text>Name: {user.user.name}</Text>
         <Text>UserName: {user.user.username}</Text>
          <Text>Email: {user.user.email}</Text>
         
        </Box>
      </Container>

      <Container centerContent>
        <Heading mt={10} mb={5}>Dashboard</Heading>
        <Box width="100%" maxW="md" p={4} borderWidth={1} borderRadius="lg">
          <Text>{content}</Text>
        </Box>
      </Container>

      <Container centerContent>
        <Heading mt={10} mb={5}>Choose a Subscription Plan</Heading>
        <Box width="100%" maxW="md" p={4} borderWidth={1} borderRadius="lg">
          <FormControl id="plan" isRequired>
            <FormLabel>Subscription Plan</FormLabel>
            <Select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
