import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthPage,
  ActivationPage,
  HomePage,
  ChatPage,
} from "./routes/Routes.js";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";

// import axios from "axios";
// import { server } from "./server";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./pages/Dashboard";
import UserInbox from "./pages/UserInbox";
import Home from "./pages/Home/index"
// import ChatPage from "./pages/chatPage/chatPage";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    // console.log(user, "this is user in app.js");
    Store.dispatch(loadUser());

    setUser(Store.dispatch(loadUser()));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage user={user} />} /> */}
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home  />{" "}
            </ProtectedRoute>
          }
        />
         {/* <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage  />{" "}
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
