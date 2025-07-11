import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/login/login";
import Post from "../pages/posts";
import Home from "../pages/home";
export default function GuestRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestLayout>
            <Login />
          </GuestLayout>
        }
      />
      <Route
        path="/home"
        element={
          <AuthLayout>
            <Home></Home>
          </AuthLayout>
        }
      />
            <Route
        path="/create"
        element={
          <AuthLayout>
            <Post></Post>
          </AuthLayout>
        }
      />
              <Route
        path="/notifications"
        element={
          <AuthLayout>
       
          </AuthLayout>
        }
      />
       
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}