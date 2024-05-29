// import {
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   useToast,
//   Container,
//   Text,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../Redux/Auth/authSlice";

// function Login() {
//   const [email, setEmail] = useState("srinivasgokarla270@gmail.com");
//   const [password, setPassword] = useState("123456");
//   const toast = useToast();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Simulate login API call
//       const res = await axios.post("http://localhost:5900/login", {
//         email,
//         password,
//       });
//       console.log(res.data);

//       if (
//         (res.data && res.status === 200) ||
//         res.data.message == "Login successful"
//       ) {
//         toast({
//           title: "Login successful.",
//           description: "Welcome back!",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//         });
//         dispatch(loginSuccess(res.data));
//          navigate("/profile");
      
//       } else {
//         toast({
//           title: "Login failed.",
//           description: "Invalid credentials.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast({
//         title: "An error occurred.",
//         description: "Unable to login. Please try again later.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };




//   return (
//     <>
//       <Container>
//         <Text fontSize={"5xl"} textAlign={"center"}>
//           Signin
//         </Text>
//         <Box>
//           <form onSubmit={handleSubmit}>
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </FormControl>
//             <Button type="submit" mt={4} colorScheme="teal">
//               Login
//             </Button>
//           </form>
//           <Text mt={4}>
//             Don't You Have an Account{" "}
//             <span style={{ color: "red", fontWeight: "bold" }}>
//               <Link to={"/"}>Signup</Link>
//             </span>
//           </Text>
//         </Box>
//       </Container>

     
//     </>
//   );
// }

// export default Login;
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
        localStorage.setItem('token', res.data.token);
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
    <Container>
      <Text fontSize={"5xl"} textAlign={"center"}>Signin</Text>
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="teal">Login</Button>
        </form>
        <Text mt={4}>
          Don't have an account?{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            <Link to={"/"}>Signup</Link>
          </span>
        </Text>
      </Box>
    </Container>
  );
}

export default Login;

