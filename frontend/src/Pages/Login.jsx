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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/Auth/authSlice";

function Login() {
  const [email, setEmail] = useState("srinivasgokarla270@gmail.com");
  const [password, setPassword] = useState("123456");
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5900/login", { email, password });
      if (res.data && res.status === 200) {
       localStorage.setItem('token', res.data.accessToken);
        dispatch(loginSuccess(res.data));
        toast({
          title: "Login successful.",
          description: "Welcome back!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/profile");
      } else {
        toast({
          title: "Login failed.",
          description: "Invalid credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to login. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm" py={6}>
      <Text fontSize={{ base: "3xl", md: "5xl" }} textAlign="center" mb={6}>
        Signin
      </Text>
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={6}
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" colorScheme="teal" width="full" mt={4}>
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            <Link to="/">Signup</Link>
          </span>
        </Text>
      </Box>
    </Container>
  );
}

export default Login;

