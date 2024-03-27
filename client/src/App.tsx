import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import theme from "./theme";
import axios from "axios";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewTeam from "./Pages/NewTeam";
import { AuthProvider } from "./Context/AuthContext";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create" element={<NewTeam />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  </ChakraProvider>
);
