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

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5900/subscribe",
        { plan },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: "Subscription updated.",
        description: "You have successfully subscribed to the plan.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5900/content", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
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
        fontSize={{ base: "2xl", md: "4xl" }}
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
          fontSize={{ base: "md", md: "2xl" }}
          p={4}
        >
          <Text>Name: {user.user.name}</Text>
          <Text>Username: {user.user.username}</Text>
          <Text>Email: {user.user.email}</Text>
          <Text>Subscription Plan: {plan}</Text>
        </Box>
      </Container>

      <Container centerContent>
        <Heading mt={10} mb={5} fontSize={{ base: "2xl", md: "4xl" }}>
          Choose a Subscription Plan
        </Heading>
        <Box width="100%" maxW="md" p={4} borderWidth={1} borderRadius="lg">
          <FormControl id="plan" isRequired>
            <FormLabel>Subscription Plan</FormLabel>
            <Select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleSubscribe} width="full">
            Subscribe
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
