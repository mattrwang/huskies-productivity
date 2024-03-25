import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import theme from "./theme";
import axios from "axios";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Home from "./Pages/Home";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </Router>
  </ChakraProvider>
);
