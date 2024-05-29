import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Container,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../Redux/Auth/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("srinivasgokarla270@gmail.com");
  const [name, setName] = useState("Srinivas");
  const [password, setPassword] = useState("123456");
  const [username, setUserName] = useState("Srinivas");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupStart());
    try {
      const res = await axios.post(`http://localhost:5900/register`, {
        name,
        email,
        password,
        username
      });
      console.log(res);
      dispatch(signupSuccess(res.data));
      toast({
        title: "Registration successful.",
        description: "You have successfully registered!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      dispatch(signupFailure(error.message));
      toast({
        title: "Registration failed.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <>
      <Container maxW="container.sm" py={6}>
        <Text fontSize={{ base: "3xl", md: "5xl" }} textAlign="center" mb={6}>
          Register
        </Text>
        <Box
          borderWidth={1}
          borderRadius="lg"
          p={6}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your username"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full" mt={4}>
              Register
            </Button>
          </form>
        </Box>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            <Link to="/login">Login</Link>
          </span>
        </Text>
      </Container>
    </>
  );
}

export default Signup;

